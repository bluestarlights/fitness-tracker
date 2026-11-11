// ============================================================
// BodyProfile Tracker — 공용 앱 코드 (V8.5)
// 페이지마다 window.PROFILE 값으로 사용자를 고른다: index.html = "me", wife.html = "wife"
// 사용자별로 다른 것: 저장 키, 프로그램, 목표, 화면 문구, 루틴 항목, 구글 시트 탭 접두어
// ============================================================
const APP_VERSION="V8.5";
const PROFILES={
  me:{
    storageKey:"bp_v4_straight_set_2026",
    sheetProfile:"",
    dday:"2027-02-27T09:00:00",
    reverseUntil:"2026-11-30",
    labels:{upper:"UPPER",lower:"LOWER",upperShort:"UPPER",lowerShort:"LOWER+CORE",phase:"리버스",phaseUntil:"11월"},
    // V8 프로그램: 좌골신경 치료 중 — 척추 축부하·허리 굴곡 종목 제외, 등받이 머신 중심 + 수영 보강(V8.3)
    program:{
  upper:[
    ex("extrot","케이블 외회전","Cable External Rotation","회전근개",2,"좌우 15",45,false,false,true,"🔄",null,{tip:"워밍업 · 가벼운 무게 · 팔꿈치를 옆구리에 붙이고 바깥으로 · 수영 어깨 부상 예방"}),
    ex("lat","랫풀다운","Lat Pulldown","등·광배",4,"8~10",90,true,false,false,"⬇️",60,{tip:"수영 추진력의 핵심 · 팔꿈치를 옆구리로 끌어내리기 · 상체 젖히지 않기"}),
    ex("straightarm","스트레이트암 풀다운","Straight-arm Pulldown","광배·풀 동작",3,"12~15",60,false,false,true,"🏊",null,{tip:"자유형 캐치→풀과 같은 궤적 · 팔꿈치 살짝 굽혀 고정 · 상체는 세운 채(허리 숙이지 않기)"}),
    ex("seatedrow","시티드로우 머신","Chest-supported Row","등",4,"10",90,true,false,false,"🔙",80,{tip:"가슴 패드에 밀착 · 날개뼈를 모으며 당기기"}),
    ex("chestpress","체스트프레스 머신","Chest Press Machine","가슴",3,"8~10",90,true,false,false,"💪",60,{tip:"수영은 당기는 운동 위주 → 미는 운동은 3세트로 · 등받이에 등 전체 밀착"}),
    ex("pecdeck","A1 · 펙덱 플라이","Pec Deck Fly","가슴",3,"12~15",20,false,false,true,"🦋",null,{tip:"펙덱 1번 기구 · 끝나면 옆 펙덱으로 바로 이동 (휴식 20초)"}),
    ex("reversepecdeck","A2 · 리버스 펙덱","Reverse Pec Deck","후면어깨",3,"15",60,false,false,true,"🦋",null,{tip:"펙덱 2번 기구 · 수영으로 앞쪽에 쏠린 어깨 균형 · 끝나면 60초 휴식 후 A1"}),
    ex("lateralmachine","사이드 레터럴","Lateral Raise","어깨",3,"15",60,false,false,false,"↔️",8,{tip:"앉아서 수행 · 어깨 높이까지만 · 반동 없이"}),
    ex("dipspushmachine","딥스/푸시다운 머신","Dips / Pushdown Machine","삼두",3,"12",60,false,true,false,"⇣",35,{tip:"스트로크 마지막 밀어내기(피니시) 근육"}),
    ex("armcurlmachine","암컬 머신","Arm Curl Machine","이두",2,"12",60,false,false,false,"💪",30)
  ],
  lower:[
    ex("extension","레그 익스텐션","Leg Extension","대퇴사두",4,"12",60,true,true,false,"🦵",null,{tip:"골반 고정 · 등받이 밀착 · 킥·턴 벽차기 힘"}),
    ex("legcurl","시티드 레그컬","Seated Leg Curl","햄스트링",4,"12",60,false,false,false,"🦵",null,{tip:"⚠️ 다리 저림이 심해지면 이 종목은 즉시 중단"}),
    ex("hipext","케이블 힙 익스텐션","Cable Hip Extension","둔근",3,"좌우 12",60,false,false,true,"🍑",null,{tip:"자유형 킥의 출발점(엉덩이) · 상체를 세우고 허리 젖히지 않기 · 가벼운 무게로 끝까지"}),
    ex("abduction","아웃사이 · 힙 어브덕션","Hip Abduction · 다리 벌리기","엉덩이 바깥(중둔근)",3,"15",60,false,false,true,"↔️",null,{tip:"골반 안정 → 롤링 시 하체 흔들림 감소 · 등받이 밀착"}),
    ex("seatedcalf","시티드 카프레이즈","Seated Calf Raise","종아리·발목",3,"15",45,false,false,true,"🦶",null,{tip:"맨 위에서 발끝을 끝까지 펴고 1초 정지 — 킥 발목 범위 · 척추 부하 없음"}),
    ex("pallof","팔로프 프레스","Pallof Press","코어(회전 버티기)",3,"좌우 10",45,false,false,true,"🧭",null,{tip:"케이블 옆에 서서 가슴 앞으로 밀고 2초 버티기 · 몸통이 돌아가지 않게 — 롤링 중 몸통 고정"}),
    ex("birddog","버드독","Bird Dog","코어",3,"좌우 10",45,false,false,false,"🐕",0,{tip:"허리를 고정한 채 팔·다리 뻗기 · 스트림라인 자세 연습",unit:"회",bodyweight:true,reps:10}),
    ex("sideplank","사이드 플랭크","Side Plank","코어",3,"좌우 30초",45,false,false,false,"📐",0,{tip:"좌우 각 30초 · 배영·자유형 롤링 시 옆구리 지지",unit:"초",bodyweight:true,reps:30}),
    ex("deadbug","데드버그","Dead Bug","코어",3,"좌우 10",45,false,false,false,"🪲",0,{tip:"허리를 바닥에 붙인 채 · 물에서 하체가 가라앉지 않게",unit:"회",bodyweight:true,reps:10})
  ],
  swim:[cardio("swim","수영 강습","자유형·배영 위주 · 평영·접영 제외","🏊")],
  rest:[]
},
    goal:{startW:82.0,goalW:75.5,startF:19.5,goalF:16.0,muscleFloor:37.0,muscleMin:35,muscleTarget:38,startWaist:86.2,goalWaist:82.0},
    liftSeries:[["체스트프레스","chestpress"],["시티드로우","seatedrow"],["레그익스텐션","extension"]],
    // V8.5: 받은 InBody 결과지 전체 (time·추가 지표 포함). 결과지 값이 기기 기록보다 우선한다.
    bodySeeds:[
      {date:"2026-04-21",time:"20:48",device:"620",weight:79.8,muscle:34.1,fat:23.9,fatMass:19.0,visceral:7,whr:0.86,bmr:1682,score:76,ecw:0.379},
      {date:"2026-06-09",time:"20:47",device:"620",weight:82.0,muscle:36.2,fat:21.9,fatMass:18.0,visceral:7,whr:0.84,bmr:1753,score:81,ecw:0.375},
      {date:"2026-07-02",time:"20:58",device:"620",weight:83.5,muscle:38.0,fat:20.2,fatMass:16.9,visceral:6,whr:0.84,bmr:1809,score:85,ecw:0.373},
      {date:"2026-07-30",time:"20:51",device:"620",weight:82.5,muscle:38.0,fat:19.4,fatMass:16.0,visceral:6,whr:0.84,bmr:1807,score:86,ecw:0.369},
      {date:"2026-09-01",time:"21:15",device:"270S",weight:80.8,muscle:35.7,fat:22.2,waist:87.1,fatMass:17.9,visceral:7,whr:0.85,bmr:1729,score:79,phase:6.5},
      {date:"2026-09-07",time:"21:13",device:"620",weight:80.6,muscle:37.6,fat:17.9,fatMass:14.4,visceral:5,whr:0.81,bmr:1799,score:87,ecw:0.374},
      {date:"2026-10-06",time:"20:34",device:"270S",weight:79.3,muscle:36.0,fat:20.1,waist:83.8,fatMass:15.9,visceral:6,whr:0.82,bmr:1739,score:82,phase:6.8},
      {date:"2026-10-07",time:"21:02",device:"620",weight:79.0,muscle:37.1,fat:17.4,fatMass:13.8,visceral:5,whr:0.80,bmr:1779,score:86,ecw:0.372},
      {date:"2026-11-07",time:"18:12",device:"270S",weight:82.0,muscle:37.6,fat:19.5,waist:86.2,fatMass:16.0,visceral:6,whr:0.83,bmr:1796,score:85,phase:7.0}
    ],
    guessDevice:date=>date==="2026-09-01"||date==="2026-10-06"||date>="2026-10-08"?"270S":"620",
    habits:[
      {id:"preloadCheck",title:"🥤 점심 전 프로틴 프리로드",sub:"점심 15분 전 WPI 1스쿱",sheet:"프리로드"},
      {id:"creatineCheck",title:"⚡ 크레아틴 5g",sub:"매일 복용 체크",sheet:"크레아틴"},
      {id:"waterCheck",title:"💧 물 3L",sub:"업무 중 텀블러 2.5회",sheet:"물3L"},
      {id:"standCheck",title:"🚶 30~40분마다 일어나기",sub:"디스크 압력 낮추기 · 점심 후 15분 걷기",sheet:"일어나기"}
    ],
    ui:{
      eyebrowText:"BODYPROFILE · BLACK LIME · "+APP_VERSION,
      heroTitle:"척추는 지키고<br><span>머신으로 채운다</span>",
      ddayLabel:"2027.02 말 촬영",
      phaseBar:'<div class="done">BUILD·CUT ✓</div><div class="active">REVERSE · 회복</div><div>CUT 2</div><div>D-DAY</div>',
      weekSub:"헬스 수·토 · 수영 월·화·목·금 · 일요일 완전 휴식",
      programSub:"등받이 머신 중심 · 척추 축부하 종목 제외",
      daySelect:'<option value="upper">수요일 · UPPER</option><option value="lower">토요일 · LOWER + CORE</option><option value="swim">월·화·목·금 · 수영 강습</option><option value="rest">일요일 · 완전 휴식</option>',
      programNote:'<b>11월 원칙</b> · 좌골신경 치료 중 — 스쿼트·RDL·레그프레스·벤치·크런치 제외 · 저림이 심해지면 그 종목은 즉시 중단<br><b>수영 보강</b> · 당기기 > 밀기 · 회전근개·후면어깨로 어깨 보호 · 팔로프·사이드 플랭크로 롤링 중 몸통 고정 · 수영 전날은 실패 지점까지 가지 않기',
      goalSub:"InBody 270S 기준 · 82.0kg / 19.5% → 75.5kg / 16.0%",
      muscleLabel:"골격근량 하한선",
      muscleText:"37.0kg 이상 사수",
      liftSub:"체스트프레스·시티드로우·레그 익스텐션 · 벤치·스쿼트는 아카이브",
      backupNote:"기존 localStorage 키 <b>bp_v4_straight_set_2026</b>을 그대로 사용합니다. 화·목 프로그램 시절 세션도 UPPER·LOWER 기록으로 이어집니다. 아내 앱(wife.html)과 기록은 따로 저장됩니다."
    }
  },
  wife:{
    storageKey:"bp_wife_2026",
    sheetProfile:"wife",
    dday:"2027-02-27T09:00:00",
    // 10~12월 회복·근육 늘리기, 1~2월 완만한 감량
    reverseUntil:"2026-12-31",
    labels:{upper:"전신 A",lower:"전신 B",upperShort:"전신 A",lowerShort:"전신 B",phase:"회복기",phaseUntil:"12월까지"},
    // 전신 주 2회: 같은 부위를 주 2번 자극(골격근 늘리기 최우선) · 가벼운 무게·높은 반복
    // 검진 반영: 녹내장 의심 → 숨 참고 힘주기·머리가 심장보다 낮은 자세 제외 / 서맥 → 고강도 인터벌 없음 / 역류 → 식후 바로 복부 운동 금지
    program:{
      upper:[
        ex("legpress","레그프레스","Leg Press","하체",3,"12",75,true,false,true,"🦵",null,{tip:"편하게 내려가는 범위까지만 · 무릎과 발끝 같은 방향 · 내쉬면서 밀기(숨 참지 않기)"}),
        ex("lat","랫풀다운","Lat Pulldown","등·광배",3,"12",75,true,false,true,"⬇️",null,{tip:"수영 추진력의 핵심 · 팔꿈치를 옆구리로 · 상체 젖히지 않기"}),
        ex("chestpress","체스트프레스 머신","Chest Press Machine","가슴",3,"12",75,true,false,true,"💪",null,{tip:"등받이에 등 전체 밀착 · 내쉬면서 밀기"}),
        ex("seatedrow","시티드로우 머신","Seated Row","등",3,"12",75,false,false,true,"🔙",null,{tip:"가슴 패드에 밀착 · 날개뼈를 모으며 당기기"}),
        ex("abduction","힙 어브덕션","Hip Abduction","엉덩이 바깥(중둔근)",2,"15",60,false,false,true,"↔️",null,{tip:"다리를 바깥으로 벌리기 · 롤링할 때 골반 안정"}),
        ex("extrot","케이블 외회전","Cable External Rotation","회전근개",2,"좌우 15",45,false,false,true,"🔄",null,{tip:"아주 가벼운 무게 · 팔꿈치를 옆구리에 붙이고 바깥으로 · 수영 어깨 보호"}),
        ex("deadbug","데드버그","Dead Bug","코어",2,"좌우 8",45,false,false,false,"🪲",0,{tip:"허리를 바닥에 붙인 채 · 물에서 하체가 가라앉지 않게",unit:"회",bodyweight:true,reps:8}),
        cardio("stretch","정적 스트레칭 15분","운동 후 · 각 자세 30초 × 좌우","🧘","종아리 벽 밀기 · 앉아 햄스트링 · 런지 자세 고관절 · 누워 4자 둔근 · 흉추 회전 · 벽 모서리 가슴 열기 · 목·승모근<br>머리가 심장보다 낮아지는 자세(다운독 오래 버티기 등)는 피하기")
      ],
      lower:[
        ex("extension","레그 익스텐션","Leg Extension","대퇴사두",3,"12",60,true,false,true,"🦵",null,{tip:"골반 고정 · 등받이 밀착 · 턴할 때 벽 차는 힘"}),
        ex("legcurl","시티드 레그컬","Seated Leg Curl","햄스트링",3,"12",60,false,false,true,"🦵",null,{tip:"천천히 내리기 · 엉덩이가 뜨지 않게"}),
        ex("straightarm","스트레이트암 풀다운","Straight-arm Pulldown","광배·풀 동작",3,"12",60,true,false,true,"🏊",null,{tip:"자유형 캐치→풀과 같은 궤적 · 팔꿈치 살짝 굽혀 고정 · 상체는 세운 채"}),
        ex("reversepecdeck","리버스 펙덱","Reverse Pec Deck","후면어깨",2,"15",60,false,false,true,"🦋",null,{tip:"가슴 패드 밀착 · 수영으로 앞쪽에 쏠린 어깨 균형"}),
        ex("hipext","케이블 힙 익스텐션","Cable Hip Extension","둔근",2,"좌우 12",60,false,false,true,"🍑",null,{tip:"자유형 킥의 출발점 · 상체를 세우고 허리 젖히지 않기"}),
        ex("pallof","팔로프 프레스","Pallof Press","코어(회전 버티기)",2,"좌우 10",45,false,false,true,"🧭",null,{tip:"가슴 앞으로 밀고 2초 버티기 · 숨은 계속 쉬기 · 롤링 중 몸통 고정"}),
        ex("sideplank","무릎 대고 사이드 플랭크","Side Plank (knees)","코어",2,"좌우 20초",45,false,false,false,"📐",0,{tip:"무릎 대고 좌우 각 20초 · 숨 참지 않기 · 쉬워지면 30초",unit:"초",bodyweight:true,reps:20}),
        cardio("stretch","정적 스트레칭 15분","운동 후 · 각 자세 30초 × 좌우","🧘","종아리 벽 밀기 · 앉아 햄스트링 · 런지 자세 고관절 · 누워 4자 둔근 · 흉추 회전 · 벽 모서리 가슴 열기 · 목·승모근<br>머리가 심장보다 낮아지는 자세(다운독 오래 버티기 등)는 피하기")
      ],
      swim:[cardio("swim","수영 강습","자유형·배영 위주","🏊")],
      rest:[]
    },
    goal:{startW:58.3,goalW:56.5,startF:34.8,goalF:31.0,muscleFloor:20.0,muscleMin:19,muscleTarget:21,startWaist:80.3,goalWaist:77.0},
    liftSeries:[["레그프레스","legpress"],["랫풀다운","lat"],["체스트프레스","chestpress"]],
    // V8.5: 받은 InBody 결과지 전체. 7/2·9/22는 이후 결과지의 '신체변화' 이력에서 옮긴 값(주요 3항목만)
    bodySeeds:[
      {date:"2026-04-21",time:"20:46",device:"620",weight:60.0,muscle:19.9,fat:37.4,fatMass:22.5,visceral:12,whr:0.90,bmr:1181,score:66,ecw:0.391},
      {date:"2026-06-16",time:"20:48",device:"620",weight:60.6,muscle:21.0,fat:35.5,fatMass:21.5,visceral:10,whr:0.88,bmr:1214,score:69,ecw:0.384},
      {date:"2026-07-02",time:"20:53",device:"620",weight:60.7,muscle:21.0,fat:35.7,ecw:0.383,note:"이력값"},
      {date:"2026-07-07",time:"21:03",device:"620",weight:60.5,muscle:20.8,fat:35.7,fatMass:21.6,visceral:10,whr:0.88,bmr:1211,score:68,ecw:0.388},
      {date:"2026-08-11",time:"21:35",device:"620",weight:61.3,muscle:21.0,fat:36.0,fatMass:22.1,visceral:11,whr:0.90,bmr:1217,score:68,ecw:0.388},
      {date:"2026-09-22",time:"19:46",device:"270S",weight:57.8,muscle:20.6,fat:33.6,phase:5.2,note:"이력값"},
      {date:"2026-10-06",time:"20:36",device:"270S",weight:58.3,muscle:20.3,fat:34.8,waist:80.3,fatMass:20.3,visceral:9,whr:0.87,bmr:1191,score:69,phase:4.9},
      {date:"2026-11-11",time:"20:36",device:"270S",weight:59.7,muscle:21.1,fat:34.1,waist:82.1,fatMass:20.4,visceral:9,whr:0.88,bmr:1219,score:70,phase:5.1}
    ],
    guessDevice:date=>date>="2026-09-22"?"270S":"620",
    habits:[
      {id:"preloadCheck",title:"🥤 점심 전 프로틴 프리로드",sub:"12시 이후 · 점심 15분 전 WPI 1스쿱",sheet:"프리로드"},
      {id:"creatineCheck",title:"💊 갑상선약 8시 공복",sub:"식사·커피는 1시간 뒤 · 유제품은 12시 이후",sheet:"갑상선약"},
      {id:"waterCheck",title:"💧 물 1.5~2L",sub:"붓기 관리 · 국물은 건더기만",sheet:"물"},
      {id:"standCheck",title:"🛏️ 식후 2시간 눕지 않기",sub:"역류 관리 · 저녁은 취침 2~3시간 전 마치기",sheet:"식후2시간"}
    ],
    ui:{
      eyebrowText:"BODYPROFILE · SAGE · "+APP_VERSION,
      heroTitle:"천천히 채우고<br><span>라인을 만든다</span>",
      ddayLabel:"2027.02 말 촬영",
      phaseBar:'<div class="done">RESET ✓</div><div class="active">회복 · 근육</div><div>완만한 감량</div><div>D-DAY</div>',
      weekSub:"헬스 수·토 · 수영 월·화·목·금 · 일요일 휴식",
      programSub:"전신 주 2회 · 가벼운 무게·높은 반복 · 스트레칭 15분",
      daySelect:'<option value="upper">수요일 · 전신 A</option><option value="lower">토요일 · 전신 B</option><option value="swim">월·화·목·금 · 수영 강습</option><option value="rest">일요일 · 휴식</option>',
      programNote:'<b>원칙</b> · 숨 참지 말고 내쉬면서 밀기(안압 관리) · 머리가 심장보다 낮은 자세 피하기 · 식후 바로 복부 운동 하지 않기 · 무게보다 자세와 가동범위 먼저<br><b>수영 보강</b> · 당기기 중심 · 외회전·리버스 펙덱으로 어깨 보호 · 피곤하거나 추운 날은 세트를 줄이기',
      goalSub:"InBody 270S 기준 · 58.3kg / 34.8% → 56.5kg / 31%",
      muscleLabel:"골격근량 (21kg 목표)",
      muscleText:"20.0kg 아래로 내려가지 않게",
      liftSub:"레그프레스·랫풀다운·체스트프레스",
      backupNote:"이 앱의 기록은 남편 앱과 따로 저장됩니다(저장 키 <b>bp_wife_2026</b>). 구글 시트는 같은 시트의 ‘아내 ·’ 탭으로 동기화됩니다."
    }
  }
};
const CFG=PROFILES[window.PROFILE]||PROFILES.me;
// V8.5 InBody 결과지 반영 버전·추가 지표 (상태 로딩보다 먼저 선언)
const INBODY_SHEETS_VERSION="2026-11-12";
const BODY_EXTRA_KEYS=["fatMass","visceral","whr","bmr","score","phase","ecw"];
function isCardioId(id){return id==="swim"||id==="run"||id==="stretch"}
// 사용자별 화면 문구·루틴 체크 항목 채우기 (스크립트가 본문 끝에 있어 DOM은 이미 준비됨)
(function applyProfile(){
  for(const [id,html] of Object.entries(CFG.ui)){const el=document.getElementById(id);if(el)el.innerHTML=html}
  document.getElementById("habitsBox").innerHTML=CFG.habits.map(h=>`<label class="habit"><input id="${h.id}" type="checkbox"><span><b>${h.title}</b><small>${h.sub}</small></span></label>`).join("");
})();
// ============================================================
// BodyProfile Tracker V8.0 (2026-11 · 수 UPPER / 토 LOWER / 월화목금 수영)
// 기존 V4/V5 localStorage 키와 최상위 구조를 유지한다.
// 신규 필드만 추가하여 하위 호환성을 보장한다.
// ============================================================
const STORAGE_KEY=CFG.storageKey;
const LEGACY_KEYS=["bp2026_complete_icons_v2","bp2026_complete_icons_v1","bp2026_complete_v1"];
const DDAY=new Date(CFG.dday);
// 리버스(유지기) 종료일. 이후에는 감량 페이스 판정으로 전환된다.
const REVERSE_UNTIL=CFG.reverseUntil;
// V8: 화·목 시절 기록(tue/thu)을 UPPER/LOWER 계열로 이어 붙이기 위한 매핑
const FAMILY={tue:"upper",upper:"upper",thu:"lower",lower:"lower",swim:"swim",run:"run",rest:"rest"};
function family(d){return FAMILY[d]||d}
let restTimer={left:0,total:0,name:"",id:null};
let stopwatchId=null,audioContext=null;

