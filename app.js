const DB_KEY = 'bp2026_complete_icons_v2';
let state = loadState();
let activePhase = state.activePhase || 'building';
let liftChart, bodyChart;

const phases = {
  building:{label:'PHASE 1 / BUILDING',title:'빌딩기 · 근육/근력 베이스 구축',period:'5월~6월 · 8주',goal:'근육·근력 베이스 구축 · 체중 +1~2kg',rule:'고중량 저반복 · 6~10회 × 4세트 · 휴식 90~180초'},
  cutting:{label:'PHASE 2 / CUTTING',title:'감량기 · 체지방 감량 + 근육 유지',period:'7월~9월 · 12주',goal:'체지방 -5~6kg · 메인 리프트 중량 유지',rule:'중중량 중반복 · 8~12회 · 휴식 60~90초 · 슈퍼세트 적극'},
  conditioning:{label:'PHASE 3 / CONDITIONING',title:'컨디셔닝 · 선명도와 촬영 컨디션',period:'10월~11월 초 · 5~6주',goal:'체지방 -2~3kg 추가 · 근육 선명도 ↑',rule:'중량보다 폼 · 12~15회 · 고립운동 · 포징 10분'}
};

const week = [['mon','월','🏊','수영','swim'],['tue','화','💪','Upper Body','gym'],['wed','수','🏊','수영','swim'],['thu','목','🦵','Lower + Core','gym'],['fri','금','🏊','수영','swim'],['sat','토','😴','완전 휴식','rest'],['sun','일','🍱','휴식 + Meal Prep','rest']];

const youtubeLinks = {
  bench:'https://www.youtube.com/results?search_query=바벨+벤치프레스+운동+자세',
  row:'https://www.youtube.com/results?search_query=바벨+로우+운동+자세',
  inclineDb:'https://www.youtube.com/results?search_query=인클라인+덤벨프레스+운동+자세',
  lat:'https://www.youtube.com/results?search_query=랫풀다운+운동+자세',
  shoulder:'https://www.youtube.com/results?search_query=덤벨+숄더프레스+운동+자세',
  lateralFace:'https://www.youtube.com/results?search_query=사이드+레터럴+레이즈+페이스풀+운동+자세',
  armSuperset:'https://www.youtube.com/results?search_query=덤벨컬+트라이셉스+푸쉬다운+운동+자세',
  squat:'https://www.youtube.com/results?search_query=백스쿼트+운동+자세',
  rdl:'https://www.youtube.com/results?search_query=루마니안+데드리프트+운동+자세',
  legpress:'https://www.youtube.com/results?search_query=레그프레스+운동+자세',
  lunge:'https://www.youtube.com/results?search_query=워킹+런지+덤벨+운동+자세',
  extension:'https://www.youtube.com/results?search_query=레그+익스텐션+운동+자세',
  curl:'https://www.youtube.com/results?search_query=레그컬+운동+자세',
  calf:'https://www.youtube.com/results?search_query=카프+레이즈+운동+자세',
  core:'https://www.youtube.com/results?search_query=행잉+레그레이즈+케이블+크런치+플랭크+운동+자세'
};

