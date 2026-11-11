/**
 * BodyProfile Tracker ↔ Google Sheets 동기화 (Apps Script 웹앱)
 *
 * 하는 일
 *  - 앱이 보낸 전체 데이터를 내 구글 드라이브에 JSON으로 보관 (최신본 + 날짜별 사본)
 *  - 시트 탭을 자동으로 갱신: 세트기록 / 세션 / 체성분 / 루틴 / 종목요약 / 데이터점검 / 동기화정보
 *  - 기기 데이터가 크게 줄어든 채로 올라오면 저장을 막아 덮어쓰기 유실을 방지
 *
 * 설정: 아래 TOKEN을 앱에서 만든 토큰으로 바꾼 뒤
 *       배포 → 새 배포 → 유형: 웹 앱 → 실행: 나 / 액세스 권한: 모든 사용자
 *       (코드를 수정했다면 배포 관리 → 수정 → 버전: 새 버전 으로 다시 배포)
 */
const TOKEN = 'PASTE-YOUR-TOKEN-HERE';
const BACKUP_FOLDER = 'BodyProfile Backups';
const KEEP_DAILY = 60;          // 날짜별 백업 보관 개수
const TZ = 'Asia/Seoul';

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (!validToken_(p.token)) return json_({ ok: false, error: '토큰이 일치하지 않습니다' });
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (p.action === 'ping') {
    const latest = findFile_('latest.json');
    let backupAt = '';
    if (latest) { try { backupAt = JSON.parse(latest.getBlob().getDataAsString('UTF-8')).exportedAt || ''; } catch (err) {} }
    return json_({ ok: true, name: ss.getName(), sheetUrl: ss.getUrl(), hasBackup: !!latest, backupAt: backupAt });
  }
  if (p.action === 'latest') {
    const f = findFile_('latest.json');
    if (!f) return json_({ ok: false, error: '시트에 저장된 백업이 아직 없습니다' });
    const payload = JSON.parse(f.getBlob().getDataAsString('UTF-8'));
    return json_({ ok: true, savedAt: payload.exportedAt, state: payload.state });
  }
  return json_({ ok: false, error: '알 수 없는 요청입니다' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const body = JSON.parse(e.postData.contents);
    if (!validToken_(body.token)) return json_({ ok: false, error: '토큰이 일치하지 않습니다' });
    if (!body.state || !Array.isArray(body.state.sessions)) return json_({ ok: false, error: '데이터 형식이 올바르지 않습니다' });

    // 유실 방지: 이미 저장된 세션보다 30% 넘게 줄어든 데이터는 덮어쓰지 않는다
    const prev = findFile_('latest.json');
    if (prev && !body.force) {
      try {
        const old = JSON.parse(prev.getBlob().getDataAsString('UTF-8'));
        const oldN = ((old.state || {}).sessions || []).length, newN = body.state.sessions.length;
        if (oldN >= 10 && newN < oldN * 0.7) {
          return json_({ ok: false, code: 'SHRINK', oldCount: oldN, newCount: newN,
            error: '이 기기의 세션이 ' + oldN + '건 → ' + newN + '건으로 크게 줄어 저장을 막았습니다. 시트에서 복원하세요.' });
        }
      } catch (err) { /* 이전 파일이 손상됐으면 그대로 진행 */ }
    }

    saveBackup_(body);
    const r = body.rows || {};
    const sets = r.sets || [];
    writeSheet_('세트기록', ['날짜', '요일', '프로그램', '종목ID', '종목', '대체운동', '세트', '중량kg', '반복', '완료', '볼륨kg', '점검'], sets);
    writeSheet_('세션', ['날짜', '요일', '프로그램', '보충', '완료세트', '전체세트', '볼륨kg', '시간(분)'], r.sessions || []);
    writeSheet_('체성분', ['날짜', '기기', '체중kg', '골격근kg', '체지방%', '허리cm'], r.body || []);
    writeSheet_('루틴', ['날짜', '프리로드', '크레아틴', '물3L', '일어나기'], r.habits || []);
    writeSheet_('데이터점검', ['날짜', '종목', '세트', '항목', '값', '사유', '추천값'], r.issues || []);
    writeSheet_('종목요약', ['종목', '종목ID', '세션 수', '첫 기록', '최근 기록', '최근 최고중량', '역대 최고중량', '최근 5회 최고중량', '최근 평균반복', '추세'], summarize_(sets));
    writeSheet_('동기화정보', ['항목', '값'], [
      ['마지막 동기화', Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss')],
      ['앱 버전', String(body.version || '')],
      ['기기', String(body.device || '')],
      ['세션 수', body.state.sessions.length],
      ['세트 행 수', sets.length],
      ['점검 필요', (r.issues || []).length]
    ]);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    return json_({ ok: true, savedAt: new Date().toISOString(), sheetUrl: ss.getUrl(),
      counts: { sessions: body.state.sessions.length, sets: sets.length, body: (r.body || []).length, issues: (r.issues || []).length } });
  } catch (err) {
    return json_({ ok: false, error: '서버 오류: ' + err.message });
  } finally {
    lock.releaseLock();
  }
}

// 종목별 최근 흐름 (프로그램 수정 판단용)
function summarize_(sets) {
  const byEx = {};
  sets.forEach(function (r) {
    const date = r[0], id = r[3], name = r[4], w = Number(r[7]) || 0, reps = Number(r[8]) || 0;
    if (!byEx[id]) byEx[id] = { name: name, days: {} };
    byEx[id].name = name;
    const d = byEx[id].days[date] || (byEx[id].days[date] = { top: 0, reps: [] });
    d.top = Math.max(d.top, w);
    if (reps) d.reps.push(reps);
  });
  const rows = [];
  Object.keys(byEx).forEach(function (id) {
    const ex = byEx[id], dates = Object.keys(ex.days).sort();
    const tops = dates.map(function (d) { return ex.days[d].top; });
    const last5 = tops.slice(-5), lastDay = ex.days[dates[dates.length - 1]];
    const avgReps = lastDay.reps.length ? Math.round(lastDay.reps.reduce(function (a, b) { return a + b; }, 0) / lastDay.reps.length * 10) / 10 : '';
    let trend = '';
    if (tops.length >= 3) {
      const a = tops[tops.length - 3], c = tops[tops.length - 1];
      if (c > a) trend = '상승';
      else if (c < a) trend = '하락';
      else trend = tops.slice(-3).every(function (t) { return t === c; }) ? '정체(3회 동일)' : '유지';
    }
    rows.push([ex.name, id, dates.length, dates[0], dates[dates.length - 1], tops[tops.length - 1], Math.max.apply(null, tops), last5.join(' → '), avgReps, trend]);
  });
  rows.sort(function (a, b) { return String(b[4]).localeCompare(String(a[4])); });
  return rows;
}

function writeSheet_(name, header, rows) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);
  sh.clearContents();
  const width = header.length;
  const data = [header].concat(rows.map(function (r) {
    const row = r.slice(0, width);
    while (row.length < width) row.push('');
    return row.map(function (v) { return v === null || v === undefined ? '' : v; });
  }));
  sh.getRange(1, 1, data.length, width).setValues(data);
  sh.getRange(1, 1, 1, width).setFontWeight('bold').setBackground('#e9f7cf');
  sh.setFrozenRows(1);
}