const PROGRAM=CFG.program;
const CURRENT_IDS=new Set([...PROGRAM.upper,...PROGRAM.lower].map(x=>x.id));
// [요일ID, 라벨, 이모지, 설명, 타입, 프로그램]
const WEEK=[
  ["mon","월","🏊","강습","swim","swim"],["tue","화","🏊","편하게","swim","swim"],["wed","수","💪",CFG.labels.upperShort,"gym","upper"],
  ["thu","목","🏊","강습","swim","swim"],["fri","금","🏊","편하게","swim","swim"],["sat","토","💪",CFG.labels.lowerShort,"gym","lower"],["sun","일","😴","휴식","rest","rest"]
];
const WEEKDAY_IDS=["sun","mon","tue","wed","thu","fri","sat"];
// 스케줄 상수(WEEK) 정의 이후에 상태를 불러와야 요일 기본값 계산이 가능하다.
let state=loadAndMigrate();
const YOUTUBE={
  straightarm:"스트레이트암 풀다운 광배",extrot:"케이블 외회전 회전근개",pallof:"팔로프 프레스",hipext:"케이블 힙 익스텐션 둔근",
  bench:"바벨 벤치프레스",chestpress:"체스트 프레스 머신",pecdeck:"펙덱 플라이",seatedrow:"시티드 로우 머신",
  lat:"랫풀다운",shouldermachine:"숄더 프레스 머신",lateralmachine:"사이드 레터럴 머신",
  cablecurl:"케이블 컬",pushdown:"케이블 푸시다운",squat:"백스쿼트",legpress:"레그프레스",
  hacksquat:"핵스쿼트 머신",extension:"레그 익스텐션",legcurl:"레그컬",
  hipmachine:"힙쓰러스트 어덕션 머신",calfmachine:"카프레이즈 머신",crunch:"케이블 크런치",
  legraise:"행잉 레그레이즈",armcurlmachine:"암컬 머신",dipspushmachine:"딥스 푸시다운 머신",calf:"카프레이즈",swim:"수영 자유형 배영",
  reversepecdeck:"리버스 펙덱 플라이",abduction:"힙 어브덕션 머신",adduction:"힙 어덕션 머신",seatedcalf:"시티드 카프레이즈",
  birddog:"버드독 허리 재활",sideplank:"사이드 플랭크",deadbug:"데드버그 허리 재활"
};