const workouts = {
  building: {
    tue: [
      ex('bench','💪','가슴','바벨 벤치프레스','Bench Press','4세트 × 6~8회','50~60kg → 65~75kg','견갑 모으고, 보조자 또는 세이프티바 필수',4),
      ex('row','🔙','등','바벨 로우','Barbell Row','4세트 × 6~8회','40~50kg → 60~70kg','상체 45도 고정, 등으로 당기기',4),
      ex('inclineDb','💪','윗가슴','인클라인 덤벨프레스','Incline DB Press','3세트 × 8~10회','각 14~16kg → 20~22kg','벤치 30~45도, 덤벨 살짝 모아 올리기',3),
      ex('lat','🔙','등 넓이','랫풀다운','Lat Pulldown','3세트 × 10회','45~55kg → 60~70kg','가슴 펴고, 팔꿈치로 리드',3),
      ex('shoulder','🏋️','어깨','덤벨 숄더프레스','DB Shoulder Press','3세트 × 8~10회','각 12~14kg → 18~20kg','허리 꺾지 말 것',3),
      ex('lateralFace','🏋️','어깨','사이드 레터럴 + 페이스풀','Lateral Raise + Face Pull','3세트 × 12+12회','각 5kg + 8kg → 7kg + 15kg','사이드는 어깨 높이까지만',3),
      ex('armSuperset','💪','팔','덤벨 컬 + 트라이셉스 푸쉬다운','DB Curl + Triceps Pushdown','3세트 × 10+10회','각 10kg + 18kg → 15kg + 28kg','반동 없이, 팔꿈치 고정',3)
    ],
    thu: [
      ex('squat','🦵','하체','백스쿼트','Back Squat','4세트 × 6~8회','50~60kg → 75~85kg','무릎 발끝 방향, 허리 중립, 하강 2초',4),
      ex('rdl','🦵','햄스트링','루마니안 데드리프트','Romanian Deadlift','4세트 × 8회','40~50kg → 65~75kg','엉덩이 뒤로, 햄스트링 늘림 감각',4),
      ex('legpress','🦵','하체','레그프레스','Leg Press','3세트 × 10~12회','100~120kg → 160~180kg','무릎 완전히 펴지 않기',3),
      ex('lunge','🦵','다리/둔근','워킹 런지','Walking Lunge','3세트 × 좌우 10보','각 8~10kg → 12~14kg','뒷다리 무릎 바닥 직전까지',3),
      ex('extension','🦵','대퇴사두','레그 익스텐션','Leg Extension','3세트 × 12+8회','머신 중간 → +2단계','드롭세트, 발목 패드 정강이 아래쪽',3),
      ex('curl','🦵','햄스트링','레그컬','Leg Curl','3세트 × 12회','머신 중간 → +2단계','엉덩이 뜨지 않게',3),
      ex('calf','🦵','종아리','카프 레이즈','Calf Raise','4세트 × 15회','30~40kg → 50~60kg','천천히, 최대 높이까지',4),
      ex('core','🔥','코어','코어 자이언트세트','Hanging Leg Raise + Cable Crunch + Plank','3라운드','레그레이즈 10~12회 · 크런치 20→30kg · 플랭크 60→90초','라운드 사이 60초 휴식',3)
    ]
  }
};
workouts.cutting = workouts.building;
workouts.conditioning = workouts.building;

function ex(id,emoji,part,ko,en,sets,weight,tip,setCount){return {id,emoji,part,ko,en,sets,weight,tip,setCount,icon:`assets/icons/${id}.svg`,video:youtubeLinks[id]};}
function loadState(){try{return JSON.parse(localStorage.getItem(DB_KEY)) || defaultState();}catch{return defaultState();}}
function defaultState(){return {activePhase:'building',checks:{},setChecks:{},attendance:{},lifts:[],body:[],lastDay:'tue'};}
function save(){localStorage.setItem(DB_KEY, JSON.stringify(state));}
function todayKey(){return new Date().toISOString().slice(0,10);}
function pct(a,b){return Math.min(100, Math.round((a/b)*100) || 0);}