function saveBackup_(body) {
  const folder = folder_();
  const content = JSON.stringify({ exportedAt: body.exportedAt, version: body.version, state: body.state });
  const latest = findFile_('latest.json');
  if (latest) latest.setContent(content); else folder.createFile('latest.json', content, 'application/json');
  const dailyName = 'bodyprofile-' + Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd') + '.json';
  const daily = findFile_(dailyName);
  if (daily) daily.setContent(content); else folder.createFile(dailyName, content, 'application/json');
  // 오래된 날짜별 백업 정리
  const files = [], it = folder.getFiles();
  while (it.hasNext()) { const f = it.next(); if (/^bodyprofile-\d{4}-\d{2}-\d{2}\.json$/.test(f.getName())) files.push(f); }
  files.sort(function (a, b) { return a.getName() < b.getName() ? 1 : -1; });
  files.slice(KEEP_DAILY).forEach(function (f) { f.setTrashed(true); });
}

function folder_() {
  const it = DriveApp.getFoldersByName(BACKUP_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(BACKUP_FOLDER);
}
function findFile_(name) {
  const it = folder_().getFilesByName(name);
  return it.hasNext() ? it.next() : null;
}
function validToken_(t) {
  return TOKEN && TOKEN !== 'PASTE-YOUR-TOKEN-HERE' && t === TOKEN;
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** 처음 한 번 편집기에서 실행해 드라이브·시트 권한을 승인하는 용도 */
function authorize() {
  folder_();
  SpreadsheetApp.getActiveSpreadsheet().getName();
  Logger.log('권한 승인 완료. 이제 배포하세요.');
}