const ALTERNATIVES={
  bench:["기본 운동","프라임 플랫 체스트프레스","왓슨 애니멀 체스트프레스","스미스 벤치프레스"],
  chestpress:["기본 운동","프라임 플랫 체스트프레스","왓슨 애니멀 체스트프레스","인클라인 머신 프레스","바벨 벤치프레스(의사 허용 시)"],
  seatedrow:["기본 운동","체스트 서포티드 로우","수퍼도지바","케이블 시티드로우"],
  pecdeck:["기본 운동","케이블 크로스오버"],straightarm:["기본 운동","로프 스트레이트암 풀다운","풀오버 머신"],
  extrot:["기본 운동","밴드 외회전","옆으로 누워 덤벨 외회전"],pallof:["기본 운동","밴드 팔로프 프레스"],hipext:["기본 운동","글루트 킥백 머신"],reversepecdeck:["기본 운동","케이블 리어델트 플라이"],
  abduction:["기본 운동","케이블 힙 어브덕션"],adduction:["기본 운동","케이블 힙 어덕션"],
  seatedcalf:["기본 운동","레그프레스 카프레이즈(가벼운 무게)"],
  birddog:["기본 운동"],sideplank:["기본 운동","무릎 대고 사이드 플랭크"],deadbug:["기본 운동"],
  lat:["기본 운동","뉴텍 랫풀다운","어시스트 풀업"],
  shouldermachine:["기본 운동","프라임 숄더프레스","덤벨 숄더프레스"],
  lateralmachine:["기본 운동","케이블 레터럴레이즈","덤벨 레터럴레이즈"],
  armcurlmachine:["기본 운동","케이블 컬","덤벨 컬"],
  dipspushmachine:["기본 운동","케이블 푸시다운","어시스트 딥스"],
  squat:["기본 운동","스미스 스쿼트","핵스쿼트"],
  rdl:["기본 운동","스미스 RDL","덤벨 RDL"],
  legpress:["기본 운동","스쿼트프레스","45도 레그프레스"],
  extension:["기본 운동","원레그 익스텐션"],
  legcurl:["기본 운동","시티드 레그컬","라잉 레그컬"],
  crunch:["기본 운동","머신 크런치"],legraise:["기본 운동","리버스 크런치"],calf:["기본 운동","스미스 카프레이즈","레그프레스 카프레이즈"]
};
function ex(id,ko,en,part,sets,reps,rest,main,drop,newMachine,emoji,startWeight,opt={}){
  return{id,ko,en,part,sets,reps,rest,main,drop,newMachine,emoji,startWeight,type:"strength",tip:opt.tip||"",unit:opt.unit||"회",bodyweight:!!opt.bodyweight,startReps:opt.reps??null};
}
function cardio(id,ko,desc,emoji,tip=""){return{id,ko,en:desc,part:"유산소",sets:1,reps:"완료",rest:0,main:false,drop:false,newMachine:false,emoji,type:"cardio",tip}}
function defaults(){
  return{
    schemaVersion:8.0,day:defaultDayForToday(),checks:{},sets:{},inputs:{},notes:{},attendance:{},body:[],sessions:[],
    setData:{},sessionMeta:{},settings:{sound:true,vibration:true},celebration:{},
    dropsets:{},habits:{},catchups:{},alternatives:{},alternativePresets:{},alternativeProfiles:{},alternativeSession:{},customSets:{},sessionExerciseData:{},sessionSetCounts:{},archiveMeta:{v6StartedAt:null}
  }
}
function loadAndMigrate(){
  let src=null;
  const raw=localStorage.getItem(STORAGE_KEY);
  if(raw)try{src=JSON.parse(raw)}catch{}
  if(!src){
    for(const key of LEGACY_KEYS){
      const r=localStorage.getItem(key);if(!r)continue;
      try{src=JSON.parse(r);if(src)break}catch{}
    }
  }
  return migrateState(src||defaults());
}
// V8.5: InBody 결과지 일괄 반영. 결과지 날짜의 기록은 결과지 값으로 맞추고(허리는 결과지에 없으면 기존 값 유지),
// 결과지를 다음 날 입력해서 생긴 같은 값의 중복 기록(1~3일 뒤)은 지운다. 버전이 바뀔 때 한 번만 실행.
function applyInbodySheets(x){
  if(x.inbodySheetsVersion===INBODY_SHEETS_VERSION)return;
  for(const sd of CFG.bodySeeds){
    const seed=Object.assign({waist:0},sd,{src:"결과지"});
    const i=x.body.findIndex(r=>r.date===sd.date);
    if(i>=0){const old=x.body[i];if(!n(seed.waist)&&n(old.waist))seed.waist=n(old.waist);x.body[i]=seed}else x.body.push(seed);
    const t=new Date(sd.date+"T12:00:00");
    x.body=x.body.filter(r=>{
      if(r.date===sd.date)return true;
      const d=(new Date(r.date+"T12:00:00")-t)/86400000;
      return!(d>0&&d<=3&&n(r.weight)===sd.weight&&n(r.muscle)===sd.muscle&&n(r.fat)===sd.fat);
    });
  }
  x.inbodySheetsVersion=INBODY_SHEETS_VERSION;
}
function migrateState(old){
  const x=Object.assign(defaults(),old||{});
  for(const k of ["checks","sets","inputs","notes","attendance","setData","sessionMeta","celebration","dropsets","habits","catchups","alternatives","alternativePresets","alternativeProfiles","alternativeSession","customSets","sessionExerciseData","sessionSetCounts"]){
    if(!x[k]||typeof x[k]!=="object"||Array.isArray(x[k]))x[k]={};
  }
  if(!Array.isArray(x.body))x.body=[];
  if(!Array.isArray(x.sessions))x.sessions=[];
  x.settings=Object.assign({sound:true,vibration:true},x.settings||{});
  x.settings.sync=Object.assign({url:"",token:"",auto:true,lastSync:"",lastResult:"",dirty:false},x.settings.sync||{});
  x.dataIgnores=x.dataIgnores||{};
  x.archiveMeta=Object.assign({v6StartedAt:new Date().toISOString()},x.archiveMeta||{});
  x.body=x.body.map(r=>{
    const date=r.date||r.d||today();
    const row={date,weight:n(r.weight??r.w),muscle:n(r.muscle??r.m),fat:n(r.fat??r.f),waist:n(r.waist),device:r.device||guessDevice(date)};
    for(const k of BODY_EXTRA_KEYS)if(n(r[k]))row[k]=n(r[k]);
    if(r.time)row.time=r.time;if(r.note)row.note=r.note;if(r.src)row.src=r.src;
    return row;
  });
  applyInbodySheets(x);
  x.body.sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  // V4/V5 종목 단위 입력값을 세트 데이터로 보완
  for(const [base,val] of Object.entries(x.inputs)){
    if(!val||typeof val!=="object")continue;
    const count=inferOldSetCount(base);
    for(let i=1;i<=count;i++){
      const key=`${base}_s${i}`;
      if(!x.setData[key])x.setData[key]={weight:n(val.weight),reps:n(val.reps),completed:!!x.sets[key]};
    }
  }
  x.schemaVersion=8.0;
  if(!["upper","lower","swim","rest"].includes(x.day))x.day=defaultDayForToday();
  localStorage.setItem(STORAGE_KEY,JSON.stringify(x));
  return x;
}
// 기기 정보가 없는 과거 기록: 9/1·10/6 및 10/8 이후는 270S, 그 외(4~10/7)는 620
function guessDevice(date){return CFG.guessDevice(date)}
function inferOldSetCount(base){
  const map={bench:4,row:4,incline:3,inclineDb:3,lat:3,shoulder:3,lateral:3,curl:3,pushdown:3,squat:4,rdl:3,legpress:3,lunge:3,extension:3,legcurl:3,calf:4,legraise:3,crunch:3,plank:3};
  for(const [id,c] of Object.entries(map))if(base.includes("_"+id))return c;
  return 3;
}
// persist: 기기 저장만. save: 저장 + (설정 시) 구글 시트 자동 동기화 예약
function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function save(){if(state.settings?.sync)state.settings.sync.dirty=true;persist();scheduleSync()}
function n(v){return Number(v)||0}
// 로컬(한국) 날짜 기준. UTC 기준이면 오전 9시 전 기록이 전날로 저장된다.
function localISO(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function today(){return localISO(new Date())}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function fmt(sec){sec=Math.max(0,Math.floor(sec));const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return h?`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`}
function youtube(id){return"https://www.youtube.com/results?search_query="+encodeURIComponent((YOUTUBE[id]||id)+" 정확한 자세")}
function startOfWeek(d=new Date()){const x=new Date(d),offset=(x.getDay()+6)%7;x.setHours(12,0,0,0);x.setDate(x.getDate()-offset);return x}
function isoAdd(base,days){const d=new Date(base);d.setDate(d.getDate()+days);return localISO(d)}
function activeProgramDay(){return state.day}
function sessionKey(){return `${today()}_${activeProgramDay()}`}

document.addEventListener("DOMContentLoaded",async()=>{
  // 페이지를 열 때 실제 요일에 맞는 프로그램을 자동 선택한다.
  state.day=defaultDayForToday(); save();
  bindNav();bindControls();renderAll();updateDday();setInterval(updateDday,60000);resumeWatch();
  initWakeLock();
  if("serviceWorker"in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{});
});
function bindNav(){
  document.querySelectorAll(".bottom button").forEach(b=>b.onclick=()=>{
    document.querySelectorAll(".bottom button").forEach(x=>x.classList.toggle("active",x===b));
    document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===`view-${b.dataset.view}`));
    requestAnimationFrame(renderCharts);
  });
}
function bindControls(){
  daySelect.value=state.day;
  daySelect.onchange=()=>{state.day=daySelect.value;save();renderWorkout();renderSummary();resumeWatch()};
  sessionBtn.onclick=toggleWatch;saveBodyBtn.onclick=saveBody;
  exportBtn.onclick=backup;importFile.onchange=restore;resetTodayBtn.onclick=resetToday;clearAllBtn.onclick=clearAll;
  skipRest.onclick=()=>stopRest();restartRest.onclick=()=>restTimer.total&&startRest(restTimer.total,restTimer.name);
  soundToggle.onclick=()=>toggleSetting("sound");vibrationToggle.onclick=()=>toggleSetting("vibration");
  syncUrl.onchange=()=>{state.settings.sync.url=syncUrl.value.trim();persist();renderSync()};
  syncToken.onchange=()=>{state.settings.sync.token=syncToken.value.trim();persist();renderSync()};
  syncTokenBtn.onclick=makeToken;syncTestBtn.onclick=testSync;syncNowBtn.onclick=()=>syncNow(false);syncRestoreBtn.onclick=restoreFromSheet;
  syncAutoToggle.onclick=()=>{state.settings.sync.auto=!state.settings.sync.auto;persist();renderSync()};
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"&&state.settings.sync.dirty)syncNow(true)});
  for(const el of [preloadCheck,creatineCheck,waterCheck,standCheck])el.onchange=saveHabits;
  renderToggles();
}
// 실제 요일 → 기본 프로그램 매핑 (V8: 수 UPPER · 토 LOWER · 월화목금 수영 · 일 휴식)
function defaultDayForToday(){return WEEK.find(w=>w[0]===WEEKDAY_IDS[new Date().getDay()])?.[5]||"rest"}

// 화면 꺼짐 방지: 지원 브라우저에서는 Screen Wake Lock API 사용.
// iOS Safari/PWA는 사용자 설정/저전력 모드 등에 따라 시스템이 해제할 수 있으므로
// visibilitychange 시 자동 재요청한다.
let wakeLock=null;
async function requestWakeLock(){
  if(!("wakeLock" in navigator))return;
  try{wakeLock=await navigator.wakeLock.request("screen");wakeLock.addEventListener("release",()=>{wakeLock=null})}catch(e){}
}
function initWakeLock(){
  requestWakeLock();
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")requestWakeLock()});
  ["touchstart","click"].forEach(evt=>document.addEventListener(evt,()=>{if(!wakeLock)requestWakeLock()},{passive:true}));
}

function updateDday(){const diff=Math.ceil((DDAY-new Date())/86400000);dday.textContent=diff>=0?`D-${diff}`:`D+${Math.abs(diff)}`}
function renderAll(){renderHabits();renderWeek();renderWorkout();renderSummary();renderBody();renderDashboard();renderArchive();renderCharts();renderIntegrity();renderSync()}
function renderHabits(){
  const h=state.habits[today()]||{};
  preloadCheck.checked=!!h.preload;creatineCheck.checked=!!h.creatine;waterCheck.checked=!!h.water;standCheck.checked=!!h.stand;
  habitBadge.textContent=`${[h.preload,h.creatine,h.water,h.stand].filter(Boolean).length}/4`;
}
function saveHabits(){
  state.habits[today()]={...(state.habits[today()]||{}),preload:preloadCheck.checked,creatine:creatineCheck.checked,water:waterCheck.checked,stand:standCheck.checked};
  save();renderHabits();
}
function renderWeek(){
  const m=startOfWeek();
  weekGrid.innerHTML=WEEK.map(([id,l,em,desc,type],i)=>{
    const date=isoAdd(m,i),key=`${date}_${id}`,checked=!!state.attendance[key],catchup=state.catchups[key];
    const isToday=date===today();
    return`<label class="day ${type}"${isToday?' style="box-shadow:inset 0 0 0 2px var(--lime)"':""}><input data-att="${key}" type="checkbox" ${checked?"checked":""} ${id==="sun"?"disabled":""}><b>${l} ${em}</b><small>${desc}</small>${catchup?'<span class="catchmark">보충 ✓</span>':""}</label>`;
  }).join("");
  weekGrid.querySelectorAll("[data-att]").forEach(x=>x.onchange=()=>{state.attendance[x.dataset.att]=x.checked;save();renderSummary()});
}
function getProgram(){return PROGRAM[family(activeProgramDay())]||[]}
// 운동별 세트 수를 사용자가 조정할 수 있게 하되 기본 프로그램 값은 그대로 유지
function setCount(it){
  if(it.type==="cardio")return 1;
  const key=exerciseScope(it.id,altName(it.id));
  const v=n(state.sessionSetCounts[key]??state.customSets[it.id]);
  return v?clamp(Math.round(v),1,10):it.sets;
}