function render(){renderPhase();renderWeek();renderWorkout();renderGoals();renderLogs();renderCharts();updateRates();}
function renderPhase(){const p=phases[activePhase];phaseLabel.textContent=p.label;phaseTitle.textContent=p.title;phasePeriod.textContent=p.period;phaseGoal.textContent=p.goal;phaseRule.textContent=p.rule;document.querySelectorAll('.phase-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.phase===activePhase));const items=['BUILDING','CUTTING','CONDITIONING','D-7','D-DAY'];const activeIndex=activePhase==='building'?0:activePhase==='cutting'?1:2;timeline.innerHTML=items.map((x,i)=>`<span class="${i===activeIndex?'active':''}">${x}</span>`).join('');}
function renderWeek(){const t=todayKey();weekGrid.innerHTML=week.map(([id,day,icon,desc,type])=>{const key=`${t}_${id}`;const checked=!!state.attendance[key];return `<label class="day-card ${type}"><input type="checkbox" data-att="${key}" ${checked?'checked':''}><span class="day-name">${day} ${icon}</span><span class="day-desc">${desc}</span></label>`;}).join('');weekGrid.querySelectorAll('input').forEach(input=>{input.addEventListener('change',e=>{state.attendance[e.target.dataset.att]=e.target.checked;save();updateRates();});});}
function renderWorkout(){const day=daySelect.value||state.lastDay||'tue';state.lastDay=day;const list=workouts[activePhase][day];workoutList.innerHTML=list.map(item=>{const doneKey=`${todayKey()}_${activePhase}_${day}_${item.id}`;const done=!!state.checks[doneKey];const url=item.video;const sets=Array.from({length:item.setCount},(_,i)=>{const sk=`${doneKey}_set_${i+1}`;return `<label><input type="checkbox" data-set="${sk}" ${state.setChecks[sk]?'checked':''}> ${i+1}세트</label>`;}).join('');return `<article class="exercise-card ${done?'done':''}"><input type="checkbox" data-check="${doneKey}" ${done?'checked':''} aria-label="${item.ko} 완료"><a class="icon-link" href="${url}" target="_blank" rel="noopener" aria-label="${item.ko} 유튜브 영상 검색"><img class="exercise-icon" src="${item.icon}" alt="${item.ko} 아이콘"></a><div><div class="exercise-head"><a href="${url}" target="_blank" rel="noopener">${item.emoji} ${item.ko} <span>${item.en}</span></a><span class="pill">🎥 영상</span><span class="pill">${item.part}</span></div><p class="exercise-meta">${item.sets}</p><div class="exercise-numbers"><b>${item.weight}</b></div><div class="set-checks">${sets}</div><p class="tip">${item.tip}</p></div></article>`;}).join('');workoutList.querySelectorAll('[data-check]').forEach(input=>{input.addEventListener('change',e=>{state.checks[e.target.dataset.check]=e.target.checked;save();renderWorkout();updateRates();});});workoutList.querySelectorAll('[data-set]').forEach(input=>{input.addEventListener('change',e=>{state.setChecks[e.target.dataset.set]=e.target.checked;save();updateRates();});});}
function updateRates(){const day=daySelect.value||'tue';const list=workouts[activePhase][day];let totalSets=0,doneSets=0;list.forEach(item=>{const base=`${todayKey()}_${activePhase}_${day}_${item.id}`;for(let i=1;i<=item.setCount;i++){totalSets++;if(state.setChecks[`${base}_set_${i}`])doneSets++;}});const rate=pct(doneSets,totalSets);todayRate.textContent=rate+'%';todayRateBar.style.width=rate+'%';const t=todayKey();const attDone=week.filter(([id])=>state.attendance[`${t}_${id}`]).length;attendanceRate.textContent=pct(attDone,week.length)+'%';}
function saveLift(){const entry={date:todayKey(),bench:Number(benchInput.value||0),squat:Number(squatInput.value||0),rdl:Number(rdlInput.value||0)};if(!entry.bench&&!entry.squat&&!entry.rdl){alert('하나 이상의 중량을 입력해주세요.');return;}state.lifts.push(entry);benchInput.value=squatInput.value=rdlInput.value='';save();renderGoals();renderLogs();renderCharts();}
function saveBody(){const entry={date:todayKey(),weight:Number(weightInput.value||0),muscle:Number(muscleInput.value||0),fat:Number(fatInput.value||0)};if(!entry.weight&&!entry.muscle&&!entry.fat){alert('하나 이상의 값을 입력해주세요.');return;}state.body.push(entry);weightInput.value=muscleInput.value=fatInput.value='';save();renderLogs();renderCharts();}
function latest(arr,key){for(let i=arr.length-1;i>=0;i--)if(Number(arr[i][key]))return Number(arr[i][key]);return 0;}
function renderGoals(){const bench=latest(state.lifts,'bench'),squat=latest(state.lifts,'squat'),rdl=latest(state.lifts,'rdl'),bodyW=latest(state.body,'weight'),muscle=latest(state.body,'muscle');const goals=[['벤치프레스',bench,70,'kg'],['스쿼트',squat,85,'kg'],['RDL',rdl,75,'kg'],['체중',bodyW?Math.max(0,84-bodyW):0,12,'감량 포인트'],['골격근량',muscle,35.5,'kg']];goalCards.innerHTML=goals.map(([name,cur,target,unit])=>{const r=pct(cur,target);return `<div class="goal-card"><strong>${r}%</strong><small>${name} · 현재 ${cur||'-'} ${unit} / 목표 ${target} ${unit}</small><div class="progress"><i style="width:${r}%"></i></div></div>`;}).join('');}
function renderLogs(){const lifts=state.lifts.slice(-3).reverse().map(x=>`<div class="log-row"><span>${x.date} 리프트</span><b>B ${x.bench||'-'} · S ${x.squat||'-'} · R ${x.rdl||'-'}</b></div>`);const body=state.body.slice(-3).reverse().map(x=>`<div class="log-row"><span>${x.date} 체성분</span><b>${x.weight||'-'}kg · 근 ${x.muscle||'-'} · 지방 ${x.fat||'-'}%</b></div>`);recentLogs.innerHTML=[...lifts,...body].slice(0,6).join('')||'<p class="exercise-meta">아직 기록이 없습니다.</p>';}
function renderCharts(){if(typeof Chart==='undefined')return;const liftCtx=document.getElementById('liftChart'),bodyCtx=document.getElementById('bodyChart');if(liftChart)liftChart.destroy();if(bodyChart)bodyChart.destroy();liftChart=new Chart(liftCtx,{type:'line',data:{labels:state.lifts.map(x=>x.date),datasets:[{label:'벤치',data:state.lifts.map(x=>x.bench||null),tension:.35},{label:'스쿼트',data:state.lifts.map(x=>x.squat||null),tension:.35},{label:'RDL',data:state.lifts.map(x=>x.rdl||null),tension:.35}]},options:chartOptions('kg')});bodyChart=new Chart(bodyCtx,{type:'line',data:{labels:state.body.map(x=>x.date),datasets:[{label:'체중',data:state.body.map(x=>x.weight||null),tension:.35},{label:'골격근량',data:state.body.map(x=>x.muscle||null),tension:.35},{label:'체지방률',data:state.body.map(x=>x.fat||null),tension:.35}]},options:chartOptions('')});}
function chartOptions(unit){return {responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#F8FAFC'}}},scales:{x:{ticks:{color:'#AAB3C2'},grid:{color:'rgba(255,255,255,.06)'}},y:{ticks:{color:'#AAB3C2',callback:v=>unit?v+unit:v},grid:{color:'rgba(255,255,255,.06)'}}}};}
function exportData(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`bodyprofile-2026-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(a.href);}
function importData(e){const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{state=JSON.parse(reader.result);save();location.reload();}catch(err){alert('복원 실패: JSON 파일을 확인해주세요.');}};reader.readAsText(file);}
function resetToday(){const prefix=`${todayKey()}_${activePhase}_${daySelect.value||'tue'}_`;Object.keys(state.checks).forEach(k=>{if(k.startsWith(prefix))delete state.checks[k];});Object.keys(state.setChecks).forEach(k=>{if(k.startsWith(prefix))delete state.setChecks[k];});save();renderWorkout();updateRates();}
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.phase-tabs button').forEach(btn=>{btn.addEventListener('click',()=>{activePhase=btn.dataset.phase;state.activePhase=activePhase;save();render();});});daySelect.value=state.lastDay||'tue';daySelect.addEventListener('change',()=>{state.lastDay=daySelect.value;save();renderWorkout();updateRates();});saveLiftBtn.addEventListener('click',saveLift);saveBodyBtn.addEventListener('click',saveBody);exportBtn.addEventListener('click',exportData);importFile.addEventListener('change',importData);resetTodayBtn.addEventListener('click',resetToday);render();if('serviceWorker'in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{});}});
