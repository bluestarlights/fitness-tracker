# BodyProfile Tracker V5 Cutting

## 핵심 기능
- V4 저장 키 `bp_v4_straight_set_2026` 유지
- V4 필드(day/checks/sets/inputs/notes/attendance/body/sessions) 보존
- V4 JSON 백업 복원 및 자동 마이그레이션
- 세트별 중량·횟수·완료 기록과 지난 세션 프리필
- 메인 리프트 중량 유지/2회 연속 하락 판정
- 세트 체크 시 자동 휴식 타이머
- 진동 및 Web Audio 알림
- 운동 세션 스톱워치
- D-day 카운터
- 감량 속도 및 골격근량 경고
- 직접 구현한 오프라인 Canvas 차트
- 수영 인터벌 출석/완료 기록
- PWA 오프라인 캐시

## GitHub Pages 업데이트
압축을 해제한 뒤 기존 저장소 루트에 전체 파일을 덮어쓰기 하세요.
`assets/icons` 폴더도 반드시 업로드해야 합니다.
같은 GitHub Pages 주소와 경로를 유지하면 기존 localStorage 기록이 이어집니다.