// 대체 종목별 중량·횟수 프로필: 과거 기록을 덮어쓰지 않고 종목별로 따로 저장
const ALT_BASELINES={
 "프라임 플랫 체스트프레스":{weight:60,reps:10},"왓슨 애니멀 체스트프레스":{weight:50,reps:10},
 "스미스 벤치프레스":{weight:60,reps:10},"수퍼도지바":{weight:60,reps:10},
 "케이블 시티드로우":{weight:55,reps:12},"체스트 서포티드 로우":{weight:50,reps:10},
 "뉴텍 랫풀다운":{weight:50,reps:12},"어시스트 풀업":{weight:30,reps:10},
 "덤벨 숄더프레스":{weight:13,reps:10},"케이블 레터럴레이즈":{weight:5,reps:15},
 "덤벨 레터럴레이즈":{weight:8,reps:15},"케이블 컬":{weight:20,reps:12},
 "덤벨 컬":{weight:10,reps:12},"케이블 푸시다운":{weight:25,reps:12},
 "어시스트 딥스":{weight:30,reps:12},"스미스 스쿼트":{weight:80,reps:10},
 "핵스쿼트":{weight:80,reps:10},"스미스 RDL":{weight:70,reps:10},
 "덤벨 RDL":{weight:24,reps:10},"스쿼트프레스":{weight:120,reps:12},
 "45도 레그프레스":{weight:160,reps:12},"원레그 익스텐션":{weight:20,reps:12},
 "시티드 레그컬":{weight:40,reps:12},"라잉 레그컬":{weight:35,reps:12},
 "머신 크런치":{weight:30,reps:15}
};
function altName(id){return state.alternativeSession[sessionKey()+"_"+id]||state.alternatives[id]||"기본 운동"}
function altProfileKey(id,name){return id+"::"+name}
function exerciseScope(id,name){return JSON.stringify([sessionKey(),id,name||"기본 운동"])}
function present(v){return v!==undefined&&v!==null&&v!==""}
function copySet(v){return v?{...v}:null}
// 지난 세션의 같은 세트 → 없으면(이번에 세트 수가 늘어난 경우) 지난 세션의 마지막 세트
function resolvePreviousSet(id,name,no){
 const previous=(getPrevious(id,name)?.sets||[]).filter(v=>present(v.weight)&&(n(v.weight)>0||n(v.reps)>0));
 const exact=previous.find(v=>Number(v.setNumber||0)===no);
 return exact||previous[no-1]||previous.at(-1)||null;
}
function captureExercise(id,name){
 const it=getProgram().find(x=>x.id===id);if(!it)return;
 const key=exerciseScope(id,name),entry=state.sessionExerciseData[key]||{sets:{}};
 const count=Number(state.sessionSetCounts[key]??entry.count??state.customSets[id]??it.sets);
 const sets={...(entry.sets||{})};
 for(let i=1;i<=Math.min(10,Math.max(1,count));i++){
  const k=sessionKey()+"_"+id+"_s"+i;
  if(state.setData[k])sets[i]={...state.setData[k]};
  else if(state.sets[k]!==undefined)sets[i]={...(sets[i]||{}),completed:!!state.sets[k]};
 }
 state.sessionExerciseData[key]={sets,count};state.sessionSetCounts[key]=count;
}
function restoreExercise(id,name){
 const it=getProgram().find(x=>x.id===id);if(!it)return;
 const scope=exerciseScope(id,name),entry=state.sessionExerciseData[scope];
 const count=Number(state.sessionSetCounts[scope]??entry?.count??it.sets);
 const preset=state.alternativeProfiles[altProfileKey(id,name)]||{};
 const baseline=ALT_BASELINES[name]||{};
 for(let i=1;i<=10;i++){
  const key=sessionKey()+"_"+id+"_s"+i;
  const previous=resolvePreviousSet(id,name,i);
  const existing=entry?.sets?.[i];
  if(i>count){delete state.setData[key];delete state.sets[key];continue}
  // Stored set has priority, followed by past matching exercise, then recommended starting values.
  const weight=present(existing?.weight)?existing.weight:present(previous?.weight)?previous.weight:present(preset[i]?.weight)?preset[i].weight:present(baseline.weight)?baseline.weight:it.startWeight??"";
  const reps=present(existing?.reps)?existing.reps:present(previous?.reps)?previous.reps:present(preset[i]?.reps)?preset[i].reps:present(baseline.reps)?baseline.reps:(it.startReps??"");
  const row={weight,reps,completed:!!existing?.completed};
  state.setData[key]=row;state.sets[key]=row.completed;
 }
 state.sessionSetCounts[scope]=count;
 state.sessionExerciseData[scope]={...(entry||{}),count,sets:{...(entry?.sets||{})}};
}
function seedVisibleExercise(id,name){
 const it=getProgram().find(x=>x.id===id);if(!it||it.type==="cardio")return;
 const scope=exerciseScope(id,name);
 let entry=state.sessionExerciseData[scope];
 const count=setCount(it);
 if(!entry){
  entry={sets:{},count};
  // On migration, preserve current visible legacy sets, including gaps.
  for(let i=1;i<=count;i++){
   const key=sessionKey()+"_"+id+"_s"+i;
   if(state.setData[key])entry.sets[i]={...state.setData[key]};
  }
  state.sessionExerciseData[scope]=entry;state.sessionSetCounts[scope]=count;
 }
 for(let i=1;i<=count;i++){
  const key=sessionKey()+"_"+id+"_s"+i;
  if(state.setData[key])continue;
  const old=entry.sets?.[i],prev=resolvePreviousSet(id,name,i),preset=state.alternativeProfiles[altProfileKey(id,name)]?.[i]||{},baseline=ALT_BASELINES[name]||{};
  const weight=present(old?.weight)?old.weight:present(prev?.weight)?prev.weight:present(preset.weight)?preset.weight:present(baseline.weight)?baseline.weight:it.startWeight??"";
  const reps=present(old?.reps)?old.reps:present(prev?.reps)?prev.reps:present(preset.reps)?preset.reps:present(baseline.reps)?baseline.reps:(it.startReps??"");
  state.setData[key]={...old,weight,reps,completed:!!(old?.completed??state.sets[key])};
  state.sets[key]=!!state.setData[key].completed;
 }
 captureExercise(id,name);
}
function alternativePrevious(id,name){
 const rows=state.sessions.filter(s=>s.date!==today()&&s.details?.[id]?.alternative===name)
 .sort((a,b)=>String(b.date).localeCompare(String(a.date)));
 return rows[0]?.details?.[id]?.sets||null;
}
function changeAlternative(id,newName){
 newName=String(newName||"").trim();if(!newName)return;
 const old=altName(id);if(old===newName)return;
 seedVisibleExercise(id,old);
 captureExercise(id,old);
 const it=getProgram().find(x=>x.id===id);if(!it)return;
 state.alternativeSession[sessionKey()+"_"+id]=newName;
 state.alternatives[id]=newName;
 restoreExercise(id,newName);
 captureExercise(id,newName);
 save();renderWorkout();snapshot();
}
function changeSetCount(id,delta){
 const it=getProgram().find(x=>x.id===id);if(!it||it.type==="cardio")return;
 const name=altName(id),scope=exerciseScope(id,name),oldCount=setCount(it);
 const next=clamp(oldCount+delta,1,10);if(next===oldCount)return;
 seedVisibleExercise(id,name);
 captureExercise(id,name);
 state.sessionSetCounts[scope]=next;
 const entry=state.sessionExerciseData[scope]||{sets:{}};
 entry.count=next;state.sessionExerciseData[scope]=entry;
 if(next>oldCount){
   for(let i=oldCount+1;i<=next;i++){
     const k=sessionKey()+"_"+id+"_s"+i,old=entry.sets?.[i],past=resolvePreviousSet(id,name,i),baseline=ALT_BASELINES[name]||{},preset=state.alternativeProfiles[altProfileKey(id,name)]?.[i]||{};
     const row={weight:old?.weight??past?.weight??preset.weight??baseline.weight??it.startWeight??"",reps:old?.reps??past?.reps??preset.reps??baseline.reps??it.startReps??"",completed:!!old?.completed};
     state.setData[k]=row;state.sets[k]=row.completed;
   }
 }else{
   for(let i=next+1;i<=oldCount;i++){
     const k=sessionKey()+"_"+id+"_s"+i;
     if(state.setData[k])entry.sets[i]={...state.setData[k]};
     delete state.setData[k];delete state.sets[k];
   }
 }
 captureExercise(id,name);save();renderWorkout();snapshot();
}
function escapeHTML(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
function renderWorkout(){
  const list=getProgram(),session=sessionKey();
  const isRest=family(activeProgramDay())==="rest";
  sessionBtn.disabled=isRest;sessionBtn.style.opacity=isRest?.4:1;
  programPill.textContent=isRest?"휴식":family(activeProgramDay())==="swim"?"강습":"55~65분";
  if(isRest){
    exerciseList.innerHTML=`<div class="restcard"><b>😴 오늘은 완전 휴식</b>주 6일 활동의 유일한 회복일이에요.<br>가벼운 산책·스트레칭은 좋고, 운동은 쉬어주세요.<br>밀프렙 데이 · 다음 주 허리둘레 측정 준비</div>`;
    renderSummary();return;
  }
  for(const it of list)seedVisibleExercise(it.id,altName(it.id));
  save();
  exerciseList.innerHTML=list.map((it,index)=>{
    const prev=getPrevious(it.id,altName(it.id)),status=it.main?mainLiftStatus(it.id):null,complete=exerciseComplete(it,session);
    const count=setCount(it);
    const rows=Array.from({length:count},(_,i)=>setRow(it,i+1,session,prev)).join("");
    const altOptions=(ALTERNATIVES[it.id]||["기본 운동"]).concat(["직접 입력…"]);
    const savedAlt=altName(it.id);
    const alt=`<div class="alternative-box"><b>🔁 대체 운동</b><select class="alternative-select" data-alt="${it.id}">${altOptions.map(v=>`<option value="${v}" ${savedAlt===v?"selected":""}>${v}</option>`).join("")}</select><input class="alternative-custom ${savedAlt&&!altOptions.includes(savedAlt)?"show":""}" data-altcustom="${it.id}" value="${savedAlt&&!altOptions.includes(savedAlt)?escapeHTML(savedAlt):""}" placeholder="대체 운동 직접 입력"></div>`;
    const drop=it.drop?`<label class="dropbox"><input data-drop="${session}_${it.id}" type="checkbox" ${state.dropsets[`${session}_${it.id}`]?"checked":""}><span><b>🔥 마지막 세트 드롭세트</b><small> 선택 옵션</small></span></label>`:"";
    return`<article class="exercise ${complete?"done":""} ${it.main?"main":""}" style="animation-delay:${index*45}ms">
      <div class="exleft"><div class="exicon">${it.emoji}</div><button class="bigcheck ${complete?"on":""}" data-excomplete="${it.id}" aria-label="${it.ko} 전체 완료">${complete?"✓":"○"}</button></div>
      <div><div class="extitle"><a href="${youtube(it.id)}" target="_blank" rel="noopener">${index+1}. ${it.ko}<span>${it.en}</span></a>${it.main?'<span class="pill">⭐ 중량 사수</span>':""}</div>
      <div class="badges"><span class="badge ${it.main?"main":""}">${it.type==="cardio"?it.en:`${count}×${it.reps}${it.unit==="초"||/[회초]$/.test(it.reps)?"":"회"}`}</span>${it.rest?`<span class="badge">휴식 ${it.rest}초</span>`:""}<span class="badge">${it.part}</span>${altName(it.id)!=="기본 운동"?`<span class="badge new">대체: ${altName(it.id)}</span>`:""}${it.newMachine?'<span class="badge new">NEW 머신 · 첫 중량 입력</span>':""}</div>
      <p class="prev">${prev?`지난 세션: ${prev.summary}`:it.newMachine?"첫 사용 · 머신 중량을 입력하세요":it.bodyweight?"맨몸 운동 · 반복/시간만 기록":"지난 세션 기록 없음"}</p>${it.tip?`<p class="tip">${it.tip}</p>`:""}
      ${status?`<div class="status ${status.type}" data-main-status="${it.id}">${status.text}</div>`:""}${alt}${drop}
      <div class="sets">${rows}</div>${it.type==="strength"?`<div class="settools"><span>현재 ${count}세트 · 1~10세트 조정</span><div><button class="settoolbtn remove" data-setcount="-1" data-exid="${it.id}">− 세트</button> <button class="settoolbtn add" data-setcount="1" data-exid="${it.id}">＋ 세트</button></div></div>`:""}<textarea class="memo" data-note="${session}_${it.id}" placeholder="운동 메모">${state.notes[`${session}_${it.id}`]||""}</textarea></div>
    </article>`;
  }).join("");
  exerciseList.querySelectorAll("[data-step]").forEach(bindHoldStep);
  exerciseList.querySelectorAll("[data-setcount]").forEach(b=>b.onclick=()=>changeSetCount(b.dataset.exid,n(b.dataset.setcount)));
  exerciseList.querySelectorAll("[data-loadprev]").forEach(b=>b.onclick=()=>loadPreviousField(b));
  exerciseList.querySelectorAll("[data-field]").forEach(x=>{x.oninput=()=>updateSetInput(x);x.onchange=()=>{updateSetInput(x);guardInput(x)}});
  exerciseList.querySelectorAll("[data-check]").forEach(x=>x.onchange=()=>toggleSet(x));
  exerciseList.querySelectorAll("[data-excomplete]").forEach(b=>b.onclick=()=>toggleExercise(b.dataset.excomplete));
  exerciseList.querySelectorAll("[data-alt]").forEach(sel=>sel.onchange=()=>{const id=sel.dataset.alt;if(sel.value==="직접 입력…"){const inp=exerciseList.querySelector(`[data-altcustom="${id}"]`);inp?.classList.add("show");inp?.focus();}else{changeAlternative(id,sel.value);}});
  exerciseList.querySelectorAll("[data-altcustom]").forEach(inp=>{
    const commit=()=>{const v=inp.value.trim();if(!v)return;changeAlternative(inp.dataset.alt,v)};
    inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();commit()}});
    inp.addEventListener("change",commit);
  });
  exerciseList.querySelectorAll("[data-drop]").forEach(x=>x.onchange=()=>{state.dropsets[x.dataset.drop]=x.checked;save()});
  exerciseList.querySelectorAll("[data-note]").forEach(x=>x.oninput=()=>{state.notes[x.dataset.note]=x.value;save()});
  renderSummary();
}
function setRow(it,no,session,prev){
  const key=`${session}_${it.id}_s${no}`,rec=state.setData[key]||{},legacy=state.inputs[`${session}_${it.id}`]||{},prevSet=prev?.sets?.[no-1]||{};
  const has=v=>v!==undefined&&v!==null&&v!=="";
  const weight=has(rec.weight)?rec.weight:has(prevSet.weight)?prevSet.weight:has(legacy.weight)?legacy.weight:(it.startWeight??"");
  const reps=has(rec.reps)?rec.reps:has(prevSet.reps)?prevSet.reps:has(legacy.reps)?legacy.reps:(it.startReps??"");
  const checked=!!(rec.completed??state.sets[key]);
  if(it.type==="cardio")return`<div class="setrow ${checked?"checked":""}" data-row="${key}" style="grid-template-columns:1fr 44px"><span class="setlabel">${it.ko} 완료</span><input class="check" data-check="${key}" data-rest="0" data-name="${it.ko}" type="checkbox" ${checked?"checked":""}></div>`;
  const repsBox=`<div class="num num-reps"><button type="button" class="numtitle loadprev" data-loadprev="reps" data-exid="${it.id}" data-setno="${no}" title="이전 수행값 불러오기">${it.unit==="초"?"시간":"반복"} <small>${it.unit}</small> ↶</button><button class="step" data-step="-1" data-target="${key}_r">−</button><input id="${key}_r" class="setinput" data-field="reps" data-key="${key}" type="number" step="1" inputmode="numeric" pattern="[0-9]*" value="${reps}" placeholder="${it.unit}"><button class="step" data-step="1" data-target="${key}_r">＋</button></div>`;
  if(it.bodyweight)return`<div class="setrow bw ${checked?"checked":""}" data-row="${key}"><span class="setlabel">${no}세트</span>${repsBox}<input class="check" data-check="${key}" data-rest="${it.rest}" data-name="${it.ko}" type="checkbox" ${checked?"checked":""}></div>`;
  return`<div class="setrow ${checked?"checked":""}" data-row="${key}"><span class="setlabel">${no}세트</span>
    <div class="num num-weight"><button type="button" class="numtitle loadprev" data-loadprev="weight" data-exid="${it.id}" data-setno="${no}" title="이전 수행 중량 불러오기">중량 <small>kg</small> ↶</button><button class="step" data-step="-1" data-target="${key}_w">−</button><input id="${key}_w" class="setinput" data-field="weight" data-key="${key}" type="number" step="1" inputmode="decimal" value="${weight}" placeholder="kg"><button class="step" data-step="1" data-target="${key}_w">＋</button></div>
    ${repsBox}
    <input class="check" data-check="${key}" data-rest="${it.rest}" data-name="${it.ko}" type="checkbox" ${checked?"checked":""}></div>`;
}
function stepValue(btn){const input=document.getElementById(btn.dataset.target);if(!input)return;input.value=Math.max(0,n(input.value)+n(btn.dataset.step));input.dispatchEvent(new Event("input",{bubbles:true}))}
// V7.11: deliberate tap = one step; stationary long press = repeat.
// Scroll, finger movement, loss of focus, pointer cancellation or another control stops the repeat.
let touchScrollAt=0;
const activeStepHolds=new Set();
function cancelStepHolds(){for(const stop of [...activeStepHolds])stop();}
window.addEventListener("scroll",()=>{touchScrollAt=performance.now();cancelStepHolds();},{passive:true});
window.addEventListener("blur",cancelStepHolds);
document.addEventListener("visibilitychange",()=>{if(document.hidden)cancelStepHolds()});
document.addEventListener("pointerdown",e=>{for(const stop of [...activeStepHolds])if(!stop.button.contains(e.target))stop()},true);
function bindHoldStep(btn){
 let down=null,delay=null,repeat=null,blocked=false;
 btn.type="button";
 const clearTimers=()=>{if(delay!==null)clearTimeout(delay);if(repeat!==null)clearInterval(repeat);delay=null;repeat=null};
 const stop=()=>{clearTimers();down=null;activeStepHolds.delete(stop)};
 stop.button=btn;
 const inBounds=e=>{const r=btn.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom};
 btn.addEventListener("pointerdown",e=>{
   if(!e.isPrimary||e.button!==0)return;
   cancelStepHolds();blocked=false;
   down={id:e.pointerId,x:e.clientX,y:e.clientY,started:performance.now(),repeating:false};
   activeStepHolds.add(stop);
   delay=setTimeout(()=>{
     if(!down||blocked||performance.now()-touchScrollAt<130)return;
     down.repeating=true;
     stepValue(btn);
     repeat=setInterval(()=>{if(down&&!blocked)stepValue(btn)},115);
   },420);
 },{passive:true});
 btn.addEventListener("pointermove",e=>{
   if(!down||e.pointerId!==down.id)return;
   if(Math.hypot(e.clientX-down.x,e.clientY-down.y)>8||!inBounds(e)){
     blocked=true;stop();
   }
 },{passive:true});
 btn.addEventListener("pointerup",e=>{
   if(!down||e.pointerId!==down.id)return;
   const shouldTap=!blocked&&!down.repeating&&inBounds(e)&&performance.now()-touchScrollAt>130;
   stop();if(shouldTap)stepValue(btn);
 });
 btn.addEventListener("pointercancel",()=>{blocked=true;stop()});
 btn.addEventListener("pointerleave",()=>{if(down){blocked=true;stop()}});
 // Pointer events handled above. Prevent compatibility click from changing value twice.
 btn.addEventListener("click",e=>{if(e.detail!==0){e.preventDefault();return}stepValue(btn)});
 for(const type of ["contextmenu","selectstart","dragstart"])btn.addEventListener(type,e=>e.preventDefault());
}
// ↶ 버튼: ① 지난 세션 같은 세트 → ② 지난 세션 마지막 세트 → ③ 오늘 바로 앞 세트 순으로 값을 채운다.
function loadPreviousField(btn){
 const id=btn.dataset.exid,field=btn.dataset.loadprev,no=Number(btn.dataset.setno);
 const suffix=field==="weight"?"_w":"_r",key=sessionKey()+"_"+id+"_s"+no;
 const input=document.getElementById(key+suffix);if(!input)return;
 let value=resolvePreviousSet(id,altName(id),no)?.[field],source="지난 세션";
 if(!present(value)||n(value)===0){
  const before=no>1?document.getElementById(sessionKey()+"_"+id+"_s"+(no-1)+suffix)?.value:"";
  if(present(before)){value=before;source=`오늘 ${no-1}세트`}else value="";
 }
 if(!present(value)){toast(no>1?"앞 세트 값을 먼저 입력하세요":"이전 기록이 없어요 · 첫 중량을 입력하세요");return}
 input.value=value;input.dispatchEvent(new Event("input",{bubbles:true}));
 input.classList.remove("flash");void input.offsetWidth;input.classList.add("flash");
 toast(`${source} 값 ${value}${field==="weight"?"kg":""} 불러옴`);
}
let toastId=null;
function toast(msg){
 let el=document.getElementById("toast");
 if(!el){el=document.createElement("div");el.id="toast";document.body.appendChild(el)}
 el.textContent=msg;el.classList.add("show");clearTimeout(toastId);toastId=setTimeout(()=>el.classList.remove("show"),1600);
}
function updateSetInput(inp){
 const key=inp.dataset.key;state.setData[key]=state.setData[key]||{};
 state.setData[key][inp.dataset.field]=inp.value===""?"":n(inp.value);
 const id=getProgram().find(it=>key.startsWith(sessionKey()+"_"+it.id+"_s"))?.id;
 if(id){const name=altName(id),pk=altProfileKey(id,name),si=Number(key.match(/_s(\d+)$/)?.[1]);
  const p=state.alternativeProfiles[pk]||{};p[si]=p[si]||{};p[si][inp.dataset.field]=state.setData[key][inp.dataset.field];state.alternativeProfiles[pk]=p;
  captureExercise(id,name);
 }
 save();snapshot();renderSummary();updateMainStatuses();
}
function toggleSet(chk){
  const key=chk.dataset.check;state.setData[key]=state.setData[key]||{};state.setData[key].completed=chk.checked;state.sets[key]=chk.checked;
  document.querySelector(`[data-row="${CSS.escape(key)}"]`)?.classList.toggle("checked",chk.checked);
  if(chk.checked){vibrate(35);if(n(chk.dataset.rest))startRest(n(chk.dataset.rest),chk.dataset.name)}
  {const id=getProgram().find(it=>key.startsWith(sessionKey()+"_"+it.id+"_s"))?.id;if(id)captureExercise(id,altName(id));}
  save();snapshot();renderSummary();checkComplete();
}
function toggleExercise(id){
  const it=getProgram().find(x=>x.id===id),session=sessionKey();if(!it)return;
  const target=!exerciseComplete(it,session);
  for(let i=1;i<=setCount(it);i++){const key=`${session}_${id}_s${i}`;state.setData[key]=state.setData[key]||{};state.setData[key].completed=target;state.sets[key]=target}
  captureExercise(id,altName(id));save();snapshot();renderWorkout();if(target)vibrate(45);checkComplete();
}
function exerciseComplete(it,session){for(let i=1;i<=setCount(it);i++)if(!(state.setData[`${session}_${it.id}_s${i}`]?.completed||state.sets[`${session}_${it.id}_s${i}`]))return false;return true}
function getStats(){
  let total=0,done=0,volume=0;const session=sessionKey();
  for(const it of getProgram())for(let i=1;i<=setCount(it);i++){total++;const r=state.setData[`${session}_${it.id}_s${i}`]||{};if(r.completed||state.sets[`${session}_${it.id}_s${i}`])done++;if(it.type==="strength")volume+=n(r.weight)*n(r.reps)}
  return{total,done,volume,percent:total?Math.round(done/total*100):0}
}
function renderSummary(){
  const st=getStats();doneMetric.textContent=st.percent+"%";volumeMetric.textContent=Math.round(st.volume).toLocaleString()+"kg";timeMetric.textContent=fmt(elapsedSeconds());
  const m=startOfWeek();let attended=0;
  WEEK.slice(0,6).forEach(([id],i)=>{if(state.attendance[`${isoAdd(m,i)}_${id}`])attended++});
  attendanceBadge.textContent=`활동 출석 ${attended}/6`;
}
function getPrevious(id,alternative){
  const actual=activeProgramDay();
  const rows=state.sessions.filter(s=>family(s.day)===family(actual)&&s.date!==today()).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  for(let i=rows.length-1;i>=0;i--){
    const d=rows[i].details?.[id];
    if(d?.alternative&&d.alternative!==(alternative||"기본 운동"))continue;
    if(d?.sets?.length)return{sets:d.sets,summary:d.sets.map(x=>`${x.weight||0}kg×${x.reps||0}`).join(" · ")};
    if(["bench","squat","rdl"].includes(id)&&n(rows[i][id]))return{sets:[{weight:n(rows[i][id]),reps:0}],summary:`${n(rows[i][id])}kg`};
  }
  return null;
}
function mainLiftStatus(id){
  const hist=state.sessions.filter(s=>s.date!==today()).sort((a,b)=>String(a.date).localeCompare(String(b.date))).map(s=>n(s.details?.[id]?.topWeight||s[id])).filter(Boolean);
  const current=topWeight(id);
  if(!current||!hist.length)return{type:"good",text:"오늘 중량 입력 시 유지 여부 판정"};
  const prev=hist.at(-1);if(current>=prev)return{type:"good",text:"근손실 방어 중 · 지난 중량 유지/상승"};
  if(hist.length>1&&prev<hist.at(-2)&&current<prev)return{type:"warn",text:"⚠️ 2회 연속 중량 하락 · 칼로리 +100 / 회복 점검"};
  return{type:"warn",text:"중량 소폭 하락 · 다음 세션까지 관찰"};
}
function topWeight(id){const it=getProgram().find(x=>x.id===id);if(!it)return 0;let top=0;for(let i=1;i<=setCount(it);i++)top=Math.max(top,n(state.setData[`${sessionKey()}_${id}_s${i}`]?.weight));return top}
function updateMainStatuses(){document.querySelectorAll("[data-main-status]").forEach(el=>{const st=mainLiftStatus(el.dataset.mainStatus);el.className=`status ${st.type}`;el.textContent=st.text})}

// ---------- 휴식 타이머 ----------
// 종료 예정 시각을 기준으로 계산해 백그라운드 스로틀링에도 정확한 경과 시간 유지
function startRest(sec,name){
  stopRest(false);restTimer={left:sec,total:sec,name,id:null,endAt:Date.now()+sec*1000};
  restbar.classList.add("show");restName.textContent=`${name} · 휴식`;
  updateRestUI();restTimer.id=setInterval(updateRestUI,250);
}
function updateRestUI(){
  if(!restTimer.endAt)return;
  restTimer.left=Math.max(0,Math.ceil((restTimer.endAt-Date.now())/1000));
  restText.textContent=restTimer.left;
  ring.style.setProperty("--p",restTimer.total?(restTimer.total-restTimer.left)/restTimer.total*100:0);
  if(restTimer.left<=0){stopRest(false);finishRest()}
}
function stopRest(hide=true){
  if(restTimer.id)clearInterval(restTimer.id);
  restTimer.id=null;restTimer.endAt=null;
  if(hide){restbar.classList.remove("show");restTimer.left=0}
}
function finishRest(){restText.textContent="GO";ring.style.setProperty("--p",100);vibrate([120,80,120]);if(state.settings.sound)beep();setTimeout(()=>restbar.classList.remove("show"),1400)}
window.addEventListener("focus",updateRestUI);
window.addEventListener("pageshow",updateRestUI);
function vibrate(p){try{if(state.settings.vibration&&navigator.vibrate)navigator.vibrate(p)}catch{}}
function beep(){try{audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();const o=audioContext.createOscillator(),g=audioContext.createGain();o.frequency.value=880;g.gain.setValueAtTime(.08,audioContext.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.18);o.connect(g).connect(audioContext.destination);o.start();o.stop(audioContext.currentTime+.18)}catch{}}

// ---------- 세션 스톱워치 ----------
function toggleWatch(){const key=sessionKey(),m=state.sessionMeta[key]||{};if(m.running){m.elapsed=n(m.elapsed)+Math.floor((Date.now()-n(m.startAt))/1000);m.running=false;m.endedAt=Date.now();state.sessionMeta[key]=m;save();clearInterval(stopwatchId);stopwatchId=null;snapshot();scheduleSync(1500)}else{state.sessionMeta[key]={...m,running:true,startAt:Date.now(),elapsed:n(m.elapsed)};save();resumeWatch()}}
function resumeWatch(){clearInterval(stopwatchId);renderWatch();if(state.sessionMeta[sessionKey()]?.running)stopwatchId=setInterval(renderWatch,1000)}
function elapsedSeconds(){const m=state.sessionMeta[sessionKey()]||{};return n(m.elapsed)+(m.running?Math.floor((Date.now()-n(m.startAt))/1000):0)}
function renderWatch(){const v=elapsedSeconds();stopwatch.textContent=fmt(v);timeMetric.textContent=fmt(v);sessionBtn.textContent=state.sessionMeta[sessionKey()]?.running?"운동 종료":"운동 시작"}

// ---------- 세션 스냅샷 / 토요일 보충 인정 ----------
function snapshot(){
  if(family(activeProgramDay())==="rest")return;
  const day=activeProgramDay(),stats=getStats(),details={},main={bench:0,squat:0,rdl:0};
  for(const it of getProgram()){
    const sets=[];for(let i=1;i<=setCount(it);i++){const r=state.setData[`${sessionKey()}_${it.id}_s${i}`]||{};sets.push({weight:n(r.weight),reps:n(r.reps),completed:!!r.completed,setNumber:i})}
    const top=Math.max(0,...sets.map(x=>x.weight));details[it.id]={sets,setCount:setCount(it),alternative:altName(it.id),topWeight:top,dropSet:!!state.dropsets[`${sessionKey()}_${it.id}`]};if(it.id in main)main[it.id]=top;
  }
  for(const it of getProgram())if(it.type==="strength")captureExercise(it.id,altName(it.id));
  const snap={date:today(),day,totalSets:stats.total,doneSets:stats.done,volume:Math.round(stats.volume),duration:elapsedSeconds(),details,programVersion:8.0,...main};
  const idx=state.sessions.findIndex(s=>s.date===snap.date&&s.day===snap.day&&!s.catchupFor);if(idx>=0)state.sessions[idx]=Object.assign(state.sessions[idx],snap);else state.sessions.push(snap);
  if(stats.total&&stats.done===stats.total){markAttendanceForCompletedSession(day);scheduleSync(1500)}
  save();renderDashboard();renderArchive();renderCharts();
}
// V8: 완료한 프로그램을 이번 주 해당 요일 출석으로 인정한다.
// 헬스(UPPER=수, LOWER=토)는 다른 요일에 수행해도 이번 주 예정일로 인정하고 '보충'으로 표시.
// 수영은 오늘이 수영 요일일 때만 오늘 출석으로 기록한다.
function markAttendanceForCompletedSession(day){
  const m=startOfWeek(),todayId=WEEKDAY_IDS[new Date().getDay()],fam=family(day);
  if(fam==="swim"){
    if(WEEK.some(w=>w[0]===todayId&&w[5]==="swim"))state.attendance[`${today()}_${todayId}`]=true;
  }else{
    const idx=WEEK.findIndex(w=>w[5]===fam);if(idx<0)return;
    const id=WEEK[idx][0],key=`${isoAdd(m,idx)}_${id}`;
    state.attendance[key]=true;
    if(todayId!==id)state.catchups[key]={performedOn:today(),program:fam};
  }
  save();renderWeek();renderSummary();
}
function checkComplete(){const s=getStats(),key=sessionKey();if(s.total&&s.done===s.total&&!state.celebration[key]){state.celebration[key]=true;save();showCelebration();snapshot()}}
function showCelebration(){banner.classList.add("show");vibrate([70,40,70,40,130]);for(let i=0;i<42;i++){const c=document.createElement("i");c.className="conf";c.style.left=Math.random()*100+"vw";c.style.background=i%2?"#36C5F0":"#E63946";c.style.animationDelay=Math.random()*.4+"s";confetti.appendChild(c);setTimeout(()=>c.remove(),2300)}setTimeout(()=>banner.classList.remove("show"),1000)}

// ---------- 체성분 (V8: InBody 270S 기준) ----------
const GOAL=CFG.goal;
function inbody(){return state.body.filter(x=>x.device==="270S")}
const BODY_EXTRA_INPUTS={fatMass:"bodyFatMass",visceral:"bodyVisceral",whr:"bodyWhr",bmr:"bodyBmr",score:"bodyScore",phase:"bodyPhase"};
function saveBody(){
  const date=(bodyDate.value||today());
  if(date>today())return alert("미래 날짜에는 저장할 수 없어요. 측정한 날짜를 확인해주세요.");
  const row={date,weight:n(bodyWeight.value),muscle:n(bodyMuscle.value),fat:n(bodyFat.value),waist:n(bodyWaist.value),device:"270S"};
  for(const [k,id] of Object.entries(BODY_EXTRA_INPUTS)){const v=n(document.getElementById(id).value);if(v)row[k]=v}
  if(!row.weight&&!row.muscle&&!row.fat&&!row.waist)return alert("체중·골격근량·체지방률·허리 중 하나 이상 입력해주세요.");
  const i=state.body.findIndex(x=>x.date===row.date);
  if(i>=0){const old=state.body[i];
    if(old.device&&old.device!=="270S"&&!confirm(`${date}에는 ${old.device} 기록이 있어요. 270S 값으로 바꿀까요?`))return;
    for(const k of ["weight","muscle","fat","waist",...BODY_EXTRA_KEYS])if(!row[k]&&n(old[k]))row[k]=n(old[k]);
    if(old.time)row.time=old.time;state.body[i]=row}else state.body.push(row);
  state.body.sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  bodyWeight.value=bodyMuscle.value=bodyFat.value=bodyWaist.value="";
  for(const id of Object.values(BODY_EXTRA_INPUTS))document.getElementById(id).value="";
  bodyDate.value=today();
  save();renderBody();renderDashboard();renderCharts();renderIntegrity();scheduleSync(1500);
  toast(`✅ ${date} 체성분 저장`);
}
function bodyExtraText(x){
  const a=[];
  if(n(x.fatMass))a.push(`지방량 ${x.fatMass}kg`);if(n(x.visceral))a.push(`내장 ${x.visceral}`);if(n(x.whr))a.push(`복부 ${Number(x.whr).toFixed(2)}`);
  if(n(x.bmr))a.push(`기초대사 ${x.bmr}`);if(n(x.phase))a.push(`위상각 ${x.phase}°`);if(n(x.score))a.push(`${x.score}점`);
  return a.join(" · ");
}
// 리버스·회복 기간(CFG.reverseUntil까지)에는 완만한 증가를 정상으로 보고, 이후에는 감량 페이스로 판정한다.
function pace(){
  const rows=inbody().filter(x=>x.weight).slice(-2);if(rows.length<2)return null;
  const days=Math.max(1,(new Date(rows[1].date)-new Date(rows[0].date))/86400000),weekly=(rows[1].weight-rows[0].weight)/days*7;
  if(today()<=REVERSE_UNTIL){
    if(weekly>.7)return{weekly,type:"fast",text:"증가 빠름 · 허리둘레 확인"};
    if(weekly>=-.2)return{weekly,type:"good",text:`${CFG.labels.phase} 정상 범위`};
    return{weekly,type:"stall",text:"감소 중 · 칼로리 확인"};
  }
  if(weekly<=-1)return{weekly,type:"fast",text:"너무 빠름 · 근손실 위험"};
  if(weekly<-.7)return{weekly,type:"fast",text:"빠른 편 · 회복 점검"};
  if(weekly<=-.3)return{weekly,type:"good",text:"정상 페이스"};
  if(weekly>=0)return{weekly,type:"stall",text:"정체"};
  return{weekly,type:"stall",text:"완만한 감량"};
}
function renderBody(){
  const p=pace();
  paceResult.innerHTML=p?`<div class="pace"><div><strong>${p.weekly>0?"+":""}${p.weekly.toFixed(2)}kg/주</strong><p>최근 2회 270S 체중 기준</p></div><span class="pacebadge ${p.type}">${p.text}</span></div>`:"";
  if(!bodyDate.value)bodyDate.value=today();
  bodyDate.max=today();
  bodyLogs.innerHTML=state.body.slice(-20).reverse().map(x=>{const ex=bodyExtraText(x);return`<div class="log body-log"><div class="body-log-top"><span>${x.date} <small style="color:var(--muted)">${x.device||""}${x.src?" · 결과지":""}${x.note?" · "+x.note:""}</small></span><b>${x.weight||"-"}kg · 근 ${x.muscle||"-"} · 지방 ${x.fat||"-"}%${x.waist?` · 허리 ${x.waist}`:""}</b></div>${ex?`<small class="body-extra">${ex}</small>`:""}</div>`}).join("")||'<p class="prev">기록이 없습니다.</p>';
}

// ---------- 대시보드 ----------
function lastValue(rows,k){for(let i=rows.length-1;i>=0;i--)if(n(rows[i][k]))return{value:n(rows[i][k]),date:rows[i].date};return null}
function renderDashboard(){
  const rows=inbody(),p=pace();paceTop.textContent=p?p.text:"기록 대기";
  const w=lastValue(rows,"weight"),f=lastValue(rows,"fat"),mu=lastValue(rows,"muscle"),wa=lastValue(rows,"waist");
  const wp=w?clamp((GOAL.startW-w.value)/(GOAL.startW-GOAL.goalW)*100,0,100):0;
  const fp=f?clamp((GOAL.startF-f.value)/(GOAL.startF-GOAL.goalF)*100,0,100):0;
  const mp=mu?clamp((mu.value-GOAL.muscleMin)/(GOAL.muscleTarget-GOAL.muscleMin)*100,0,100):0;
  const ap=wa?clamp((GOAL.startWaist-wa.value)/(GOAL.startWaist-GOAL.goalWaist)*100,0,100):0;
  weightBar.style.width=wp+"%";fatBar.style.width=fp+"%";muscleBar.style.width=mp+"%";waistBar.style.width=ap+"%";
  weightText.textContent=w?`현재 ${w.value}kg · 2월 목표 ${GOAL.goalW}kg · ${Math.round(wp)}%${today()<=REVERSE_UNTIL?` · ${CFG.labels.phaseUntil} ${CFG.labels.phase}(증가 허용)`:""}`:"체중 기록 필요";
  fatText.textContent=f?`현재 ${f.value}% · 2월 목표 ${GOAL.goalF}% · ${Math.round(fp)}%`:"체지방 기록 필요";
  muscleText.textContent=mu?`현재 ${mu.value}kg · 하한 ${GOAL.muscleFloor}kg`:`${GOAL.muscleFloor}kg 이상 사수`;
  waistText.textContent=wa?`현재 ${wa.value}cm (${wa.date.slice(5)}) · 목표 ${GOAL.goalWaist}cm · ${CFG.labels.phase} 판정 기준`:"주 1회 아침 공복 · 배꼽 높이";
  muscleWarning.innerHTML=mu?(mu.value<GOAL.muscleFloor?`<div class="status warn">⚠️ 골격근 ${GOAL.muscleFloor}kg 미만 · 칼로리/볼륨 점검</div>`:`<div class="status good">골격근 ${GOAL.muscleFloor}kg 이상 사수 중</div>`):"";
  sessionLogs.innerHTML=state.sessions.slice(-10).reverse().map(s=>`<div class="log"><span>${s.date} · ${dayLabel(s.day)}${isCatchup(s)?" (보충)":""}</span><b>${s.doneSets||0}/${s.totalSets||0} · ${(s.volume||0).toLocaleString()}kg · ${fmt(s.duration||0)}</b></div>`).join("")||'<p class="prev">운동 기록이 없습니다.</p>';
}
function isCatchup(s){return !!s.catchupFor||Object.values(state.catchups).some(c=>c&&c.performedOn===s.date&&c.program===family(s.day))}
function dayLabel(d){const f=family(d);return f==="upper"?CFG.labels.upper:f==="lower"?CFG.labels.lower:f==="swim"?"수영":f==="run"?"러닝":d}
const ARCHIVE_NAMES={shouldermachine:"숄더프레스 머신",adduction:"힙 어덕션 머신",hipmachine:"힙 머신",calfmachine:"카프레이즈 머신",cablecurl:"케이블 컬",pushdown:"케이블 푸시다운",incline:"인클라인 프레스",bench:"벤치프레스",squat:"백스쿼트",legpress:"레그프레스",hacksquat:"핵스쿼트",crunch:"케이블 크런치",legraise:"행잉 레그레이즈",row:"바벨 로우",inclineDb:"인클라인 덤벨프레스",shoulder:"덤벨 숄더프레스",lateral:"사이드 레터럴",curl:"덤벨 컬",rdl:"루마니안 데드리프트",lunge:"워킹 런지",calf:"카프레이즈",plank:"플랭크",armSuperset:"팔 슈퍼세트",lateralFace:"레터럴+페이스풀"};
// 종목 표시 이름 (현재 프로그램 → 이전 프로그램 순)
function exName(id){const it=[...PROGRAM.upper,...PROGRAM.lower,...PROGRAM.swim].find(x=>x.id===id);return it?it.ko.replace(/^A\d · /,""):ARCHIVE_NAMES[id]||id}
function renderArchive(){
  const stats={};
  for(const s of state.sessions){
    if(!s.details)continue;
    for(const [id,d] of Object.entries(s.details)){
      if(CURRENT_IDS.has(id)||["swim","run"].includes(id))continue;
      stats[id]=stats[id]||{count:0,top:0,last:null};
      stats[id].count++;stats[id].top=Math.max(stats[id].top,n(d.topWeight));stats[id].last=s.date;
    }
  }
  const names=ARCHIVE_NAMES;
  archiveList.innerHTML=Object.entries(stats).sort((a,b)=>String(b[1].last).localeCompare(String(a[1].last))).map(([id,v])=>`<div class="archive-item"><b>${names[id]||id}</b><small>${v.count}회 기록 · 최고 ${v.top||"-"}kg · 마지막 ${v.last}</small></div>`).join("")||'<p class="prev">이전 프로그램 기록이 아직 없습니다.</p>';
}

// ---------- Canvas 차트 ----------
function renderCharts(){
  drawChart(liftChart,[
    ...CFG.liftSeries.map(([label,id])=>series(label,id))
  ],["#4DA3FF","#E63946","#F5B942"],"kg");
  drawChart(volumeChart,[{name:"볼륨",values:state.sessions.slice(-18).map(x=>({label:x.date.slice(5),value:n(x.volume)}))}],["#36C5F0"],"kg",true);
  const b=inbody().slice(-16);drawChart(bodyChart,[
    {name:"체중",values:b.map(x=>({label:x.date.slice(5),value:n(x.weight)}))},
    {name:"골격근",values:b.map(x=>({label:x.date.slice(5),value:n(x.muscle)}))},
    {name:"체지방%",values:b.map(x=>({label:x.date.slice(5),value:n(x.fat)}))},
    {name:"허리cm",values:b.map(x=>({label:x.date.slice(5),value:n(x.waist)}))}
  ],["#4DA3FF","#4ADE80","#E63946","#F5B942"],"");
}
function series(name,key){return{name,values:state.sessions.slice(-24).map(x=>({label:x.date.slice(5),value:n(x.details?.[key]?.topWeight||x[key])}))}}
function drawChart(canvas,sets,colors,unit,bar=false){
  if(!canvas)return;const rect=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
  canvas.width=Math.max(300,rect.width)*dpr;canvas.height=Math.max(180,rect.height)*dpr;
  const ctx=canvas.getContext("2d");ctx.scale(dpr,dpr);const w=canvas.width/dpr,h=canvas.height/dpr,p={l:38,r:12,t:24,b:30};
  ctx.clearRect(0,0,w,h);ctx.font="10px system-ui";ctx.fillStyle="#9AA4B2";
  const vals=sets.flatMap(s=>s.values.map(v=>v.value).filter(Boolean));if(!vals.length){ctx.fillText("기록이 쌓이면 차트가 표시됩니다.",20,40);return}
  const mn=Math.min(...vals),mx=Math.max(...vals),range=Math.max(1,mx-mn),lo=Math.max(0,mn-range*.18),hi=mx+range*.18;
  ctx.strokeStyle="rgba(255,255,255,.07)";ctx.lineWidth=1;
  for(let i=0;i<5;i++){const y=p.t+(h-p.t-p.b)*i/4;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(w-p.r,y);ctx.stroke();ctx.fillText(Math.round(hi-(hi-lo)*i/4)+unit,2,y+3)}
  const labels=sets.find(s=>s.values.length)?.values.map(v=>v.label)||[],count=Math.max(1,labels.length-1);
  labels.forEach((lab,i)=>{if(i%Math.ceil(labels.length/5||1)===0)ctx.fillText(lab,p.l+(w-p.l-p.r)*i/count-10,h-8)});
  sets.forEach((s,si)=>{
    const pts=s.values.map((v,i)=>({x:p.l+(w-p.l-p.r)*i/count,y:p.t+(hi-v.value)/(hi-lo)*(h-p.t-p.b),v:v.value})).filter(q=>q.v);
    if(bar){const bw=Math.max(5,(w-p.l-p.r)/(s.values.length||1)*.55);ctx.fillStyle=colors[si]+"bb";pts.forEach(q=>ctx.fillRect(q.x-bw/2,q.y,bw,h-p.b-q.y))}
    else{ctx.beginPath();pts.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.strokeStyle=colors[si];ctx.lineWidth=2.5;ctx.stroke();pts.forEach(q=>{ctx.beginPath();ctx.arc(q.x,q.y,3,0,Math.PI*2);ctx.fillStyle=colors[si];ctx.fill()})}
    const gap=Math.min(90,(w-p.l)/sets.length);ctx.fillStyle=colors[si];ctx.fillRect(p.l+si*gap,5,10,4);ctx.fillStyle="#ddd";ctx.fillText(s.name,p.l+15+si*gap,11);
  });
}

// ---------- 설정 / 백업 ----------
function toggleSetting(k){state.settings[k]=!state.settings[k];save();renderToggles();if(k==="sound"&&state.settings[k])beep()}
function renderToggles(){soundToggle.classList.toggle("on",state.settings.sound);vibrationToggle.classList.toggle("on",state.settings.vibration)}
function backup(){const payload={app:"BodyProfile Tracker "+APP_VERSION+(CFG.sheetProfile?" ("+CFG.sheetProfile+")":""),version:8,storageKey:STORAGE_KEY,exportedAt:new Date().toISOString(),data:state};const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`bodyprofile${CFG.sheetProfile?"-"+CFG.sheetProfile:""}-v8-${today()}.json`;a.click();URL.revokeObjectURL(a.href)}
function restore(ev){const f=ev.target.files[0];if(!f)return;const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result);let candidate=parsed.data||parsed[STORAGE_KEY]||parsed;if(typeof candidate==="string")candidate=JSON.parse(candidate);state=migrateState(candidate);save();location.reload()}catch(err){alert("복원 실패: V4~V8 JSON 파일인지 확인해주세요.")}};reader.readAsText(f)}
function resetToday(){if(!confirm("오늘 선택한 운동 기록을 초기화할까요?"))return;const prefix=sessionKey();for(const obj of [state.checks,state.sets,state.inputs,state.notes,state.setData,state.dropsets])Object.keys(obj).forEach(k=>{if(k.startsWith(prefix))delete obj[k]});delete state.sessionMeta[prefix];delete state.celebration[prefix];state.sessions=state.sessions.filter(s=>!(s.date===today()&&s.day===activeProgramDay()&&!s.catchupFor));save();stopRest();clearInterval(stopwatchId);renderAll();resumeWatch()}
function clearAll(){if(confirm("빌딩기부터 지금까지의 모든 데이터를 삭제합니다. 계속할까요?")){localStorage.removeItem(STORAGE_KEY);state=defaults();save();location.reload()}}

// ---------- 데이터 점검 (V8.2) ----------
// 저장된 세션 기록에서 오타·범위 밖 숫자를 찾는다. 자동 수정은 하지 않고, 사용자가 확인 후 수정/정상 처리.
const BODY_RANGE={weight:[40,150],muscle:[15,60],fat:[3,50],waist:[50,150]};
const BODY_LABEL={weight:"체중",muscle:"골격근량",fat:"체지방률",waist:"허리둘레"};
var lastIssues=[];
function allExercises(){return [...PROGRAM.upper,...PROGRAM.lower]}
function unitOf(id){return allExercises().find(x=>x.id===id)?.unit||"회"}
function median(a){const b=[...a].sort((x,y)=>x-y),m=b.length>>1;return b.length?(b.length%2?b[m]:(b[m-1]+b[m])/2):0}
function weightHistory(){
  const h={};
  for(const s of state.sessions)for(const [id,d] of Object.entries(s.details||{}))for(const x of d.sets||[])if(n(x.weight)>0)(h[id]=h[id]||[]).push(n(x.weight));
  return h;
}
// 10배 오타(805 → 80)면 그 종목에서 가장 자주 쓴 근처 중량을, 아니면 평소 중량을 추천
function suggestWeight(v,hist){
  const t=v/10,near=hist.filter(w=>w>=t*.85&&w<=t*1.15);
  if(v>0&&near.length){const c={};near.forEach(w=>c[w]=(c[w]||0)+1);return Number(Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0])}
  const m=median(hist.filter(w=>w<=median(hist)*2.5));return m?Math.round(m*2)/2:null;
}
function validateAll(){
  const issues=[],hist=weightHistory(),meds={};
  for(const [id,a] of Object.entries(hist))meds[id]=a.length>=5?median(a):0;
  state.sessions.forEach((s,si)=>{
    for(const [id,d] of Object.entries(s.details||{})){
      if(isCardioId(id))continue;
      (d.sets||[]).forEach((x,i)=>{
        const no=Number(x.setNumber||i+1),w=n(x.weight),r=n(x.reps),m=meds[id];
        const base={kind:"set",si,id,no,date:s.date,day:s.day,uidBase:`set|${s.date}|${s.day}|${id}|${no}`};
        if(w<0||w>500)issues.push({...base,uid:base.uidBase+"|weight",field:"weight",value:w,reason:"중량이 0~500kg 범위 밖",suggest:suggestWeight(w,hist[id]||[])});
        else if(m&&w>0&&(w>m*2.5||w<m*.35))issues.push({...base,uid:base.uidBase+"|weight",field:"weight",value:w,reason:`평소 중량 ${m}kg의 ${(w/m).toFixed(1)}배`,suggest:suggestWeight(w,hist[id]||[])});
        const maxR=unitOf(id)==="초"?300:60;
        if(r<0||r>maxR)issues.push({...base,uid:base.uidBase+"|reps",field:"reps",value:r,reason:`${unitOf(id)==="초"?"시간":"반복"}이 0~${maxR} 범위 밖`,suggest:null});
      });
    }
  });
  state.body.forEach((b,bi)=>{
    for(const [k,[lo,hi]] of Object.entries(BODY_RANGE)){const v=n(b[k]);if(v&&(v<lo||v>hi))issues.push({kind:"body",bi,uid:`body|${b.date}|${k}`,date:b.date,field:k,value:v,reason:`${BODY_LABEL[k]} 정상 범위(${lo}~${hi}) 밖`,suggest:null})}
    const prev=state.body.slice(0,bi).reverse().find(p=>p.device===b.device&&n(p.weight));
    if(prev&&n(b.weight)){
      const days=Math.max(1,(new Date(b.date)-new Date(prev.date))/864e5),dw=n(b.weight)-n(prev.weight);
      if(Math.abs(dw)>2&&Math.abs(dw)/days*7>2.5)issues.push({kind:"body",bi,uid:`body|${b.date}|jump`,date:b.date,field:"weight",value:n(b.weight),reason:`직전 ${prev.date} 대비 ${dw>0?"+":""}${dw.toFixed(1)}kg — 주당 변화가 큼`,suggest:null});
    }
  });
  return issues.filter(x=>!state.dataIgnores[x.uid]);
}
function renderIntegrity(){
  lastIssues=validateAll();
  const cnt=lastIssues.length;
  integrityBadge.textContent=cnt?`확인 필요 ${cnt}건`:"이상 없음";
  integrityBadge.style.color=cnt?"#ffd397":"";
  integrityBanner.innerHTML=cnt?`<div class="ibanner">⚠️ 데이터 점검: 이상해 보이는 기록 ${cnt}건 · 백업 탭에서 확인하세요</div>`:"";
  if(!cnt){integrityList.innerHTML='<div class="status good">저장된 운동·체성분 기록에서 이상값이 발견되지 않았습니다.</div>';return}
  const fixable=lastIssues.filter(x=>x.suggest!==null&&x.suggest!==undefined);
  const groups={};for(const it of lastIssues){const g=it.kind==="set"?`${it.id}|${it.field}|${it.value}`:it.uid;(groups[g]=groups[g]||[]).push(it)}
  integrityList.innerHTML=(fixable.length>1?`<div class="row" style="margin-bottom:4px"><button id="fixAllBtn" class="primary">추천값으로 ${fixable.length}건 전부 수정</button></div>`:"")+Object.values(groups).slice(0,30).map(list=>{
    const it=list[0],many=list.length>1;
    const title=it.kind==="set"?`${exName(it.id)} · ${it.field==="weight"?"중량":"반복"} ${it.value}${it.field==="weight"?"kg":""}`:`체성분 · ${BODY_LABEL[it.field]} ${it.value}`;
    const where=it.kind==="set"?(many?`${list.length}건 · ${list.map(x=>`${x.date.slice(5)} ${x.no}세트`).slice(0,6).join(", ")}${list.length>6?" …":""}`:`${it.date} · ${dayLabel(it.day)} ${it.no}세트`):it.date;
    return`<div class="issue"><b>${title}</b><small>${where} · ${it.reason}</small><div class="row">
      <input class="input" type="number" step=".5" inputmode="decimal" data-fixval="${it.uid}" value="${it.suggest??""}" placeholder="올바른 값">
      <button class="primary" data-fix="${it.uid}" data-all="${many?1:""}">${many?`${list.length}건 모두 수정`:"수정"}</button>
      <button class="secondary" data-ignore="${it.uid}" data-all="${many?1:""}">정상</button></div></div>`;
  }).join("");
  const fa=document.getElementById("fixAllBtn");
  if(fa)fa.onclick=()=>{if(!confirm(`추천값으로 ${fixable.length}건을 수정할까요?\n(예: 805kg → 80kg)`))return;fixable.forEach(x=>applyFix(x.uid,Number(x.suggest),false,true));save();renderAll();toast(`${fixable.length}건 수정했어요`)};
  integrityList.querySelectorAll("[data-fix]").forEach(b=>b.onclick=()=>{
    const v=integrityList.querySelector(`[data-fixval="${CSS.escape(b.dataset.fix)}"]`).value;
    if(v===""||isNaN(Number(v)))return toast("올바른 값을 입력하세요");
    applyFix(b.dataset.fix,Number(v),!!b.dataset.all);
  });
  integrityList.querySelectorAll("[data-ignore]").forEach(b=>b.onclick=()=>{
    const it=lastIssues.find(x=>x.uid===b.dataset.ignore);
    const targets=b.dataset.all?lastIssues.filter(x=>x.kind==="set"&&x.id===it.id&&x.field===it.field&&x.value===it.value):[it];
    targets.forEach(x=>state.dataIgnores[x.uid]=true);save();renderIntegrity();toast("정상 기록으로 표시했어요");
  });
}
// 세션 기록 + 같은 날짜 세트 원본 + 다음 세션 프리필용 프로필까지 함께 고쳐 오타가 다시 퍼지지 않게 한다.
function applyFix(uid,value,all,quiet){
  const it=lastIssues.find(x=>x.uid===uid);if(!it)return;
  const targets=all&&it.kind==="set"?lastIssues.filter(x=>x.kind==="set"&&x.id===it.id&&x.field===it.field&&x.value===it.value):[it];
  for(const t of targets){
    if(t.kind==="body"){state.body[t.bi][t.field]=value;continue}
    const s=state.sessions[t.si],d=s.details[t.id];
    const x=d.sets.find(v=>Number(v.setNumber||0)===t.no)||d.sets[t.no-1];if(!x)continue;
    x[t.field]=value;
    d.topWeight=Math.max(0,...d.sets.map(v=>n(v.weight)));
    if(["bench","squat","rdl"].includes(t.id))s[t.id]=d.topWeight;
    s.volume=Math.round(Object.entries(s.details).reduce((tot,[id,dd])=>tot+(id==="swim"||id==="run"?0:(dd.sets||[]).reduce((a,v)=>a+n(v.weight)*n(v.reps),0)),0));
    const k=`${s.date}_${s.day}_${t.id}_s${t.no}`;if(state.setData[k])state.setData[k][t.field]=value;
  }
  // 같은 종목에 남은 동일 오타(과거 세트 원본·대체운동 프로필) 정리
  if(it.kind==="set"){
    const bad=it.value,re=new RegExp(`_${it.id}_s\\d+$`);
    for(const [k,v] of Object.entries(state.setData))if(re.test(k)&&v&&n(v[it.field])===bad)v[it.field]=value;
    for(const [k,prof] of Object.entries(state.alternativeProfiles||{}))if(k.startsWith(it.id+"::"))for(const v of Object.values(prof||{}))if(v&&n(v[it.field])===bad)v[it.field]=value;
    for(const ent of Object.values(state.sessionExerciseData||{}))for(const v of Object.values(ent?.sets||{}))if(v&&n(v[it.field])===bad&&ent)v[it.field]=value;
  }
  if(quiet)return;
  save();renderAll();toast(`${targets.length}건 수정했어요`);
}
// 입력 시 즉시 경고 (막지는 않음)
function guardInput(inp){
  if(inp.dataset.field!=="weight")return;
  const v=n(inp.value),id=getProgram().find(it=>inp.dataset.key.startsWith(sessionKey()+"_"+it.id+"_s"))?.id;if(!id||!v)return;
  const hist=weightHistory()[id]||[];if(hist.length<5){inp.classList.remove("warn");return}
  const m=median(hist),bad=v>m*2.5||v<m*.35;
  inp.classList.toggle("warn",bad);
  if(bad)toast(`⚠️ 평소 ${m}kg의 ${(v/m).toFixed(1)}배 — 입력값을 확인하세요`);
}

// ---------- 구글 시트 동기화 (V8.2) ----------
// Apps Script 웹앱(apps-script/Code.gs)에 전체 상태 + 시트용 평탄화 행을 보낸다.
// 사전 요청(preflight)을 피하려고 Content-Type을 지정하지 않은 text/plain POST를 사용한다.
var syncTimer=null,syncBusy=false;
function syncReady(){const c=state.settings.sync;return !!(c&&c.url&&c.token)}
function scheduleSync(delay=30000){
  const c=state.settings?.sync;if(!c||!c.auto||!syncReady())return;
  clearTimeout(syncTimer);syncTimer=setTimeout(()=>syncNow(true),delay);
}
function makeToken(){
  const a=new Uint8Array(18);crypto.getRandomValues(a);
  const t="bp-"+[...a].map(b=>b.toString(36).padStart(2,"0")).join("").slice(0,28);
  syncToken.value=t;state.settings.sync.token=t;persist();renderSync();
  try{navigator.clipboard.writeText(t);toast("토큰을 만들고 복사했어요 · Code.gs의 TOKEN에 붙여넣으세요")}catch{toast("토큰을 만들었어요 · Code.gs의 TOKEN에 붙여넣으세요")}
}
const WEEKDAY_KO=["일","월","화","수","목","금","토"];
function flatRows(){
  const issueMap={};for(const it of lastIssues)if(it.kind==="set")issueMap[`${it.date}|${it.day}|${it.id}|${it.no}`]=it.reason;
  const sessions=[],sets=[];
  for(const s of [...state.sessions].sort((a,b)=>String(a.date).localeCompare(String(b.date)))){
    const wd=WEEKDAY_KO[new Date(s.date+"T12:00:00").getDay()];
    sessions.push([s.date,wd,dayLabel(s.day),isCatchup(s)?"보충":"",n(s.doneSets),n(s.totalSets),n(s.volume),Math.round(n(s.duration)/60)]);
    for(const [id,d] of Object.entries(s.details||{})){
      if(isCardioId(id))continue;
      (d.sets||[]).forEach((x,i)=>{const no=Number(x.setNumber||i+1);
        sets.push([s.date,wd,dayLabel(s.day),id,exName(id),d.alternative&&d.alternative!=="기본 운동"?d.alternative:"",no,n(x.weight),n(x.reps),x.completed?"Y":"",n(x.weight)*n(x.reps),issueMap[`${s.date}|${s.day}|${id}|${no}`]||""])});
    }
  }
  const body=state.body.map(b=>[b.date,b.device||"",n(b.weight)||"",n(b.muscle)||"",n(b.fat)||"",n(b.waist)||"",...BODY_EXTRA_KEYS.map(k=>n(b[k])||""),b.time||"",b.src||b.note||""]);
  const habits=Object.entries(state.habits||{}).sort().map(([d,h])=>[d,h.preload?"Y":"",h.creatine?"Y":"",h.water?"Y":"",h.stand?"Y":""]);
  const issues=lastIssues.map(it=>[it.date,it.kind==="set"?exName(it.id):"체성분",it.kind==="set"?it.no:"",it.field,it.value,it.reason,it.suggest??""]);
  return{sessions,sets,body,habits,issues,habitHeader:["날짜",...CFG.habits.map(h=>h.sheet)],
    bodyHeader:["날짜","기기","체중kg","골격근kg","체지방%","허리cm","체지방량kg","내장지방레벨","복부지방률","기초대사량kcal","인바디점수","위상각°","세포외수분비","측정시각","출처"]};
}
function kst(iso){if(!iso)return"-";const d=new Date(iso);return isNaN(d)?String(iso):d.toLocaleString("ko-KR",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}
function syncStatus(text,type){syncStatusEl().className="syncstatus"+(type?" "+type:"");syncStatusEl().innerHTML=text}
function syncStatusEl(){return document.getElementById("syncStatus")}
async function syncNow(silent,force=false){
  if(!syncReady()){if(!silent)syncStatus("URL과 토큰을 먼저 입력하세요","err");return}
  if(syncBusy)return;syncBusy=true;clearTimeout(syncTimer);
  if(!silent)syncStatus("동기화 중…");
  try{
    lastIssues=validateAll();
    const c=state.settings.sync;
    const payload={token:c.token,app:"BodyProfile Tracker",version:APP_VERSION,profile:CFG.sheetProfile,exportedAt:new Date().toISOString(),device:navigator.userAgent.slice(0,80),force,rows:flatRows(),state};
    const res=await fetch(c.url,{method:"POST",body:JSON.stringify(payload)});
    const out=await res.json();
    if(!out.ok){
      c.lastResult="실패: "+(out.error||res.status);persist();
      if(out.code==="SHRINK"){
        syncStatus(`⚠️ ${out.error}`,"err");
        if(!silent){
          if(confirm(`시트에는 세션 ${out.oldCount}건, 이 기기에는 ${out.newCount}건이 있어요.\n\n[확인] 시트 데이터로 이 기기를 복원\n[취소] 다른 선택`))restoreFromSheet(true);
          else if(confirm("일부러 기록을 지운 경우에만 진행하세요.\n이 기기 데이터로 시트를 덮어쓸까요?\n(드라이브의 날짜별 백업은 그대로 남습니다)"))setTimeout(()=>syncNow(false,true),50);
        }
      }else syncStatus("동기화 실패: "+(out.error||res.status),"err");
      return;
    }
    c.lastSync=new Date().toISOString();c.lastResult=`세션 ${out.counts?.sessions??"-"} · 세트 ${out.counts?.sets??"-"}행`;c.dirty=false;c.sheetUrl=out.sheetUrl||c.sheetUrl||"";persist();renderSync();
    if(!silent)toast("구글 시트에 저장했어요");
  }catch(err){
    state.settings.sync.lastResult="실패: 네트워크 또는 URL 확인";persist();
    syncStatus("동기화 실패: 인터넷 연결이나 웹앱 URL·배포 권한(모든 사용자)을 확인하세요","err");
  }finally{syncBusy=false}
}
async function callGet(action){
  const c=state.settings.sync;
  const url=`${c.url}${c.url.includes("?")?"&":"?"}action=${action}&token=${encodeURIComponent(c.token)}&profile=${encodeURIComponent(CFG.sheetProfile)}`;
  const res=await fetch(url);return res.json();
}
async function testSync(){
  if(!syncReady())return syncStatus("URL과 토큰을 먼저 입력하세요","err");
  syncStatus("연결 확인 중…");
  try{const out=await callGet("ping");
    if(!out.ok)return syncStatus("연결은 됐지만 거부됨: "+out.error,"err");
    state.settings.sync.sheetUrl=out.sheetUrl;persist();
    syncStatus(`✅ 연결됨 · 시트 “${out.name}” · 저장된 백업 ${out.hasBackup?`있음(${kst(out.backupAt)})`:"없음"}${out.hasBackup?"<br>새 기기라면 먼저 ‘시트에서 복원’을 누르세요":"<br>‘지금 동기화’로 첫 저장을 하세요"}`,"ok");
  }catch{syncStatus("연결 실패: URL이 /exec로 끝나는지, 배포 액세스가 ‘모든 사용자’인지 확인하세요","err")}
}
async function restoreFromSheet(skipConfirm){
  if(!syncReady())return syncStatus("URL과 토큰을 먼저 입력하세요","err");
  syncStatus("시트 백업을 불러오는 중…");
  try{
    const out=await callGet("latest");
    if(!out.ok)return syncStatus("복원 실패: "+out.error,"err");
    const remote=out.state,rn=(remote.sessions||[]).length,ln=state.sessions.length;
    if(skipConfirm!==true&&!confirm(`시트 백업(${kst(out.savedAt)})으로 이 기기 데이터를 바꿀까요?\n\n이 기기: 세션 ${ln}건\n시트: 세션 ${rn}건\n\n현재 데이터는 기기에 한 번 더 보관됩니다.`))return syncStatus("복원을 취소했어요");
    localStorage.setItem(STORAGE_KEY+"_before_restore",JSON.stringify(state));
    const keep=state.settings.sync;
    state=migrateState(remote);state.settings.sync={...keep,dirty:false,lastSync:new Date().toISOString(),lastResult:"시트에서 복원"};persist();location.reload();
  }catch{syncStatus("복원 실패: 인터넷 연결이나 URL을 확인하세요","err")}
}
function renderSync(){
  const c=state.settings.sync;
  if(document.activeElement!==syncUrl)syncUrl.value=c.url||"";
  if(document.activeElement!==syncToken)syncToken.value=c.token||"";
  syncAutoToggle.classList.toggle("on",!!c.auto);
  syncBadge.textContent=!syncReady()?"미연결":c.dirty?"변경 대기":"동기화됨";
  if(!syncReady())return syncStatus("설정 전 · 처음 한 번만 연결하면 됩니다");
  const when=c.lastSync?new Date(c.lastSync).toLocaleString("ko-KR",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):"아직 없음";
  syncStatus(`마지막 동기화: ${when} · ${c.lastResult||"-"}${c.dirty?"<br>저장 안 된 변경이 있어요 (자동 동기화 대기)":""}${c.sheetUrl?`<br><a href="${c.sheetUrl}" target="_blank" rel="noopener" style="color:var(--limetext)">구글 시트 열기 ↗</a>`:""}`,c.lastResult?.startsWith("실패")?"err":c.lastSync?"ok":"");
}
// 앱을 열 때 6시간 넘게 동기화가 없었고 변경이 있으면 한 번 올린다
setTimeout(()=>{const c=state.settings.sync;if(c.auto&&syncReady()&&c.dirty&&(!c.lastSync||Date.now()-new Date(c.lastSync)>6*3600e3))syncNow(true)},4000);
window.addEventListener("resize",()=>requestAnimationFrame(renderCharts));
