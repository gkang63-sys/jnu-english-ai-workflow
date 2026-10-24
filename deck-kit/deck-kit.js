/* deck-kit.js — 제주대 교양영어 이중언어 강의 덱 키트 (제미나이판)
   덱 HTML 맨 끝의 <script src="deck-kit.js"></script> 한 줄이 이 파일을 부른다. 덱과 같은 폴더에 둔다.
   디자인(CSS) · 넘기기 · 연습 채점 · 학생 모드 · 점검 · 낭독 · 듣기 바 · 영상 · 자동 강의 · 한 파일 내보내기가 모두 여기 있다.
   이 파일은 고치지 않는다. */
(function KIT(){
  if(!document.getElementById("deck")&&document.readyState==="loading"){ document.addEventListener("DOMContentLoaded",KIT); return; }   /* <head>에 넣어도 본문을 다 읽은 뒤 실행한다 */
  if(window.__kitLoaded) return; window.__kitLoaded=true;
  var CSS="\n/* ═══════════════════════════════════════════════════════════════\n   1. DESIGN TOKENS — 이 블록만 고치면 덱 전체 인상이 바뀝니다\n   ═══════════════════════════════════════════════════════════════ */\n:root{\n  /* Brand — 과목별로 --brand 계열만 교체 */\n  --brand:        #3D5AFE;   /* 주 강조: 눈썹줄, 번호, 밑줄, 링크 */\n  --brand-deep:   #2438C4;   /* 진한 변주: 표지 배경, 섹션 표지 */\n  --brand-soft:   #EDF0FF;   /* 연한 배경: 카드, 칩, 하이라이트 */\n  --accent:       #FF6E40;   /* 보조 강조: 정답, 주의, 과제 */\n  --accent-soft:  #FFF0EA;\n\n  /* Ink & surface */\n  --ink:          #14161A;   /* 제목·영어 본문 */\n  --ink-2:        #454B55;   /* 한국어 해설 */\n  --ink-3:        #838A96;   /* 눈썹줄·푸터·캡션 */\n  --line:         #E5E8EE;\n  --surface:      #FFFFFF;\n  --surface-2:    #F6F7F9;\n  --page-bg:      #DFE3E9;\n\n  /* Type */\n  --font-en: \"Inter\", -apple-system, \"Segoe UI\", system-ui, sans-serif;\n  --font-ko: \"Noto Sans KR\", \"Malgun Gothic\", \"맑은 고딕\", sans-serif;\n\n  /* Rhythm */\n  --pad-x: 68px;\n  --pad-t: 44px;\n  --r-lg: 18px;\n  --r-md: 12px;\n  --r-pill: 999px;\n}\n\n/* ═══════════════════════════════════════════════════════════════\n   2. STAGE — 1280×720 슬라이드를 화면에 꽉 맞춰 축소\n   ═══════════════════════════════════════════════════════════════ */\n*{box-sizing:border-box;margin:0;padding:0}\nhtml,body{height:100%}\nbody{\n  background:var(--page-bg);\n  font-family:var(--font-ko);\n  color:var(--ink);\n  overflow:hidden;\n  -webkit-font-smoothing:antialiased;\n}\n#stage{position:fixed;inset:0;display:grid;place-items:center}\n#deck{width:1280px;height:720px;position:relative;transform-origin:center center}\n\n.slide{\n  position:absolute;inset:0;\n  background:var(--surface);\n  padding:var(--pad-t) var(--pad-x) 0;\n  display:none;\n  overflow:hidden;\n}\n.slide.is-on{display:block}\n\n/* ── 공통 헤더 ── */\n.eyebrow{\n  font-family:var(--font-en);\n  font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;\n  color:var(--brand);\n  display:flex;justify-content:space-between;align-items:baseline;gap:16px;\n}\n.eyebrow .page-ref{\n  font-family:var(--font-ko);\n  letter-spacing:0;text-transform:none;font-size:12px;\n  color:var(--ink-3);white-space:nowrap;\n}\n.h-title{\n  font-family:var(--font-en);\n  font-size:33px;font-weight:800;line-height:1.22;letter-spacing:-.015em;\n  color:var(--ink);margin-top:10px;\n}\n.h-title.ko{font-family:var(--font-ko);font-weight:700;letter-spacing:-.02em}\n.h-sub{\n  font-size:16px;font-weight:500;color:var(--ink-3);\n  margin-top:7px;line-height:1.5;\n}\n.rule{height:3px;width:44px;background:var(--brand);border-radius:2px;margin-top:16px}\n\n/* ── 본문 영역 ── */\n.body{margin-top:24px;height:474px;overflow:hidden}\n.body.tall{height:512px;margin-top:14px}\n/* 내용이 짧을 때 세로 가운데로 — 아래 여백이 뜨는 것을 막습니다 */\n.body.mid{display:flex;flex-direction:column;justify-content:center}\n\n/* ── 영어 / 한국어 짝 ── */\n.pair{margin-bottom:17px}\n.en{\n  font-family:var(--font-en);\n  font-size:18.5px;line-height:1.52;font-weight:400;color:var(--ink);\n  letter-spacing:-.005em;\n}\n.ko{\n  font-family:var(--font-ko);\n  font-size:15px;line-height:1.72;font-weight:400;color:var(--ink-2);\n  margin-top:6px;\n}\n.en b,.ko b{font-weight:700;color:var(--brand-deep)}\n.en em,.ko em{font-style:normal;background:linear-gradient(transparent 62%,var(--brand-soft) 62%);font-weight:600}\n.term{font-family:var(--font-en);font-weight:600;color:var(--brand-deep)}\n\n/* ── 푸터 ── */\n.foot{\n  position:absolute;left:var(--pad-x);right:var(--pad-x);bottom:22px;\n  display:flex;justify-content:space-between;align-items:center;\n  font-size:11px;color:var(--ink-3);\n  border-top:1px solid var(--line);padding-top:9px;\n}\n.foot .n{font-family:var(--font-en);font-weight:600;letter-spacing:.02em}\n\n/* ═══════════════════════════════════════════════════════════════\n   3. SLIDE TYPES\n   ═══════════════════════════════════════════════════════════════ */\n\n/* ① 표지 --------------------------------------------------- */\n.s-title{\n  background:linear-gradient(135deg,var(--brand-deep) 0%,var(--brand) 62%,#5B72FF 100%);\n  color:#fff;padding:0;\n}\n.s-title .inner{position:absolute;left:var(--pad-x);right:var(--pad-x);top:154px}\n.s-title .kicker{\n  font-family:var(--font-en);font-size:12px;font-weight:700;\n  letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.72);\n}\n.s-title .kicker-ko{font-family:var(--font-ko);font-size:14px;color:rgba(255,255,255,.8);margin-top:8px;letter-spacing:-.01em}\n.s-title h1{\n  font-family:var(--font-en);font-size:60px;font-weight:800;line-height:1.08;\n  letter-spacing:-.03em;margin-top:22px;\n}\n.s-title .h1-ko{font-family:var(--font-ko);font-size:23px;font-weight:500;color:rgba(255,255,255,.86);margin-top:16px}\n.s-title .meta{\n  margin-top:34px;padding-top:18px;border-top:1px solid rgba(255,255,255,.28);\n  font-size:13px;color:rgba(255,255,255,.78);line-height:1.9;max-width:820px;\n}\n.s-title .badge{\n  display:inline-block;padding:7px 15px;border-radius:var(--r-pill);\n  background:rgba(255,255,255,.16);font-family:var(--font-en);\n  font-size:12px;font-weight:600;letter-spacing:.04em;margin-top:4px;\n}\n.s-title .foot{color:rgba(255,255,255,.6);border-top-color:rgba(255,255,255,.22)}\n.s-title .orb{\n  position:absolute;border-radius:50%;\n  background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.22),rgba(255,255,255,0) 68%);\n}\n\n/* ② 목표·흐름 ---------------------------------------------- */\n.cols{display:grid;grid-template-columns:1fr 1fr;gap:34px}\n.col-h{\n  font-size:13px;font-weight:700;color:var(--brand-deep);\n  letter-spacing:-.01em;margin-bottom:13px;\n  display:flex;align-items:center;gap:8px;\n}\n.col-h::before{content:\"\";width:6px;height:6px;border-radius:50%;background:var(--brand)}\n.goal{display:flex;gap:12px;margin-bottom:13px;align-items:flex-start}\n.goal .num{\n  flex:0 0 22px;height:22px;border-radius:50%;background:var(--brand-soft);\n  color:var(--brand-deep);font-family:var(--font-en);font-size:11px;font-weight:700;\n  display:grid;place-items:center;margin-top:2px;\n}\n.goal .txt .g-en{font-family:var(--font-en);font-size:15px;font-weight:600;color:var(--ink);line-height:1.4}\n.goal .txt .g-ko{font-size:13px;color:var(--ink-2);margin-top:3px;line-height:1.5}\n\n/* ③ 섹션 표지 ---------------------------------------------- */\n.s-divider{background:var(--brand-deep);color:#fff;padding:0}\n.s-divider .inner{position:absolute;left:var(--pad-x);right:var(--pad-x);top:246px;display:flex;gap:38px;align-items:flex-start}\n.s-divider .big{\n  font-family:var(--font-en);font-size:104px;font-weight:800;line-height:.86;\n  color:rgba(255,255,255,.26);letter-spacing:-.04em;\n}\n.s-divider .of{\n  font-family:var(--font-en);font-size:11px;font-weight:700;letter-spacing:.18em;\n  color:rgba(255,255,255,.62);text-transform:uppercase;\n}\n.s-divider h2{font-family:var(--font-en);font-size:42px;font-weight:800;letter-spacing:-.025em;margin-top:11px}\n.s-divider .d-ko{font-size:18px;color:rgba(255,255,255,.82);margin-top:11px;font-weight:500}\n.s-divider .d-ref{\n  display:inline-block;margin-top:20px;padding:6px 14px;border-radius:var(--r-pill);\n  background:rgba(255,255,255,.15);font-size:12.5px;color:rgba(255,255,255,.9);\n}\n.s-divider .foot{color:rgba(255,255,255,.5);border-top-color:rgba(255,255,255,.2)}\n\n/* ④ 교재 지면 ---------------------------------------------- */\n.page-frame{\n  height:412px;border:1px solid var(--line);border-radius:var(--r-lg);\n  background:var(--surface-2);overflow:hidden;\n  display:grid;place-items:center;margin-top:4px;\n}\n.page-frame img{width:100%;height:100%;object-fit:contain;display:block}\n.page-frame .placeholder{text-align:center;color:var(--ink-3);padding:24px}\n.page-frame .placeholder .big{font-family:var(--font-en);font-size:26px;font-weight:700;color:#B6BCC7}\n.page-frame .placeholder .small{font-size:13px;margin-top:9px}\n.page-cap{font-size:13.5px;color:var(--ink-2);margin-top:13px;line-height:1.6}\n\n/* ⑤ 카드 그리드 -------------------------------------------- */\n.cards{display:grid;gap:15px}\n.cards.c2{grid-template-columns:1fr 1fr}\n.cards.c3{grid-template-columns:repeat(3,1fr)}\n.card{\n  background:var(--surface-2);border:1px solid var(--line);\n  border-radius:var(--r-lg);padding:19px 20px;\n}\n.card.brand{background:var(--brand-soft);border-color:#DCE2FF}\n.card.warm{background:var(--accent-soft);border-color:#FFDCCE}\n.card .c-label{\n  font-family:var(--font-en);font-size:10.5px;font-weight:700;letter-spacing:.13em;\n  text-transform:uppercase;color:var(--brand);margin-bottom:9px;\n}\n.card.warm .c-label{color:#D9490F}\n.card .c-en{font-family:var(--font-en);font-size:16px;font-weight:600;line-height:1.42;color:var(--ink)}\n.card .c-ko{font-size:13.5px;color:var(--ink-2);margin-top:7px;line-height:1.62}\n\n/* ⑥ 대비 표 ------------------------------------------------ */\ntable.cmp{width:100%;border-collapse:collapse;font-size:14.5px}\ntable.cmp th{\n  font-family:var(--font-en);font-size:11px;font-weight:700;letter-spacing:.12em;\n  text-transform:uppercase;color:var(--brand);text-align:left;\n  padding:0 14px 10px;border-bottom:2px solid var(--brand);\n}\ntable.cmp td{\n  padding:13px 14px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.55;\n}\ntable.cmp td .t-en{font-family:var(--font-en);font-weight:500;color:var(--ink)}\ntable.cmp td .t-ko{font-size:13px;color:var(--ink-2);margin-top:4px}\n\n/* ⑦ 문항 + 정답 -------------------------------------------- */\n.q{\n  border-left:3px solid var(--brand);padding:2px 0 2px 17px;margin-bottom:18px;\n}\n.q .q-en{font-family:var(--font-en);font-size:18px;font-weight:600;color:var(--ink);line-height:1.45}\n.q .q-ko{font-size:14px;color:var(--ink-2);margin-top:6px}\n.answer{\n  background:var(--accent-soft);border:1px solid #FFDCCE;border-radius:var(--r-lg);\n  padding:18px 20px;margin-top:6px;\n}\n.answer .a-label{\n  font-family:var(--font-en);font-size:10.5px;font-weight:700;letter-spacing:.13em;\n  text-transform:uppercase;color:#D9490F;margin-bottom:9px;\n}\n.answer .a-en{font-family:var(--font-en);font-size:16.5px;line-height:1.5;color:var(--ink)}\n.answer .a-ko{font-size:13.5px;color:var(--ink-2);margin-top:7px;line-height:1.62}\n\n/* ⑧ 표현 칩 ------------------------------------------------ */\n.chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:6px}\n.chip{\n  font-family:var(--font-en);font-size:14.5px;font-weight:500;\n  padding:9px 15px;border-radius:var(--r-pill);\n  background:var(--brand-soft);color:var(--brand-deep);border:1px solid #DCE2FF;\n}\n.chip.plain{background:var(--surface-2);color:var(--ink);border-color:var(--line)}\n\n/* ⑨ 대본 인용 ---------------------------------------------- */\n.script{\n  background:var(--surface-2);border:1px solid var(--line);border-radius:var(--r-lg);\n  padding:20px 22px;font-family:var(--font-en);font-size:15.5px;line-height:1.72;color:var(--ink);\n}\n.script .spk{font-weight:700;color:var(--brand-deep);margin-right:7px}\n.script-ko{font-size:13.5px;color:var(--ink-2);line-height:1.7;margin-top:12px;padding:0 4px}\n\n/* ⑩ 마무리 ------------------------------------------------- */\n.s-close{background:var(--ink);color:#fff}\n.s-close .eyebrow{color:rgba(255,255,255,.6)}\n.s-close .h-title{color:#fff}\n.s-close .h-sub{color:rgba(255,255,255,.62)}\n.s-close .rule{background:#fff}\n.s-close .card{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.14)}\n.s-close .card .c-label{color:#8FA4FF}\n.s-close .card .c-en{color:#fff}\n.s-close .card .c-ko{color:rgba(255,255,255,.66)}\n.s-close .foot{color:rgba(255,255,255,.42);border-top-color:rgba(255,255,255,.16)}\n\n/* ═══════════════════════════════════════════════════════════════\n   4. CHROME — 진행바 · 노트 · 인쇄\n   ═══════════════════════════════════════════════════════════════ */\n#bar{position:fixed;left:0;top:0;height:3px;background:var(--brand);z-index:50;transition:width .18s ease}\n#hud{\n  position:fixed;left:50%;transform:translateX(-50%);bottom:9px;z-index:50;\n  font-family:var(--font-en);font-size:12px;color:#5B6270;\n  background:rgba(255,255,255,.86);border:1px solid #CDD3DC;border-radius:var(--r-pill);\n  padding:5px 13px;user-select:none;transition:opacity .5s ease;\n}\n#notes{\n  position:fixed;left:0;right:0;bottom:0;max-height:36vh;overflow:auto;z-index:60;\n  background:#12141A;color:#D7DBE3;padding:18px 26px;font-size:14px;line-height:1.7;\n  border-top:2px solid var(--brand);display:none;\n}\n#notes.on{display:block}\n#notes h4{font-family:var(--font-en);font-size:11px;letter-spacing:.14em;color:#8FA4FF;margin-bottom:9px}\n.notes-src{display:none}\n\n@media print{\n  @page{size:1280px 720px;margin:0}\n  body{background:#fff;overflow:visible}\n  #stage{position:static;display:block}\n  #deck{transform:none!important;width:1280px;height:auto}\n  .slide{position:relative;display:block!important;page-break-after:always;height:720px;inset:auto}\n  #bar,#hud,#notes{display:none!important}\n}\n\n/* ── 보정 1~5: 템플릿 결함 ── */\n.h-title.ko{font-size:33px;line-height:1.22;color:var(--ink);margin-top:10px}   /* .ko 15px가 제목을 덮어쓰던 문제 */\n.s-close .h-title.ko{color:#fff}\n.s-close .en{color:#fff}.s-close .ko{color:rgba(255,255,255,.66)}               /* 검은 배경에 검은 글씨 */\n.s-close .en b,.s-close .ko b{color:var(--brand-soft)}\n.s-close .eyebrow .page-ref{color:rgba(255,255,255,.5)}                        /* 검은 배경의 지면 참조가 검정 투명도로 사라지던 문제 */\n.page-frame{height:452px;display:flex;align-items:center;justify-content:center;gap:10px;padding:8px}\n.page-frame img{max-width:100%;max-height:100%;width:auto;height:auto;border:1px solid #E0E4EA;border-radius:6px;background:#fff}\n.page-frame.split img{max-width:calc(50% - 6px)}                                /* 세로로 잘리던 지면 → 좌우 분할 */\n.chips + .pair,.script-ko + .pair,.cards + .pair,table.cmp + .pair{margin-top:18px}\n.pair.lead{margin-bottom:5px}.pair.lead .en{font-size:17px;line-height:1.45}.pair.lead .ko{font-size:13.5px;margin-top:2px;line-height:1.6}   /* 연습 앞의 한마디 */\n/* ── 단계 등장 (.st) ── */\n.st{opacity:0;transform:translateY(8px);transition:opacity .28s ease,transform .28s ease}\n.st.on{opacity:1;transform:none}\n.slide:has(.st:not(.on)) .foot .n::after{content:\" ▸\";color:var(--brand)}\n@media print{.st{opacity:1;transform:none}}\n/* ── 추가 부품 (5절) ── */\n.cards.c4{grid-template-columns:repeat(4,1fr)}\n.card .c-big{font-family:var(--font-en);font-size:40px;font-weight:800;letter-spacing:-.03em;color:var(--brand-deep);line-height:1;margin-bottom:8px}\n.cap{font-size:13px;color:var(--ink-3);margin-top:12px;line-height:1.6}\ntable.sched{width:100%;border-collapse:collapse;font-size:13.5px}\ntable.sched th{font-family:var(--font-en);font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--brand);text-align:left;padding:0 10px 8px;border-bottom:2px solid var(--brand)}\ntable.sched td{padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.45}\ntable.sched td:first-child{font-family:var(--font-en);font-weight:700;color:var(--brand-deep);white-space:nowrap}\ntable.sched tr.hl td{background:var(--brand-soft)} table.sched tr.acc td{background:var(--accent-soft)}\n.glance{display:grid;grid-template-columns:150px 1fr;row-gap:9px;column-gap:18px;font-size:14.5px}\n.glance dt{font-family:var(--font-en);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--brand);padding-top:3px}\n.glance dd{color:var(--ink);line-height:1.55}\n/* ── 디자인 언어 v2 (Figma 웹 시스템에서 빌림, 2026-09): 색은 신호로, 라벨은 모노로, 선은 헤어라인으로 ── */\n:root{\n  --font-mono:\"IBM Plex Mono\",\"SFMono-Regular\",Menlo,Consolas,monospace;\n  --ink-2:rgba(0,0,0,.74); --ink-3:rgba(0,0,0,.56);            /* 회색을 검정 투명도로 — 어떤 배경에서도 같은 관계 */\n  --line:rgba(0,0,0,.16); --surface-2:rgba(0,0,0,.04);\n  --t-fast:.15s; --t-base:.18s; --t-slow:.25s; --ease:ease-out;   /* 모션은 150–250ms ease-out */\n  --shadow-1:0 4px 32px rgba(0,0,0,.10); --shadow-2:0 24px 70px rgba(0,0,0,.10);\n}\n.eyebrow{font-family:var(--font-mono);font-weight:500;letter-spacing:.06em;color:var(--ink-3)}\n.eyebrow .page-ref{font-family:var(--font-mono);font-size:11px;letter-spacing:.02em}\n.foot,.foot .n,.s-divider .of,.s-title .kicker,.s-title .badge,.card .c-label,.answer .a-label,.col-h{font-family:var(--font-mono)}\n.foot{font-size:10.5px;letter-spacing:.02em}\n.card .c-label{color:var(--ink-3);font-weight:500;letter-spacing:.06em}\n.card.brand .c-label{color:var(--brand-deep)} .card.warm .c-label{color:#D9490F}\n.card{border-color:var(--line)}\n.h-title{letter-spacing:-.025em} .s-title h1{letter-spacing:-.035em}\n.st{transition:opacity var(--t-slow) var(--ease),transform var(--t-slow) var(--ease)}\n/* 헤어라인 행 + 배지 (5절) */\n.rows{border-top:1px solid var(--line)}\n.rows .row{display:grid;grid-template-columns:1fr 1.7fr;gap:22px;padding:13px 0;border-bottom:1px solid var(--line)}\n.rows .r-t{font-family:var(--font-en);font-size:17px;font-weight:600;letter-spacing:-.01em;color:var(--ink);line-height:1.4}\n.rows .r-t .ko{display:block;font-family:var(--font-ko);font-size:12.5px;font-weight:400;color:var(--ink-3);margin-top:3px;line-height:1.5}\n.rows .r-en{font-family:var(--font-en);font-size:15px;color:var(--ink);line-height:1.5}\n.rows .r-ko{font-size:13px;color:var(--ink-3);margin-top:4px;line-height:1.6}\n.badge{display:inline-block;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.06em;padding:3px 8px;border-radius:var(--r-pill);background:var(--brand-soft);color:var(--brand-deep);vertical-align:middle;margin-left:8px}\n/* ── 인터랙티브 연습 (덱 안에서): → 가 채점이다 ── */\n:root{--brand-line:#C7EBDC}\n.ix .row{display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--line)}\n.ix .row:last-child{border-bottom:0}\n.ix .idx{flex:0 0 22px;height:22px;border-radius:50%;background:var(--surface-2);color:var(--ink-3);font-family:var(--font-mono);font-size:11px;font-weight:500;display:grid;place-items:center;margin-top:3px}\n.ix .main{flex:1;min-width:0}\n.ix .q{font-family:var(--font-en);font-size:17px;line-height:1.5;color:var(--ink);border-left:0;padding:0;margin:0}\n.ix .q-ko{font-size:12.5px;color:var(--ink-3);margin-top:2px}\n.ix .q .qk{font-family:var(--font-ko);font-size:12.5px;font-weight:400;color:var(--ink-3);margin-left:10px}\n.ix .opts{display:flex;gap:7px;flex-wrap:wrap;margin-top:7px}\n.opt{font-family:var(--font-en);font-size:14px;font-weight:600;padding:6px 13px;border-radius:8px;background:#fff;border:1px solid var(--line);color:var(--ink-2);cursor:pointer;transition:border-color var(--t-base) var(--ease),background var(--t-base) var(--ease),color var(--t-base) var(--ease)}\n.opt:hover{border-color:rgba(0,0,0,.4)}\n.opt.sel{background:var(--brand-soft);border-color:var(--brand);color:var(--brand-deep)}\n.opt.ok{background:var(--brand);border-color:var(--brand);color:#fff}\n.opt.no{background:var(--accent-soft);border-color:#FFDCCE;color:#D9490F;text-decoration:line-through}\ninput.gap{font-family:var(--font-en);font-size:16px;font-weight:600;color:var(--brand-deep);width:118px;padding:2px 8px;border:0;border-bottom:2px solid var(--brand-line);background:var(--brand-soft);border-radius:6px 6px 0 0;outline:none;text-align:center}\ninput.gap:focus{border-bottom-color:var(--brand);background:#fff}\ninput.gap.ok{background:var(--brand-soft);border-bottom-color:var(--brand)}\ninput.gap.no{background:var(--accent-soft);border-bottom-color:var(--accent);color:#D9490F}\n.ix .stress-line{font-family:var(--font-en);font-size:17.5px;line-height:1.75;padding:3px 0;border-bottom:1px solid var(--line)}\n.ix .stress-line:last-child{border-bottom:0}\n.ix .stress-line .spk{font-family:var(--font-mono);font-size:12px;color:var(--brand-deep);margin-right:10px}\n.w{display:inline-block;padding:0 5px;border-radius:6px;cursor:pointer;border:1px solid transparent;user-select:none;transition:background var(--t-fast) var(--ease),color var(--t-fast) var(--ease)}\n.w:hover{background:var(--surface-2)}\n.w.on{background:var(--brand-deep);color:#fff;font-weight:700}\n.w.hit{background:var(--brand);color:#fff;font-weight:700}\n.w.miss{background:#fff;color:var(--brand-deep);font-weight:700;border-color:var(--brand);border-style:dashed}\n.w.wrong{background:var(--accent-soft);color:#D9490F;border-color:#FFDCCE;text-decoration:line-through}\n.ix .pool{display:flex;gap:8px;flex-wrap:wrap;min-height:40px;margin-bottom:12px}\n.ix .bins{display:grid;grid-template-columns:repeat(var(--nb,2),1fr);gap:12px}\n.bin{border:2px dashed var(--line);border-radius:12px;padding:12px;min-height:92px;cursor:pointer;transition:border-color var(--t-base) var(--ease),background var(--t-base) var(--ease)}\n.bin.armed{border-color:var(--brand);background:var(--brand-soft)}\n.bin .bin-h{font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);margin-bottom:8px}\n.bin .pool{min-height:0;margin:0}\n.card-chip{font-family:var(--font-en);font-size:14px;font-weight:600;padding:7px 12px;border-radius:10px;background:#fff;border:1px solid var(--line);cursor:pointer;transition:border-color var(--t-base) var(--ease)}\n.card-chip:hover{border-color:var(--brand)}\n.card-chip.picked{background:var(--brand-deep);color:#fff;border-color:var(--brand-deep)}\n.card-chip.ok{background:var(--brand-soft);border-color:var(--brand);color:var(--brand-deep)}\n.card-chip.no{background:var(--accent-soft);border-color:#FFDCCE;color:#D9490F}\n.ix-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}\n.ix-hint{font-family:var(--font-mono);font-size:11px;color:var(--ink-3);letter-spacing:.04em}\n.fb{font-size:13.5px;font-weight:600;color:var(--ink-3);margin-top:10px;min-height:20px}\n.fb.good{color:var(--brand-deep)} .fb.bad{color:#D9490F}\n.ix + .answer{margin-top:10px;padding:14px 18px}\n#score{display:none;position:fixed;right:18px;bottom:9px;z-index:50;font-family:var(--font-mono);font-size:12px;color:var(--brand-deep);background:var(--brand-soft);border:1px solid var(--brand-line);padding:5px 12px;border-radius:999px}\nbody.student #score{display:block}\nbody.student #notes{display:none!important}\n@media print{.opt.sel:not(.ok):not(.no){background:#fff;border-color:var(--line);color:var(--ink-2)} #score{display:none!important}}\n\n:root{--accent-line:#FFDCCE;--accent-deep:#D9490F}\n.slide{isolation:isolate}\n.orb-soft{position:absolute;right:-190px;top:-170px;width:600px;height:600px;border-radius:50%;pointer-events:none;z-index:-1;\n  background:radial-gradient(circle at 34% 34%,var(--brand-soft),rgba(255,255,255,0) 66%)}\n.orb-soft.warm{background:radial-gradient(circle at 34% 34%,var(--accent-soft),rgba(255,255,255,0) 66%)}\n.orb-soft.low{top:auto;bottom:-260px;right:-160px}\n/* 브랜드 키커 — 본문 첫 줄 위 */\n.kick{font-family:var(--font-en);font-size:11px;font-weight:800;letter-spacing:.17em;text-transform:uppercase;color:var(--brand);margin-bottom:12px;display:flex;align-items:center;gap:9px}\n.kick::before{content:\"\";width:6px;height:6px;border-radius:50%;background:var(--brand)}\n.kick .ko{font-family:var(--font-ko);letter-spacing:0;text-transform:none;font-size:12.5px;color:var(--ink-3);font-weight:500;margin:0}\n/* 알약 태그 줄 */\n.tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}\n.tag{font-family:var(--font-en);font-size:12.5px;font-weight:600;padding:6px 13px;border-radius:var(--r-pill);background:#fff;border:1px solid var(--line);color:var(--ink-2);line-height:1.2}\n.tag.b{background:var(--brand-soft);border-color:var(--brand-line);color:var(--brand-deep)}\n.tag.a{background:var(--accent-soft);border-color:var(--accent-line);color:var(--accent-deep)}\n.tag.k{font-family:var(--font-ko);font-weight:500}\n/* 강조 문장 */\n.pair.key{border-left:3px solid var(--brand);padding:3px 0 3px 20px;margin:2px 0 20px}\n.pair.key .en{font-size:23px;font-weight:600;line-height:1.42;letter-spacing:-.015em;color:var(--ink)}\n.pair.key .en b{color:var(--brand-deep)}\n.pair.key .ko{font-size:15px;color:var(--ink-3);margin-top:7px}\n.pair.key.warm{border-left-color:var(--accent)} .pair.key.warm .en b{color:var(--accent-deep)}\n/* 번호 마커 */\n.pairs-n{counter-reset:p}\n.pairs-n .pair{position:relative;padding-left:38px;counter-increment:p}\n.pairs-n .pair::before{content:\"0\" counter(p);position:absolute;left:0;top:6px;font-family:var(--font-mono);font-size:11px;font-weight:500;letter-spacing:.08em;color:var(--brand)}\n.pairs-n .pair::after{content:\"\";position:absolute;left:0;top:24px;width:22px;height:1px;background:var(--brand-line)}\n.pairs-n .pair.key{padding-left:20px} .pairs-n .pair.key::before,.pairs-n .pair.key::after{display:none}\n/* 2열 — 왼쪽 본문 + 오른쪽 포커스 패널 */\n.split2{display:grid;grid-template-columns:1fr 292px;gap:36px;align-items:start}\n.split2.wide{grid-template-columns:1fr 340px}\n.focus{background:var(--brand-soft);border:1px solid var(--brand-line);border-radius:var(--r-lg);padding:20px 22px 22px;position:relative;overflow:hidden}\n.focus::after{content:\"\";position:absolute;right:-70px;bottom:-90px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.7),rgba(255,255,255,0) 68%)}\n.focus>*{position:relative;z-index:1}                                          /* 없으면 장식 원이 글자를 덮는다 */\n.focus .f-label{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--brand-deep);margin-bottom:10px}\n.focus .f-big{font-family:var(--font-en);font-size:46px;font-weight:800;letter-spacing:-.035em;color:var(--brand-deep);line-height:1}\n.focus .f-big small{font-size:18px;font-weight:600;letter-spacing:-.01em;margin-left:4px;color:var(--brand-deep)}\n.focus .f-en{font-family:var(--font-en);font-size:16px;font-weight:600;color:var(--ink);margin-top:10px;line-height:1.42}\n.focus .f-ko{font-size:13px;color:var(--ink-2);margin-top:7px;line-height:1.62}\n.focus .f-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}\n.focus .f-row .tag{background:#fff}\n.focus .f-rule{height:1px;background:var(--brand-line);margin:12px 0}\n.focus.warm{background:var(--accent-soft);border-color:var(--accent-line)}\n.focus.warm .f-label,.focus.warm .f-big,.focus.warm .f-big small{color:var(--accent-deep)}\n.focus.ink{background:var(--ink);border-color:var(--ink);color:#fff}\n.focus.ink .f-label{color:#6FE0B4} .focus.ink .f-big{color:#fff} .focus.ink .f-en{color:#fff} .focus.ink .f-ko{color:rgba(255,255,255,.66)}\n.focus.ink::after{background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.14),rgba(255,255,255,0) 68%)}\n/* 숫자 타일 */\n.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--r-lg);overflow:hidden;margin-bottom:20px}\n.stats.s4{grid-template-columns:repeat(4,1fr)}\n.stat{background:#fff;padding:18px 20px 17px}\n.stat .n{font-family:var(--font-en);font-size:32px;font-weight:800;letter-spacing:-.03em;color:var(--brand-deep);line-height:1}\n.stat .n small{font-size:14px;font-weight:600;letter-spacing:0;margin-left:3px}\n.stat .l{font-size:12.5px;color:var(--ink-3);margin-top:8px;line-height:1.45}\n.stat .l b{color:var(--ink);font-weight:600}\n.stat.a .n{color:var(--accent-deep)}\n/* 브랜드 네모 목록 */\nul.ticks{list-style:none;margin:0 0 6px}\nul.ticks li{position:relative;padding-left:26px;margin-bottom:11px;line-height:1.5}\nul.ticks li::before{content:\"\";position:absolute;left:2px;top:9px;width:8px;height:8px;border-radius:2px;background:var(--brand)}\nul.ticks.warn li::before{background:var(--accent);border-radius:50%}\nul.ticks li .en{font-size:17.5px}\nul.ticks li .ko{font-size:13.5px;margin-top:3px}\n/* 단계 흐름 */\n.flow{display:grid;grid-template-columns:repeat(var(--nf,4),1fr);gap:12px}\n.fstep{border:1px solid var(--line);border-radius:var(--r-lg);padding:16px 17px;background:#fff;position:relative}\n.fstep.on{border-color:var(--brand-line);background:var(--brand-soft)}\n.fstep .fn{font-family:var(--font-mono);font-size:11px;font-weight:500;letter-spacing:.1em;color:var(--brand);margin-bottom:8px}\n.fstep .ft{font-family:var(--font-en);font-size:15.5px;font-weight:700;line-height:1.35;color:var(--ink)}\n.fstep .fd{font-size:12.5px;color:var(--ink-2);margin-top:6px;line-height:1.55}\n/* 제목의 한 낱말만 그라데이션 */\n.g{background:linear-gradient(95deg,var(--brand-deep),var(--brand) 55%,#2FD39B);-webkit-background-clip:text;background-clip:text;color:transparent}\n/* 마무리 슬라이드 변주 */\n.s-close .tag{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18);color:#fff}\n.s-close .kick{color:#6FE0B4} .s-close .kick .ko{color:rgba(255,255,255,.55)}\n.s-close .pair.key{border-left-color:#6FE0B4} .s-close .pair.key .en b{color:#6FE0B4} .s-close .pair.key .ko{color:rgba(255,255,255,.66)}\n.s-close .orb-soft{background:radial-gradient(circle at 34% 34%,rgba(111,224,180,.18),rgba(255,255,255,0) 66%)}\n.tags + .pair,.stats + .pair,.flow + .pair,ul.ticks + .pair{margin-top:4px}\n.split2 .pair:last-child{margin-bottom:0}\n@media print{.orb-soft{display:none}}\n\n/* ── 과목 색: <body data-course=\"erw1|els1|guide\"> 하나만 바꾸면 덱 전체 색이 바뀐다 ── */\nbody[data-course=\"els1\"]{--brand:#00A56A;--brand-deep:#00754C;--brand-soft:#E6F7F0;--brand-line:#C7EBDC}\nbody[data-course=\"guide\"]{--brand:#5B4BC4;--brand-deep:#3B2E92;--brand-soft:#EFECFF;--brand-line:#D9D2FF}\nbody[data-course=\"erw1\"]{--brand-line:#DCE2FF}\n.card.brand,.chip{border-color:var(--brand-line)}\nbody[data-course=\"els1\"] .s-title{background:linear-gradient(135deg,var(--brand-deep) 0%,var(--brand) 62%,#2FD39B 100%)}\nbody[data-course=\"guide\"] .s-title{background:linear-gradient(135deg,var(--brand-deep) 0%,var(--brand) 62%,#8E80F0 100%)}\nbody[data-course=\"els1\"] .s-close .card .c-label,body[data-course=\"els1\"] #notes h4{color:#6FE0B4}\nbody[data-course=\"guide\"] .s-close .card .c-label,body[data-course=\"guide\"] #notes h4{color:#B3A8FF}\n/* ── 자체 점검 패널 (C 키) ── */\n#check{display:none;position:fixed;right:16px;top:16px;z-index:70;width:380px;max-height:70vh;overflow:auto;background:#fff;border:1px solid rgba(0,0,0,.16);border-radius:12px;box-shadow:0 24px 70px rgba(0,0,0,.18);padding:16px 18px;font-size:13px;line-height:1.6;color:#14161A}\n#check.on{display:block}\n#check h4{font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;color:var(--brand-deep);margin-bottom:8px}\n#check .ok{color:var(--brand-deep);font-weight:600} #check .bad{color:#D9490F;font-weight:600}\n@media print{#check{display:none!important}}\n\n/* ═══ 오디오·영상 모듈 (제미나이판) ═══ */\n.say-src,.say-ans-src{display:none}\n/* 낭독 알약 — 스크립트가 자동으로 단다 */\n.rule-row{position:relative;height:3px;margin-top:16px}\n.rule-row .rule{margin-top:0}\n.rule-row .nar{position:absolute;right:0;top:50%;transform:translateY(-50%)}\n.nar.float{position:absolute;right:var(--pad-x);top:62px;z-index:2}\n.nar{position:relative;display:inline-flex;align-items:center;gap:7px;height:26px;padding:0 11px 0 6px;border-radius:999px;border:1px solid var(--brand-line);background:var(--brand-soft);color:var(--brand-deep);font-family:var(--font-mono);font-size:11px;letter-spacing:.04em;cursor:pointer;overflow:hidden;white-space:nowrap;transition:background var(--t-base) var(--ease),border-color var(--t-base) var(--ease)}\n.nar:hover{background:#fff;border-color:var(--brand)}\n.nar .nar-ic{width:16px;height:16px;border-radius:50%;background:var(--brand-deep);position:relative;flex:0 0 auto}\n.nar .nar-ic::before{content:\"\";position:absolute;left:6px;top:4px;border-style:solid;border-width:4px 0 4px 6px;border-color:transparent transparent transparent #fff}\n.nar.playing .nar-ic::before{left:5px;top:4.5px;width:2px;height:7px;border:0;background:#fff;box-shadow:4px 0 0 #fff}\n.nar .nar-l{font-weight:500}\n.nar .nar-a{display:none;color:var(--accent-deep)}\n.slide:has(.answer.on) .nar .nar-a,.slide:has(.answer:not(.st)) .nar .nar-a{display:inline}\n.nar .nar-bar{position:absolute;left:0;bottom:0;height:2px;width:0;background:var(--brand);transition:width .3s linear}\n.nar.playing.ans .nar-bar{background:var(--accent)}\n.nar.playing.ans .nar-ic{background:var(--accent-deep)}\n.nar.light,.s-close .nar{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.32);color:#fff}\n.nar.light:hover,.s-close .nar:hover{background:rgba(255,255,255,.22);border-color:#fff}\n.nar.light .nar-ic,.s-close .nar .nar-ic{background:#fff}\n.nar.light .nar-ic::before,.s-close .nar .nar-ic::before{border-left-color:var(--brand-deep)}\n.nar.light.playing .nar-ic::before,.s-close .nar.playing .nar-ic::before{background:var(--brand-deep);box-shadow:4px 0 0 var(--brand-deep)}\n.nar.light .nar-bar,.s-close .nar .nar-bar{background:#fff}\n.s-title .nar{margin-left:10px;vertical-align:middle}\n/* 지금 읽는 부분 */\n.speaking-grp>*:not(.speaking){opacity:.3;transition:opacity .25s ease-out}\n.pair.speaking .en,li.speaking .en{background:linear-gradient(transparent 62%,var(--brand-soft) 62%)}\n/* 듣기 바 */\n.aud{display:flex;align-items:center;gap:12px;margin:8px 0 12px;padding:7px 14px 7px 8px;border:1px solid var(--line);border-radius:12px;background:var(--surface-2)}\n.aud .aud-btn{flex:0 0 30px;height:30px;border-radius:50%;border:0;background:var(--brand-deep);cursor:pointer;position:relative}\n.aud .aud-btn::before{content:\"\";position:absolute;left:12px;top:9px;border-style:solid;border-width:6px 0 6px 9px;border-color:transparent transparent transparent #fff}\n.aud.playing .aud-btn::before{left:10px;top:10px;width:3px;height:10px;border:0;background:#fff;box-shadow:6px 0 0 #fff}\n.aud .aud-track{flex:0 0 300px;height:6px;border-radius:3px;background:var(--line);position:relative;cursor:pointer}\n.aud .aud-fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:3px;background:var(--brand)}\n.aud .aud-l{font-family:var(--font-mono);font-size:11px;letter-spacing:.03em;color:var(--ink-3);line-height:1.4}\n.aud .aud-l em{font-style:normal;color:var(--accent-deep)}\n.page-frame.with-aud{height:392px}\n.body.tall > .aud{margin:4px 0 8px}\n.pair.lead + .aud{margin-top:2px}\n/* 영상 슬라이드 */\n.vslide > .h-title{font-size:30px;margin-top:8px}\n.vslide > .body{height:auto;margin-top:12px;display:flex;justify-content:center}\n.vwrap{position:relative;width:974px;height:548px;border-radius:10px;overflow:hidden;background:#0F1512;box-shadow:0 18px 50px rgba(0,0,0,.22)}\n.vwrap video,.vwrap iframe{position:absolute;inset:0;width:100%;height:100%;display:block;background:#000;border:0}\n.vwrap.deckmode video{opacity:0}\n.vwrap .vdeck{position:absolute;inset:0;background:#fff;display:none;pointer-events:none;overflow:hidden}\n.vwrap.deckmode .vdeck{display:block}\n.slide-clone{position:absolute;left:0;top:0;width:1280px;height:720px;padding:var(--pad-t) var(--pad-x) 0;overflow:hidden;transform-origin:0 0;isolation:isolate}\n.slide-clone.s-title,.slide-clone.s-divider{padding:0}\n.slide-clone .vh{visibility:hidden}\n.slide-clone .foot .n,.slide-clone .nar,.slide-clone .notes-src{display:none}\n.slide-clone .hlg>*:not(.hl-on){opacity:.26}\n.slide-clone .hl-on{box-shadow:0 0 0 3px var(--brand);border-radius:var(--r-md)}\n.vwrap .vcap{position:absolute;left:0;right:0;bottom:40px;padding:8px 40px 9px;text-align:center;background:rgba(15,21,18,.78);display:none}\n.vwrap .vcap.on{display:block}\n.vwrap .vcap .ce{font-family:var(--font-en);font-weight:600;font-size:19px;line-height:1.3;color:#fff}\n.vwrap .vcap .ck{font-family:var(--font-ko);font-size:15px;line-height:1.35;color:#B9C3CC;margin-top:3px}\n.vwrap .vbar{position:absolute;left:0;right:0;bottom:0;height:40px;display:flex;align-items:center;gap:12px;padding:0 14px;background:rgba(15,21,18,.92);color:#fff;font-family:var(--font-mono);font-size:11.5px}\n.vwrap .vbar button{border:0;background:none;color:#fff;cursor:pointer;font-family:var(--font-mono);font-size:11.5px;padding:4px 6px;border-radius:6px}\n.vwrap .vbar button:hover{background:rgba(255,255,255,.12)}\n.vwrap .vplay{width:26px;height:26px;position:relative}\n.vwrap .vplay::before{content:\"\";position:absolute;left:9px;top:7px;border-style:solid;border-width:6px 0 6px 9px;border-color:transparent transparent transparent #fff}\n.vwrap.playing .vplay::before{left:8px;top:8px;width:3px;height:10px;border:0;background:#fff;box-shadow:6px 0 0 #fff}\n.vwrap .vtrack{flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,.22);position:relative;cursor:pointer}\n.vwrap .vfill{position:absolute;left:0;top:0;bottom:0;width:0;background:#6FE0B4;border-radius:3px}\n.vwrap .vmsg{position:absolute;left:16px;top:14px;right:16px;font-family:var(--font-ko);font-size:12.5px;color:#fff;background:rgba(217,73,15,.88);padding:7px 12px;border-radius:8px;display:none;z-index:3}\n.vwrap .vmsg.on{display:block}\n.vwrap .vprint{display:none}\n/* 자동 강의 모드 (A 키) — 화면 녹화용 */\n:root{--capH:120px;--recs:1}\n#capbar{display:none}\n#hud{white-space:nowrap}\nbody.rec .fb,body.rec .ix-hint{visibility:hidden}\nbody.rec{background:#14181C;cursor:none}\nbody.rec #stage{inset:0 0 var(--capH) 0}\nbody.rec #deck{transform:scale(var(--recs))!important}\nbody.rec #hud,body.rec #bar,body.rec #notes,body.rec #score,body.rec #check,body.rec .nar{display:none!important}\nbody.rec #capbar{display:flex;position:fixed;left:0;right:0;bottom:0;height:var(--capH);flex-direction:column;align-items:center;justify-content:center;padding:0 6vw;text-align:center;background:#14181C;z-index:80}\n#capbar .ce{font-family:var(--font-en);font-weight:600;font-size:calc(var(--capH)*.24);line-height:1.25;color:#fff}\n#capbar .ck{font-family:var(--font-ko);font-size:calc(var(--capH)*.19);line-height:1.3;color:#B9C3CC;margin-top:6px}\n#capbar.long .ce{font-size:calc(var(--capH)*.2)} #capbar.long .ck{font-size:calc(var(--capH)*.16)}\n#capbar.pause .ce{color:#8FE3B8}\n@media print{\n  .nar,.aud{display:none!important}\n  .vwrap video,.vwrap iframe,.vwrap .vdeck,.vwrap .vcap,.vwrap .vbar,.vwrap .vmsg{display:none!important}\n  .vwrap{background:#14181C}\n  .vwrap .vprint{display:flex!important;position:absolute;inset:0;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-family:var(--font-ko);font-size:18px;gap:8px}\n  #capbar{display:none!important}\n}\n";
  var FONTS="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500&display=swap";
  var HUD="← → 이동(▸ 정답) · N 노트 · F 전체 · P 인쇄 · S 학생 · L 낭독 · A 자동 강의 · T 대본 · E 한 파일 · C 점검";

  var km=document.getElementById('kit-missing'); if(km) km.remove();   /* 키트가 실렸으니 '찾지 못했습니다' 안내를 지운다 */
  var deck=document.getElementById('deck'); if(!deck) return;
  var ORIGINAL=deck.innerHTML;                                  /* E 키 내보내기용 — 스크립트가 손대기 전의 슬라이드 */
  if(!document.querySelector('meta[name="viewport"]')){ var mv=document.createElement('meta'); mv.name='viewport'; mv.content='width=device-width, initial-scale=1'; document.head.appendChild(mv); }
  if(!document.querySelector('link[href*="fonts.googleapis.com/css2"]')){ var lk=document.createElement('link'); lk.rel='stylesheet'; lk.href=FONTS; document.head.appendChild(lk); }
  var st=document.createElement('style'); st.id='deck-kit-style'; st.textContent=CSS; document.head.appendChild(st);
  if(!document.body.dataset.course) document.body.dataset.course='erw1';
  if(!document.getElementById('stage')){ var sg=document.createElement('div'); sg.id='stage'; deck.parentNode.insertBefore(sg,deck); sg.appendChild(deck); }
  var stage=document.getElementById('stage');
  if(!document.getElementById('bar')){ var br=document.createElement('div'); br.id='bar'; stage.parentNode.insertBefore(br,stage); }
  if(!document.getElementById('hud')){ var hd=document.createElement('div'); hd.id='hud'; hd.textContent=HUD; document.body.appendChild(hd); }
  if(!document.getElementById('notes')){ var nt=document.createElement('div'); nt.id='notes'; nt.innerHTML='<h4>SPEAKER NOTES · 강의 노트</h4><div id="notes-body"></div>'; document.body.appendChild(nt); }
  /* ── 넘기기 · 노트 · 인쇄 ── */
(function(){
  const deck=document.getElementById('deck');
  const slides=[...deck.querySelectorAll('.slide')];
  const bar=document.getElementById('bar'),hud=document.getElementById('hud');
  const notes=document.getElementById('notes'),nbody=document.getElementById('notes-body');
  let i=0,notesOn=false;

  slides.forEach((s,k)=>{const n=s.querySelector('.foot .n');if(n)n.textContent=(k+1)+' / '+slides.length;});

  function fit(){
    const s=Math.min(innerWidth/1280,innerHeight/720);
    deck.style.transform='scale('+s+')';
  }
  function show(k){
    i=Math.max(0,Math.min(slides.length-1,k));
    slides.forEach((s,x)=>s.classList.toggle('is-on',x===i));
    bar.style.width=((i+1)/slides.length*100)+'%';
    const src=slides[i].querySelector('.notes-src');
    nbody.textContent=src&&src.textContent.trim()?src.textContent.trim():'— 이 슬라이드에는 노트가 없습니다 —';
    location.hash=i+1;
  }
  addEventListener('resize',fit);
  addEventListener('keydown',e=>{
    if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(i+1);}
    else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(i-1);}
    else if(e.key==='Home')show(0);
    else if(e.key==='End')show(slides.length-1);
    else if(e.key==='n'||e.key==='N'){notesOn=!notesOn;notes.classList.toggle('on',notesOn);}
    else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
    else if(e.key==='p'||e.key==='P'){print();}
  });
  deck.addEventListener('click',e=>show(e.clientX<innerWidth/2?i-1:i+1));
  fit();show(Math.max(0,(parseInt(location.hash.slice(1))||1)-1));
  setTimeout(()=>hud.style.opacity=.25,3500);
})();
  /* ── 단계 등장 · 연습 채점 · 학생 모드 ── */
(function(){
  var deck=document.getElementById('deck');
  var $=function(q,r){return (r||document).querySelector(q)}, $$=function(q,r){return [].slice.call((r||document).querySelectorAll(q))};
  function cur(){return deck.querySelector('.slide.is-on')}
  function pend(s){return s?$$('.st:not(.on)',s):[]}
  function reset(s){$$('.st.on',s).forEach(function(e){e.classList.remove('on')})}
  /* ── 학생 모드 ── */
  var student=/student/.test(location.search);
  var scoreEl=document.createElement('div'); scoreEl.id='score'; document.body.appendChild(scoreEl);
  function setMode(on){student=on;document.body.classList.toggle('student',on);
    var hud=document.getElementById('hud'); if(hud) hud.textContent=on?'학생 모드 · ← → 이동 · 고르고 → 로 채점 · L 낭독 · S 교수 모드':'← → 이동(▸ 정답) · N 노트 · F 전체 · P 인쇄 · S 학생 · L 낭독 · A 자동 강의 · T 대본 · E 한 파일 · C 점검'; tally();}
  /* ── 인터랙티브 연습 ── */
  function norm(x){return (x||'').trim().toLowerCase().replace(/[’']/g,"'").replace(/\s+/g,' ')}
  $$('[data-s]').forEach(function(sp){ sp._target=sp.dataset.s.toLowerCase().split(/\s+/);
    sp.innerHTML=sp.textContent.split(/(\s+)/).map(function(t){ if(!t.trim()) return t;
      return '<span class="w" data-b="'+t.replace(/[^A-Za-z']/g,'').toLowerCase()+'">'+t+'</span>'; }).join(''); });
  function totalOf(ix){ var n=$$('.row[data-a]',ix).length + $$('.card-chip[data-bin]',ix).length;
    $$('[data-s]',ix).forEach(function(sp){ $$('.w',sp).forEach(function(w){ if(sp._target.indexOf(w.dataset.b)>-1) n++; }); }); return n; }
  var IX=$$('.ix'); var TOTAL=0; IX.forEach(function(ix){ix._total=totalOf(ix);TOTAL+=ix._total;});
  function tally(){ var n=0,t=0; IX.forEach(function(ix){ if(ix._done){n+=ix._n;t+=ix._total;} }); scoreEl.textContent='SCORE '+n+' / '+TOTAL+(t<TOTAL?'  ·  '+IX.filter(function(i){return i._done}).length+'/'+IX.length+' 연습':''); }
  function attempted(ix){ return !!( $('.opt.sel',ix) || $('.w.on',ix) || $$('input.gap',ix).some(function(i){return i.value.trim()}) || $('.bin .card-chip',ix) ); }
  function grade(ix){ if(ix._done) return; var n=0,total=0,fb=$('.fb',ix);
    $$('.row[data-a]',ix).forEach(function(r){ total++; var want=norm(r.dataset.a), inp=$('input.gap',r);
      if(inp){ inp.classList.remove('ok','no'); if(norm(inp.value)===want){inp.classList.add('ok');n++;} else {inp.classList.add('no'); inp.value=r.dataset.a;} inp.readOnly=true; }
      else { var sel=$('.opt.sel',r); $$('.opt',r).forEach(function(o){ o.classList.remove('ok','no'); if(norm(o.textContent)===want) o.classList.add('ok'); });
        if(sel&&norm(sel.textContent)===want) n++; else if(sel) sel.classList.add('no'); } });
    $$('.card-chip[data-bin]',ix).forEach(function(c){ total++; c.classList.remove('picked'); var host=c.closest('.bin');
      if(host&&host.dataset.bin===c.dataset.bin){c.classList.add('ok');n++;} else c.classList.add('no'); });
    $$('.bin',ix).forEach(function(b){b.classList.remove('armed')}); picked=null;
    $$('[data-s]',ix).forEach(function(sp){ $$('.w',sp).forEach(function(w){ var isT=sp._target.indexOf(w.dataset.b)>-1, on=w.classList.contains('on'); w.classList.remove('on');
      if(isT){ total++; if(on){w.classList.add('hit');n++;} else w.classList.add('miss'); } else if(on) w.classList.add('wrong'); }); });
    ix._done=true; ix._n=n; var pct=total?Math.round(n/total*100):0;
    if(fb){ fb.className='fb '+(pct>=80?'good':(pct>=50?'':'bad'));
      fb.textContent=n+' / '+total+' 맞음 ('+pct+'%)'+($('[data-s]',ix)?' — 초록 맞힘 · 점선 놓침 · 주황 취소선 잘못 짚음':(pct===100?' — 전부 맞혔습니다.':' — 정답이 표시되었습니다.')); }
    tally(); }
  function next(){ var s=cur(); if(!s) return false; var ix=$('.ix',s);
    if(ix&&!ix._done){ if(student&&!attempted(ix)&&!ix._nudged){ ix._nudged=true; var fb=$('.fb',ix); if(fb){fb.className='fb bad';fb.textContent='먼저 골라 보세요. 그다음 → 를 누르면 채점됩니다. (한 번 더 누르면 그냥 넘어갑니다)';} return true; } grade(ix); var p0=pend(s); if(p0.length){p0[0].classList.add('on');} return true; }
    var p=pend(s); if(!p.length) return false; p[0].classList.add('on'); return true; }
  var picked=null;
  addEventListener('keydown',function(e){
    var tag=e.target&&e.target.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'){ if(e.key==='Enter'){e.preventDefault();e.target.blur();next();} e.stopImmediatePropagation(); return; }
    if(e.key==='s'||e.key==='S'){ setMode(!student); e.stopImmediatePropagation(); return; }
    if(['ArrowRight','PageDown',' '].indexOf(e.key)>-1&&next()){ e.preventDefault(); e.stopImmediatePropagation(); }
  },true);
  deck.addEventListener('click',function(e){
    var ix=e.target.closest?e.target.closest('.ix'):null;
    if(ix){ var t=e.target;
      var opt=t.closest('.opt'); if(opt&&!ix._done){ $$('.opt',opt.parentNode).forEach(function(o){o.classList.remove('sel')}); opt.classList.add('sel'); }
      var w=t.closest('.w'); if(w&&!ix._done) w.classList.toggle('on');
      var chip=t.closest('.card-chip'); var bin=t.closest('.bin');
      if(chip&&!ix._done){ if(picked===chip){picked.classList.remove('picked');picked=null;} else { if(picked) picked.classList.remove('picked'); picked=chip; chip.classList.add('picked'); } $$('.bin',ix).forEach(function(b){b.classList.toggle('armed',!!picked)}); }
      else if(bin&&picked&&!ix._done){ $('.pool',bin).appendChild(picked); picked.classList.remove('picked'); picked=null; $$('.bin',ix).forEach(function(b){b.classList.remove('armed')}); }
      if(t.tagName!=='INPUT') e.preventDefault();
      e.stopImmediatePropagation(); return; }
    if(e.clientX>=innerWidth/2&&next()){ e.stopImmediatePropagation(); }
  },true);
  var mo=new MutationObserver(function(ms){ms.forEach(function(m){if(m.target.classList.contains('is-on'))reset(m.target)})});
  $$('.slide',deck).forEach(function(sl){mo.observe(sl,{attributes:true,attributeFilter:['class']})});
  setMode(student);
})();
  /* ── 자체 점검 (C) ── */
(function(){
  /* C 키: 덱 자체 점검 — 넘침, 노트 누락, 단조로운 텍스트 슬라이드, 슬라이드당 연습 문항 수 */
  var deck=document.getElementById('deck');
  var box=document.createElement('div'); box.id='check'; document.body.appendChild(box);
  function run(){
    var slides=[].slice.call(deck.querySelectorAll('.slide')), cur=deck.querySelector('.slide.is-on');
    var ov=[],nn=[],flat=[],dense=[];
    var RICH='.focus,.pair.key,.tags,.cards,.ix,table,.script,.chips,.rows,.stats,.flow,ul.ticks,.page-frame,.q,.answer,.cols,.glance,.kick';
    slides.forEach(function(s,i){
      slides.forEach(function(x){x.classList.remove('is-on')}); s.classList.add('is-on');
      [].forEach.call(s.querySelectorAll('.st'),function(e){e.classList.add('on')});
      var b=s.querySelector(':scope > .body');
      if(b){ var bottom=0; [].forEach.call(b.children,function(c){bottom=Math.max(bottom,c.getBoundingClientRect().bottom)});
        var f=s.querySelector(':scope > .foot'); var lim=f?f.getBoundingClientRect().top:Infinity;
        if(b.scrollHeight>b.clientHeight+1||bottom>lim+1) ov.push(i+1); }
      var n=s.querySelector(':scope > .notes-src'); if(!n||!n.textContent.trim()) nn.push(i+1);
      if(!s.classList.contains('s-title')&&!s.classList.contains('s-divider')&&!s.classList.contains('s-close')&&s.querySelector('.pair')&&!s.querySelector(RICH)) flat.push(i+1);
      var ix=[].filter.call(s.querySelectorAll('.ix'),function(x){return !x.closest('.slide-clone')})[0]; if(ix){ var r=ix.querySelectorAll('.row[data-a]').length, c=ix.querySelectorAll('.card-chip').length, l=ix.querySelectorAll('.stress-line').length;
        var hasType=ix.querySelector('input.gap'); if((!hasType&&r>3)||(hasType&&r>5)||c>6||l>8) dense.push(i+1); }
      [].forEach.call(s.querySelectorAll('.st.on'),function(e){e.classList.remove('on')});
    });
    slides.forEach(function(x){x.classList.remove('is-on')}); if(cur) cur.classList.add('is-on');
    function line(label,arr){return '<div>'+label+': '+(arr.length?'<span class="bad">'+arr.join(', ')+'</span>':'<span class="ok">없음</span>')+'</div>'}
    box.innerHTML='<h4>SELF-CHECK · 자체 점검 ('+slides.length+'장 · 연습 '+[].filter.call(deck.querySelectorAll('.ix'),function(x){return !x.closest('.slide-clone')}).length+'개)</h4>'
      +line('넘침(글이 본문 칸을 벗어남)',ov)+line('강의 노트 누락',nn)+line('텍스트만 놓인 슬라이드',flat)+line('연습 문항 상한 초과',dense)
      +(window.__mediaCheck?window.__mediaCheck().map(function(x){return line(x[0],x[1])}).join(''):'')
      +'<div style="margin-top:8px;color:rgba(0,0,0,.56)">번호는 슬라이드 번호입니다. 넘치면 글씨를 줄이지 말고 슬라이드를 나누세요. C 키로 닫습니다.</div>';
    box.classList.add('on');
  }
  addEventListener('keydown',function(e){
    var t=e.target&&e.target.tagName; if(t==='INPUT'||t==='TEXTAREA') return;
    if(e.key==='c'||e.key==='C'){ if(box.classList.contains('on')) box.classList.remove('on'); else run(); }
  });
})();
  /* ── 오디오 · 영상 · 자동 강의 ── */
(function(){
  /* ═══ 오디오·영상 모듈 (제미나이판) ═══
     L 낭독 · A 자동 강의(화면 녹화용) · Esc 자동 강의 끝 · T 낭독 대본 내려받기
     낭독은 브라우저 음성(speechSynthesis). Edge에서 열면 Microsoft 신경망 목소리(Andrew·Ava…)를 쓴다. */
  var deck=document.getElementById('deck'); if(!deck) return;
  var $=function(q,r){return (r||document).querySelector(q)}, $$=function(q,r){return [].slice.call((r||document).querySelectorAll(q))};
  var HANGUL=/[ㄱ-ㆎ가-힣]/, HANGUL_G=/[ㄱ-ㆎ가-힣]+/g;
  var IPA=/[ʃʒəɪŋɔæðθʊɛɑɜː]|\/[a-zəɪŋɔæðθʊɛɑɜːˈ]+\//;
  var SLIDES=$$('.slide',deck);
  var CONTENT=SLIDES.filter(function(s){return !s.classList.contains('vslide')});
  var SYN=window.speechSynthesis||null;
  function cur(){return deck.querySelector('.slide.is-on')}
  function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
  function sq(t){return (t||'').replace(/\s+/g,' ').trim()}

  /* ── 화면 문자열 → 읽을 문자열 ── */
  function T(el){ if(!el) return ''; var c=el.cloneNode(true);
    $$('.ko,.qk,.q-ko,.c-ko,.g-ko,.r-ko,.t-ko,.a-ko,.f-ko,.nar,script',c).forEach(function(x){x.remove()});
    $$('input',c).forEach(function(i){i.replaceWith(' ___ ')}); $$('br',c).forEach(function(b){b.replaceWith(' ')});
    return sq(c.textContent); }
  function K(el){ return el?sq(el.textContent):'' }
  function latin(t){ return (t||'').split('·').map(sq).filter(function(x){return x&&!HANGUL.test(x)}).join(', ') }
  function spoken(t){
    t=(t||'').replace(HANGUL_G,'').replace(/\(\s*[,·\s]*\)/g,'');
    [['___',' blank '],['&',' and '],['→','. '],['⇒','. '],['·',', '],[' — ',', '],['—',', '],['=',' equals '],['≈','about '],['×',' by '],
     ['JNUclass','J-N-U class'],['23:59','11:59 p.m.'],['T/F','true or false'],['…',' ... '],['Wh-','W-H'],['#','number ']].forEach(function(p){t=t.split(p[0]).join(p[1])});
    t=t.replace(/\bpp\.\s?(\d+)\s?[–-]\s?(\d+)/g,'pages $1 to $2').replace(/\bp\.\s?(\d+)/g,'page $1').replace(/(\d)\s?–\s?(\d)/g,'$1 to $2').replace(/–/g,', ').replace(/\bMIN\b/g,'minutes').replace(/\b0(\d)\b/g,'$1');
    if(!IPA.test(t)) t=t.replace(/\s*\/\s*/g,' or ');
    t=sq(t).replace(/^(?:[\s,.:;!?]|-(?=\s))+/,'').replace(/([?!])\s*[.,;:]+/g,'$1').replace(/([,.:;])\s*[,.:;]+/g,'$1').replace(/\s+([,.!?;:])/g,'$1');
    return sq(t); }
  function sentences(t){ return t.split(/(?<=[.?!])\s+(?=[A-Z0-9"“‘(])/).map(sq).filter(Boolean) }

  /* ── 슬라이드에서 읽을 단위 뽑기: 화면의 영어가 곧 대본 ── */
  var SEL='.kick,.pair,.goal,.col-h,.card,.focus,.fstep,.stat,table.cmp tr,table.sched tr,.glance dt,.chips,.rows .row,.q,.script,.ix .row[data-a],.ix .stress-line,.ix > .pool,ul.ticks li';
  function U(en,ko,el,grp,voice){ return {en:sq(en),ko:sq(ko),el:el||null,grp:grp||null,voice:voice||'lect'} }
  function lines(sc){ return (sc.textContent||'').split('\n').map(sq).filter(Boolean) }
  function scriptLines(el){ var out=[], spk='', cur='';
    function push(){ if(sq(cur)) out.push({spk:spk,t:sq(cur)}); cur=''; }
    el.childNodes.forEach(function(n){
      if(n.nodeType===3){ cur+=n.textContent; }
      else if(n.classList&&n.classList.contains('spk')){ push(); spk=sq(n.textContent); }
      else if(n.nodeName==='BR'){ push(); }
      else cur+=' '+(n.textContent||'')+' '; });
    push(); return out; }
  function extract(s){
    var main=[], ans=[], warn=[];
    if(s.classList.contains('vslide')||s.classList.contains('s-divider')) return {main:main,ans:ans,warn:warn};
    var o=$('script.say-src',s), oa=$('script.say-ans-src',s), dr=s.getAttribute('data-read');   /* data-read="…"도 say-src처럼 받는다 */
    if(o||dr){ (o?lines(o):[dr]).forEach(function(l){ main.push(U(l,'')) }); }
    else if(s.classList.contains('s-title')){
      [T($('.kicker',s)), T($('h1',s)), T($('.badge',s))].forEach(function(x,i){ if(x) main.push(U(x, i===1?K($('.h1-ko',s)):'')) });
    } else {
      var h=$('.h-title',s); if(h&&!$('.page-frame',s)){ var ht=T(h).replace(/\s*·\s*\d+\s*[–-]\s*\d+\s*$/,''); ht=HANGUL.test(ht)?latin(ht):ht; if(ht) main.push(U(ht,K($('.h-sub',s)))); }
      var body=$('.body',s);
      if($('.page-frame',s)){ var m=K($('.page-ref',s)).match(/p\.\s?(\d+)/); main.push(U("Let's look at the textbook"+(m?', page '+m[1]:'')+'.',K($('.page-cap',s)))); }
      if(body) $$(SEL,body).forEach(function(el){
        if(el.closest('.answer')) return;
        var c=el.classList, g;
        if(c.contains('pair')) main.push(U(T($('.en',el)),K($('.ko',el)),el,el.parentElement.classList.contains('pairs-n')?'pairs-n':null));
        else if(c.contains('kick')) main.push(U(T(el),K($('.ko',el))));
        else if(c.contains('goal')) main.push(U(T($('.g-en',el)),K($('.g-ko',el)),el,'goal'));
        else if(c.contains('col-h')){ var nx=el.nextElementSibling; if(!(nx&&nx.classList.contains('chips'))){ var lt=latin(K(el)); if(lt) main.push(U(lt+'.',K(el))); } }
        else if(c.contains('card')){ var bits=[latin(K($('.c-label',el))), T($('.c-big',el)), T($('.c-en',el))].filter(Boolean); main.push(U(bits.join('. '),K($('.c-ko',el)),el,'card')); }
        else if(c.contains('focus')){ var fb=[latin(K($('.f-label',el))), T($('.f-big',el)), T($('.f-en',el))].filter(Boolean); if(fb.length) main.push(U(fb.join('. '),K($('.f-ko',el)))); }
        else if(c.contains('fstep')) main.push(U([T($('.fn',el)),T($('.ft',el))].filter(Boolean).join('. '),K($('.fd',el)),el,'fstep'));
        else if(c.contains('stat')){ var l=latin(K($('.l',el))); if(l) main.push(U(T($('.n',el))+' '+l,K($('.l',el)))); }
        else if(el.tagName==='TR'){ var tds=$$('td',el); if(!tds.length) return; var tb=el.closest('table');
          if(tb.classList.contains('cmp')){ var heads=$$('th',tb).map(function(th){return latin(K(th))});
            main.push(U(tds.map(function(td,i){return (heads[i]?heads[i]+': ':'')+T($('.t-en',td)).replace(/\.$/,'')+'.'}).join(' '), tds.map(function(td){return K($('.t-ko',td))}).filter(Boolean).join(' · '), el, 'tr')); }
          else main.push(U(tds.map(function(td){return T(td)}).filter(function(x){return x&&!HANGUL.test(x)}).join(', '),'',el,'tr')); }
        else if(el.tagName==='DT'){ var dd=el.nextElementSibling; main.push(U(T(el)+'. '+(dd&&!HANGUL.test(K(dd))?K(dd):''),dd?K(dd):'')); }
        else if(c.contains('chips')){ var ch=$$('.chip',el).map(T); var pv=el.previousElementSibling, lab=(pv&&pv.classList.contains('col-h'))?K(pv):'';
          main.push(U((latin(lab)?latin(lab)+': ':'')+ch.join(', ')+'.', lab, el, null)); }
        else if(c.contains('row')&&el.dataset.a!==undefined){ var q=$('.q',el), opts=$$('.opt',el).map(function(o){return sq(o.textContent)}), tail='';
          if(opts.join()==='T,F') tail=' True or false?'; else if(opts.length&&opts.every(function(x){return /^\d+$/.test(x)})) tail=' Which number, '+opts[0]+' to '+opts[opts.length-1]+'?';
          else if(opts.length) tail=' '+opts.slice(0,-1).join(', ')+', or '+opts[opts.length-1]+'?';
          main.push(U(K($('.idx',el))+'. '+T(q).replace(/\s+\/\s+/g,', ')+'.'+tail, K($('.qk',el)), el, 'ix')); }
        else if(c.contains('row')) main.push(U(T($('.r-t',el))+': '+T($('.r-en',el)), [K($('.r-t .ko',el)),K($('.r-ko',el))].filter(Boolean).join(' — '), el, 'row'));
        else if(c.contains('q')){ if($('.q-en',el)) main.push(U(T($('.q-en',el)),K($('.q-ko',el)))); }
        else if(c.contains('script')){ var sk=el.nextElementSibling&&el.nextElementSibling.classList.contains('script-ko')?K(el.nextElementSibling):'';
          var ls=scriptLines(el), kos=sk.split(/\s+\/\s+/); ls.forEach(function(x,i){ main.push(U(x.t, kos.length===ls.length?kos[i]:sk, null, null, x.spk?('spk:'+x.spk):'story')) }); }
        else if(c.contains('stress-line')) main.push(U(T($('[data-s]',el)),'',el,'ix'));
        else if(c.contains('pool')){ var chips=$$('.card-chip',el).map(function(b){return sq(b.textContent)}); var bins=$$('.bin-h',s).map(function(b){return latin(K(b))}).filter(Boolean);
          main.push(U('Sort these: '+chips.join(', ')+'.'+(bins.length?' Into '+bins.join(', or ')+'.':''), '')); }
        else if(el.tagName==='LI') main.push(U(T($('.en',el)),K($('.ko',el)),el,null));
      });
    }
    if(oa) lines(oa).forEach(function(l){ ans.push(U(l,'')) });
    else $$('.answer',s).forEach(function(a){ var e=T($('.a-en',a)); if(e) ans.push(U(e,K($('.a-ko',a)),a,null)) });
    function clean(list){ return list.filter(function(u){ if(!u.en) return false; if(IPA.test(u.en)){ warn.push(u.en); return false; } u.say=spoken(u.en); return !!u.say; }) }
    return {main:clean(main), ans:clean(ans), warn:warn};
  }
  var CACHE=new Map(); function units(s){ if(!CACHE.has(s)) CACHE.set(s,extract(s)); return CACHE.get(s); }

  /* ── 목소리 ── */
  var VO={list:[], lect:null, story:null, spk:{}};
  var PREF=['Andrew','Brian','Ava','Jenny','Aria','Emma','Guy','Michelle','Christopher','Eric','Google US English','Samantha','Alex'];
  function score(v){ var n=v.name, i=PREF.findIndex(function(p){return n.indexOf(p)>-1}); return (/(Natural|Online|Neural)/.test(n)?0:100)+(i<0?50:i); }
  function loadVoices(){ if(!SYN) return; var all=SYN.getVoices(); var vs=all.filter(function(v){return /^en[-_]US/i.test(v.lang)}); if(!vs.length) vs=all.filter(function(v){return /^en/i.test(v.lang)});
    vs.sort(function(a,b){return score(a)-score(b)}); VO.list=vs; VO.lect=vs.find(function(v){return /Andrew/.test(v.name)})||vs[0]||null;
    VO.story=vs.find(function(v){return /Jenny|Ava|Aria/.test(v.name)&&v!==VO.lect})||vs[1]||VO.lect; VO.spk={}; }
  if(SYN){ loadVoices(); if('onvoiceschanged' in SYN) SYN.onvoiceschanged=loadVoices; }
  function voiceFor(key){ if(key==='lect') return VO.lect; if(key==='story') return VO.story;
    var n=key.replace(/^spk:/,''); if(!VO.spk[n]){ var used=[VO.lect].concat(Object.keys(VO.spk).map(function(k){return VO.spk[k]}));
      VO.spk[n]=VO.list.find(function(v){return used.indexOf(v)<0})||VO.story; } return VO.spk[n]; }
  var GEN=0;
  function speak(text,key,gen){ return new Promise(function(res){
    if(!SYN||gen!==GEN){ res(); return; }
    var u=new SpeechSynthesisUtterance(text), v=voiceFor(key); if(v){u.voice=v;u.lang=v.lang;} else u.lang='en-US';
    u.rate=key==='lect'?0.92:0.95; var done=false, fin=function(){ if(!done){done=true; clearInterval(ka); res();} };
    u.onend=fin; u.onerror=fin; var ka=setInterval(function(){ if(gen!==GEN) fin(); else if(v&&!v.localService&&SYN.speaking&&!SYN.paused){SYN.pause();SYN.resume();} },9000);
    setTimeout(fin, 4000+text.split(' ').length*900); SYN.speak(u); }); }
  function hush(){ GEN++; if(SYN) SYN.cancel(); $$('.speaking').forEach(function(e){e.classList.remove('speaking')}); $$('.speaking-grp').forEach(function(e){e.classList.remove('speaking-grp')}); }
  function mark(u,on){ if(!u.el) return; u.el.classList.toggle('speaking',on); if(u.grp&&u.grp!=='ix'&&u.el.parentElement) u.el.parentElement.classList.toggle('speaking-grp',on); }
  async function sayUnit(u,gen,cap){ mark(u,true); if(cap) caption(u.en,u.ko);
    var ss=sentences(u.say); for(var i=0;i<ss.length;i++){ if(gen!==GEN) break; await speak(ss[i],u.voice,gen); }
    mark(u,false); if(gen===GEN) await sleep(u.voice==='lect'?350:700); }

  /* ── 낭독 알약 (자동 부착) ── */
  function pill(){ var b=document.createElement('button'); b.type='button'; b.className='nar'; b.title='이 슬라이드의 영어 낭독 (L)';
    b.innerHTML='<span class="nar-ic"></span><span class="nar-l">Listen</span><span class="nar-a">+ Answer</span><span class="nar-bar"></span>'; return b; }
  CONTENT.forEach(function(s){
    if(s.classList.contains('s-divider')||s.dataset.nar==='off'||$('.aud',s)) return;
    var b=pill();
    if(s.classList.contains('s-title')){ b.classList.add('light'); var bd=$('.badge',s); if(bd) bd.after(b); else ($('.inner',s)||s).appendChild(b); return; }
    var r=$(':scope > .rule',s);
    if(r){ var row=document.createElement('div'); row.className='rule-row'; r.parentNode.insertBefore(row,r); row.appendChild(r); row.appendChild(b); }
    else { b.classList.add('float'); s.appendChild(b); }
  });
  var NAR=null;  /* {btn, slide, phase, idx, gen, pend} */
  function revealed(s){ var a=$('.answer',s); return !!(a&&(a.classList.contains('on')||!a.classList.contains('st'))); }
  function setBar(b,f){ var bar=$('.nar-bar',b); if(bar) bar.style.width=(f*100)+'%'; }
  function narStop(keep){ if(!NAR) return; hush(); NAR.btn.classList.remove('playing','ans'); if(!keep){ setBar(NAR.btn,0); NAR=null; } }
  async function narRun(){ var st=NAR; if(!st) return; stopOthers('nar'); var gen=++GEN; st.gen=gen; st.btn.classList.add('playing'); var U2=units(st.slide);
    while(st===NAR&&gen===GEN){
      var list=st.phase==='main'?U2.main:U2.ans; st.btn.classList.toggle('ans',st.phase==='ans');
      if(st.idx<list.length){ setBar(st.btn,st.idx/Math.max(1,list.length)); await sayUnit(list[st.idx],gen,false); if(st===NAR&&gen===GEN) st.idx++; continue; }
      if(st.phase==='main'&&U2.ans.length){ if(revealed(st.slide)){ st.phase='ans'; st.idx=0; continue; } st.pend=true; st.btn.classList.remove('playing'); setBar(st.btn,1); return; }
      st.btn.classList.remove('playing','ans'); setBar(st.btn,0); NAR=null; return; } }
  function narToggle(b){ var s=b.closest('.slide');
    if(NAR&&NAR.btn===b){ if(b.classList.contains('playing')){ narStop(true); return; } if(NAR.pend){ NAR.pend=false; if(revealed(s)){NAR.phase='ans';NAR.idx=0;} else {NAR.phase='main';NAR.idx=0;} narRun(); return; } narRun(); return; }
    narStop(); NAR={btn:b,slide:s,phase:'main',idx:0}; narRun(); }
  new MutationObserver(function(ms){ ms.forEach(function(m){ var el=m.target; if(!el.classList.contains('on')||!NAR||!NAR.pend) return;
      if(NAR.slide.contains(el)&&NAR.slide.classList.contains('is-on')&&revealed(NAR.slide)){ NAR.pend=false; NAR.phase='ans'; NAR.idx=0; narRun(); } }); })
    .observe(deck,{attributes:true,subtree:true,attributeFilter:['class']});

  /* ── 듣기 바 ── */
  function fmt(x){ x=Math.max(0,Math.round(x||0)); return Math.floor(x/60)+':'+String(x%60).padStart(2,'0'); }
  var AUDS=$$('.aud',deck).map(function(box){
    var A={box:box, mode:'none', lines:[], idx:0, file:null, playing:false};
    var sc=$('script.aud-script',box); if(sc) A.lines=lines(sc).map(function(l){ var m=l.match(/^([A-Z][\w .'’-]{0,28}):\s+(.+)$/); return m?{spk:m[1],t:m[2]}:{spk:'',t:l} });
    box.insertAdjacentHTML('beforeend','<button class="aud-btn" type="button" title="듣기 재생/정지"></button><div class="aud-track"><div class="aud-fill"></div></div><span class="aud-l"></span>');
    var lab=box.dataset.label||'Listening', L=$('.aud-l',box);
    function label(){ var src=A.mode==='file'?(box.dataset.note?'<em>'+box.dataset.note+'</em>':'음원 파일')+' · '+fmt(A.file.duration):A.mode==='tts'?'<em>TTS 대체 음원 · 브라우저 음성</em> · '+A.lines.length+'줄':'<em>음원 없음</em>';
      L.innerHTML=lab+' · '+src; }
    A.setMode=function(m){ A.mode=m; label(); };
    A.setMode(A.lines.length?'tts':'none');
    if(box.dataset.src){ var f=new Audio(); f.preload='metadata'; f.src=box.dataset.src;
      f.addEventListener('loadedmetadata',function(){ A.file=f; A.setMode('file'); });
      f.addEventListener('timeupdate',function(){ if(A.mode==='file') $('.aud-fill',box).style.width=(f.currentTime/(f.duration||1)*100)+'%'; });
      f.addEventListener('ended',function(){ A.playing=false; box.classList.remove('playing'); if(A.onend) A.onend(); }); }
    A.play=async function(){ stopOthers(A); A.playing=true; box.classList.add('playing');
      if(A.mode==='file'){ try{ await A.file.play(); }catch(e){ A.playing=false; box.classList.remove('playing'); } return; }
      if(A.mode!=='tts'){ A.playing=false; box.classList.remove('playing'); if(A.onend) A.onend(); return; }
      var gen=++GEN; A.gen=gen;
      while(A.idx<A.lines.length&&gen===GEN&&A.playing){ $('.aud-fill',box).style.width=(A.idx/A.lines.length*100)+'%';
        var ln=A.lines[A.idx]; if(AUTO.on) caption(ln.spk?ln.spk+': '+ln.t:ln.t,''); var ss=sentences(spoken(ln.t)); for(var q=0;q<ss.length&&gen===GEN;q++) await speak(ss[q], ln.spk?'spk:'+ln.spk:'story', gen); if(gen!==GEN) return; A.idx++; await sleep(750); }
      if(gen===GEN&&A.idx>=A.lines.length){ A.idx=0; A.playing=false; box.classList.remove('playing'); $('.aud-fill',box).style.width='0'; if(A.onend) A.onend(); } };
    A.pause=function(){ var was=A.playing; A.playing=false; box.classList.remove('playing'); if(A.mode==='file'&&A.file) A.file.pause(); else if(was) hush(); };
    A.reset=function(){ A.pause(); A.idx=0; if(A.file) A.file.currentTime=0; $('.aud-fill',box).style.width='0'; };
    A.seek=function(fr){ if(A.mode==='file'&&A.file) A.file.currentTime=fr*(A.file.duration||0); else if(A.mode==='tts'){ var was=A.playing; A.pause(); A.idx=Math.min(A.lines.length-1,Math.floor(fr*A.lines.length)); $('.aud-fill',box).style.width=(A.idx/A.lines.length*100)+'%'; if(was) A.play(); } };
    box._A=A; return A; });

  /* ── 영상 슬라이드 ── */
  var VIDS=$$('.vwrap',deck).map(function(w){
    var V={w:w, caps:[], t:0, dur:0, playing:false, fake:false, cc:0, shown:null, live:false};
    try{ var j=$('script.vcaps',w); if(j) V.caps=JSON.parse(j.textContent); }catch(e){ V.err='자막 JSON 형식 오류: '+e.message; }
    V.caps.sort(function(a,b){return a.t-b.t}); var last={s:null,r:0,h:0};
    V.caps.forEach(function(c){ if(c.s!=null){ last={s:c.s,r:c.r?1:0,h:c.h||0}; } else if(c.r!=null||c.h!=null){ last={s:last.s,r:c.r!=null?(c.r?1:0):last.r,h:c.h!=null?c.h:last.h}; } c._v={s:last.s,r:last.r,h:last.h}; });
    var first=V.caps.find(function(c){return c._v.s!=null}); V.deck=!!first; if(first) V.caps.forEach(function(c){ if(c._v.s==null) c._v=first._v; });
    w.insertAdjacentHTML('beforeend','<div class="vmsg"></div><div class="vprint">'+K($('.h-title',w.closest('.slide')))+'<span style="font-size:13px;opacity:.7">영상은 덱 HTML에서 재생합니다</span></div>');
    var yt=w.dataset.youtube;
    if(yt){ w.insertAdjacentHTML('afterbegin','<iframe src="https://www.youtube-nocookie.com/embed/'+yt+'?cc_load_policy=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>'); V.yt=true; return V; }
    w.insertAdjacentHTML('afterbegin','<video playsinline preload="metadata"></video><div class="vdeck"></div><div class="vcap"><div class="ce"></div><div class="ck"></div></div><div class="vbar"><button class="vplay" type="button" title="재생/정지"></button><div class="vtrack"><div class="vfill"></div></div><span class="vtime">0:00</span><button class="vcc" type="button" title="자막 바꾸기">EN·KO</button></div>');
    if(V.deck) w.classList.add('deckmode');
    var v=$('video',w); V.v=v; V.capsEnd=V.caps.length?Math.max.apply(null,V.caps.map(function(c){return c.e||c.t+3})):0;
    function msg(t){ var m=$('.vmsg',w); m.textContent=t; m.classList.toggle('on',!!t); }
    if(V.err) msg(V.err);
    function goFake(){ if(V.fake) return; V.fake=true; V.dur=V.capsEnd; msg((V.err?V.err+' · ':'')+'영상 파일을 찾지 못했습니다'+(w.dataset.src?' ('+w.dataset.src+')':'')+' — 자막·화면만 미리 봅니다(소리 없음).'); w.classList.add('deckmode'); V.tick(); }
    if(w.dataset.src){ v.src=w.dataset.src; v.addEventListener('error',goFake); v.addEventListener('loadedmetadata',function(){ V.dur=v.duration; V.tick(); });
      v.addEventListener('timeupdate',function(){ V.t=v.currentTime; V.tick(); }); v.addEventListener('ended',function(){ V.playing=false; w.classList.remove('playing'); if(V.onend) V.onend(); }); }
    else setTimeout(goFake,0);
    var clock=null, t0=0;
    V.play=function(){ stopOthers(V); V.playing=true; w.classList.add('playing');
      if(V.fake){ t0=performance.now()-V.t*1000; clearInterval(clock); clock=setInterval(function(){ V.t=(performance.now()-t0)/1000; if(V.t>=V.dur){ V.t=V.dur; V.pause(); V.tick(); if(V.onend) V.onend(); return; } V.tick(); },100); }
      else v.play().catch(function(){ goFake(); V.play(); }); };
    V.pause=function(){ V.playing=false; w.classList.remove('playing'); clearInterval(clock); if(!V.fake) v.pause(); };
    V.seek=function(fr){ V.t=fr*(V.dur||0); if(!V.fake) v.currentTime=V.t; else if(V.playing) t0=performance.now()-V.t*1000; V.tick(); };
    V.reset=function(){ V.pause(); V.seek(0); };
    V.tick=function(){ $('.vfill',w).style.width=(V.dur?V.t/V.dur*100:0)+'%'; $('.vtime',w).textContent=fmt(V.t)+' / '+fmt(V.dur);
      var c=null; for(var i=0;i<V.caps.length;i++){ if(V.caps[i].t<=V.t+0.01) c=V.caps[i]; else break; }
      var on=c&&V.t<=(c.e!=null?c.e:c.t+6)+0.3, mode=['EN·KO','EN','KO','OFF'][V.cc];
      var box=$('.vcap',w); box.classList.toggle('on',!!on&&mode!=='OFF');
      if(on){ $('.ce',box).textContent=mode==='KO'?'':(c.en||''); $('.ck',box).textContent=mode==='EN'?'':(c.ko||''); }
      var vis=c?c._v:(V.caps[0]&&V.caps[0]._v); if(V.deck&&vis) screen(vis); };
    function screen(vis){ if(!V.live) return; var key=vis.s+'|'+vis.r+'|'+vis.h; if(V.shown===key) return; V.shown=key; var layer=$('.vdeck',w); layer.innerHTML=''; var c=cloneSlide(vis.s,vis.r,vis.h); if(c) layer.appendChild(c); }
    V.cycleCC=function(){ V.cc=(V.cc+1)%4; $('.vcc',w).textContent=['EN·KO','EN','KO','OFF'][V.cc]; V.tick(); };
    V.tick(); return V; });
  function goLive(){ VIDS.forEach(function(V){ V.live=true; V.shown=null; if(V.tick) V.tick(); }); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',goLive); else setTimeout(goLive,0);

  function cloneSlide(n,r,h){ var src=CONTENT[n-1]; if(!src) return null; var c=src.cloneNode(true);
    c.classList.remove('slide','is-on'); c.classList.add('slide-clone'); c.removeAttribute('id');
    $$('.notes-src,.nar,script,.aud .aud-btn,.aud .aud-track',c).forEach(function(x){x.remove()});
    $$('.st',c).forEach(function(e){ e.classList.remove('st'); if(!r) e.classList.add('vh'); else e.classList.add('on'); });
    $$('.fb',c).forEach(function(e){e.textContent=''}); $$('.ix',c).forEach(function(ix){ ix._done=true; });
    if(r){ $$('.ix .row[data-a]',c).forEach(function(row){ var a=sq(row.dataset.a).toLowerCase(), inp=$('input.gap',row);
        if(inp){ inp.value=row.dataset.a; inp.setAttribute('value',row.dataset.a); inp.classList.add('ok'); }
        $$('.opt',row).forEach(function(o){ if(sq(o.textContent).toLowerCase()===a) o.classList.add('sel','ok'); }); });
      $$('.ix [data-s]',c).forEach(function(sp){ var t=sp.dataset.s.toLowerCase().split(/\s+/); $$('.w',sp).forEach(function(w){ if(t.indexOf(w.dataset.b)>-1) w.classList.add('hit'); }); });
      $$('.ix',c).forEach(function(ix){ $$('.card-chip[data-bin]',ix).forEach(function(ch){ var b=$('.bin[data-bin="'+ch.dataset.bin+'"] .pool',ix); if(b){ b.appendChild(ch); ch.classList.add('ok'); } }); }); }
    else $$('input.gap',c).forEach(function(i){ i.value=''; i.removeAttribute('value'); });
    if(h){ var grps=['.cards','.rows','.pairs-n','.cols > div:first-child','.chips','.flow','table.cmp tbody','table.cmp'];
      for(var i=0;i<grps.length;i++){ var g=$(grps[i],c); if(!g) continue; var kids=[].slice.call(g.children).filter(function(k){return !k.classList.contains('col-h')&&k.tagName!=='TR'||($('td',k))});
        if(g.tagName==='TABLE'||g.tagName==='TBODY'){ kids=$$('tr',g).filter(function(tr){return $('td',tr)}); }
        if(kids[h-1]){ g.classList.add('hlg'); kids.forEach(function(k){ if(k.tagName==='TR') k.parentElement.classList.add('hlg'); }); kids[h-1].classList.add('hl-on'); } break; } }
    var W=974; c.style.transform='scale('+(W/1280)+')'; return c; }

  /* ── 하나가 울리면 나머지는 멈춘다 ── */
  function stopOthers(keep){ if(keep!=='nar'&&NAR) narStop(); AUDS.forEach(function(A){ if(A!==keep&&A.playing) A.pause(); }); VIDS.forEach(function(V){ if(V!==keep&&V.playing&&V.pause) V.pause(); }); }

  /* ── 클릭: 덱의 넘김·채점보다 먼저 받는다 ── */
  document.addEventListener('click',function(e){ var t=e.target; if(!t||!t.closest) return;
    var b=t.closest('.nar'); if(b){ e.stopImmediatePropagation(); e.preventDefault(); narToggle(b); return; }
    var ab=t.closest('.aud'); if(ab){ e.stopImmediatePropagation(); e.preventDefault(); var A=ab._A; if(!A) return;
      var tr=t.closest('.aud-track'); if(tr){ var r=tr.getBoundingClientRect(); A.seek((e.clientX-r.left)/r.width); return; }
      if(A.playing) A.pause(); else A.play(); return; }
    var vw=t.closest('.vwrap'); if(vw){ e.stopImmediatePropagation(); var V=VIDS.find(function(x){return x.w===vw}); if(!V||V.yt) return; e.preventDefault();
      var tk=t.closest('.vtrack'); if(tk){ var rr=tk.getBoundingClientRect(); V.seek((e.clientX-rr.left)/rr.width); return; }
      if(t.closest('.vcc')){ V.cycleCC(); return; }
      if(V.playing) V.pause(); else V.play(); } },true);

  /* ── 슬라이드를 떠나면 멈추고 처음으로 ── */
  new MutationObserver(function(ms){ ms.forEach(function(m){ var s=m.target; if(!s.classList||!s.classList.contains('slide')) return;
      if(!s.classList.contains('is-on')){ if(NAR&&NAR.slide===s) narStop(); AUDS.forEach(function(A){ if(s.contains(A.box)) A.reset(); }); VIDS.forEach(function(V){ if(s.contains(V.w)&&V.reset) V.reset(); }); }
      else if(AUTO.on&&AUTO.slide!==s) runSlide(s); }); })
    .observe(deck,{attributes:true,subtree:true,attributeFilter:['class']});

  /* ── 자동 강의 모드 (A): 낭독 → 연습 멈춤 → 정답 → 다음 슬라이드. 화면 녹화하면 강의 영상이 된다 ── */
  var AUTO={on:false,slide:null,tok:0};
  var capbar=document.createElement('div'); capbar.id='capbar'; capbar.innerHTML='<div class="ce"></div><div class="ck"></div>'; document.body.appendChild(capbar);
  function caption(en,ko,cls){ capbar.className=(cls||'')+((en||'').length>110||(ko||'').length>60?' long':''); $('.ce',capbar).textContent=en||''; $('.ck',capbar).textContent=ko||''; }
  function fitRec(){ var ch=Math.round(innerHeight*0.12); document.documentElement.style.setProperty('--capH',ch+'px'); document.documentElement.style.setProperty('--recs',Math.min(innerWidth/1280,(innerHeight-ch)/720)); }
  addEventListener('resize',function(){ if(AUTO.on) fitRec(); });
  function press(){ document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true,cancelable:true})); }
  function pendingSt(s){ var ix=$('.ix',s); return (ix&&!ix._done)||!!$('.st:not(.on)',s); }
  async function runSlide(s){ var tok=++AUTO.tok; AUTO.slide=s; narStop(); stopOthers(null); hush(); caption('','');
    var alive=function(){return AUTO.on&&tok===AUTO.tok};
    await sleep(500); if(!alive()) return;
    if(s.classList.contains('s-divider')){ caption([K($('.of',s)),K($('h2',s))].filter(Boolean).join(' · '),K($('.d-ko',s))); await sleep(3500); }
    else if(s.classList.contains('vslide')){ var V=VIDS.find(function(x){return s.contains(x.w)});
      if(V&&!V.yt){ caption('',''); capbar.className='blank'; await new Promise(function(res){ V.onend=function(){V.onend=null;res();}; V.reset(); V.play(); var chk=setInterval(function(){ if(!alive()){clearInterval(chk);V.pause();res();} },300); }); }
      else await sleep(3000); }
    else { var u=units(s), gen, A=AUDS.find(function(x){return s.contains(x.box)});
      var mains=A?u.main.filter(function(x){return x.voice==='lect'}):u.main;   /* 듣기 바가 들려주는 대본은 두 번 읽지 않는다 */
      for(var i=0;i<mains.length&&alive();i++){ gen=GEN; await sayUnit(mains[i],gen,true); }
      if(A&&alive()){ await new Promise(function(res){ A.onend=function(){A.onend=null;res();}; A.reset(); A.play(); var chk=setInterval(function(){ if(!alive()){clearInterval(chk);A.pause();res();} },300); }); }
      if($('.ix',s)&&alive()){ caption('Pause the video and try.','영상을 멈추고 풀어 보세요.','pause'); await sleep(6000); if(alive()) fillAnswers(s); }
      var guard=0; while(pendingSt(s)&&alive()&&guard++<12){ press(); await sleep(450); }
      if(alive()&&revealed(s)) for(var k=0;k<u.ans.length&&alive();k++){ gen=GEN; await sayUnit(u.ans[k],gen,true); } }
    if(!alive()) return; await sleep(600); if(!alive()) return;
    var before=cur(), g2=0; while(cur()===before&&g2++<12){ press(); await sleep(120); }
    if(cur()===before&&alive()){ caption('— End of the lecture —','강의 끝'); setTimeout(autoStop,2500); } }
  function fillAnswers(s){ /* 자동 강의에서는 정답을 채운 뒤 채점해 '정답 공개' 화면을 만든다 */
    $$('.ix',s).forEach(function(ix){ if(ix._done) return;
      $$('.row[data-a]',ix).forEach(function(row){ var a=sq(row.dataset.a).toLowerCase(), inp=$('input.gap',row); if(inp) inp.value=row.dataset.a;
        $$('.opt',row).forEach(function(o){ o.classList.toggle('sel',sq(o.textContent).toLowerCase()===a); }); });
      $$('[data-s]',ix).forEach(function(sp){ var t=sp.dataset.s.toLowerCase().split(/\s+/); $$('.w',sp).forEach(function(w){ w.classList.toggle('on',t.indexOf(w.dataset.b)>-1); }); });
      $$('.card-chip[data-bin]',ix).forEach(function(ch){ var b=$('.bin[data-bin="'+ch.dataset.bin+'"] .pool',ix); if(b) b.appendChild(ch); }); }); }
  function autoStart(){ if(AUTO.on) return; AUTO.on=true; document.body.classList.add('rec'); fitRec(); runSlide(cur()); }
  function autoStop(){ AUTO.on=false; AUTO.tok++; hush(); stopOthers(null); document.body.classList.remove('rec'); caption('',''); }

  /* ── 낭독 대본 내려받기 (T) ── */
  function transcript(){ var out=['낭독 대본 — '+document.title,'(화면의 영어를 그대로 읽는다. 섹션 표지는 읽지 않는다. 130 wpm 기준)',''], tw=0;
    SLIDES.forEach(function(s,i){ var h=K($('.h-title,h1,h2',s)), head='Slide '+(i+1)+' · '+h;
      if(s.classList.contains('vslide')){ out.push(head,'  [영상 슬라이드]',''); return; }
      if(s.classList.contains('s-divider')){ out.push(head,'  [섹션 표지 — 낭독 없음]',''); return; }
      var u=units(s), w=0; out.push(head);
      u.main.forEach(function(x){ out.push('  '+(x.voice.indexOf('spk:')===0?x.voice.slice(4)+': ':'')+x.say); w+=x.say.split(' ').length; });
      if(u.ans.length){ out.push('  [정답 — 상자를 연 뒤]'); u.ans.forEach(function(x){ out.push('  '+x.say); w+=x.say.split(' ').length; }); }
      var A=AUDS.find(function(x){return s.contains(x.box)}); if(A){ out.push('  [듣기 바] '+(A.box.dataset.label||'')+' · '+A.mode); A.lines.forEach(function(l){ out.push('    '+(l.spk?l.spk+': ':'')+l.t); w+=l.t.split(' ').length; }); }
      u.warn.forEach(function(x){ out.push('  !! IPA 포함 → 건너뜀(say-src로 말로 풀어 쓸 것): '+x); });
      tw+=w; out.push('  — '+w+' words · '+fmt(w/130*60),''); });
    out.push('합계 '+tw+' words · 약 '+fmt(tw/130*60)); return out.join('\r\n'); }
  function download(name,text){ var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob(['﻿'+text],{type:'text/plain;charset=utf-8'})); a.download=name; document.body.appendChild(a); a.click(); setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},1000); }

  /* ── 키 ── */
  addEventListener('keydown',function(e){ var tg=e.target&&e.target.tagName; if(tg==='INPUT'||tg==='TEXTAREA') return;
    var s=cur(), k=e.key;
    if(k==='Escape'&&AUTO.on){ autoStop(); e.preventDefault(); return; }
    if(!e.isTrusted) return;
    if(k==='l'||k==='L'){ var b=s&&$('.nar',s), A=s&&AUDS.find(function(x){return s.contains(x.box)}), V=s&&VIDS.find(function(x){return s.contains(x.w)});
      if(b) narToggle(b); else if(A){ A.playing?A.pause():A.play(); } else if(V&&!V.yt){ V.playing?V.pause():V.play(); }
      e.preventDefault(); e.stopImmediatePropagation(); return; }
    if(k===' '&&s&&s.classList.contains('vslide')){ var V2=VIDS.find(function(x){return s.contains(x.w)}); if(V2&&!V2.yt){ V2.playing?V2.pause():V2.play(); e.preventDefault(); e.stopImmediatePropagation(); return; } }
    if(k==='a'||k==='A'){ AUTO.on?autoStop():autoStart(); e.preventDefault(); return; }
    if(k==='t'||k==='T'){ download((document.title||'deck').replace(/[\\/:*?"<>|]/g,'_')+'_낭독대본.txt',transcript()); e.preventDefault(); return; }
  },true);

  /* ── C 점검에 덧붙일 항목 ── */
  window.__mediaCheck=function(){ var multi=[], ipa=[], vbad=[];
    SLIDES.forEach(function(s,i){ var n=$$('.aud',s).length+$$('.nar',s).length+$$('.vwrap',s).length; if(n>1) multi.push(i+1); if(units(s).warn.length) ipa.push(i+1); });
    VIDS.forEach(function(V){ var n=SLIDES.indexOf(V.w.closest('.slide'))+1; if(V.err) vbad.push(n+'(JSON)'); V.caps.forEach(function(c){ if(c._v&&c._v.s!=null&&!CONTENT[c._v.s-1]) vbad.push(n+'(s='+c._v.s+')'); }); });
    return [['소리 컨트롤 2개 이상',multi],['IPA 포함 — say-src 필요',ipa],['영상 자막 오류',vbad]]; };
  window.__media={units:units,transcript:transcript,auto:AUTO,start:autoStart,stop:autoStop,vids:VIDS,auds:AUDS,nar:function(){return NAR}};
})();

  /* ── E 키: 키트를 합친 한 파일(…_LMS.html)로 내보내기 — JNUclass 업로드용 ── */
  addEventListener('keydown',function(e){ var tg=e.target&&e.target.tagName; if(tg==='INPUT'||tg==='TEXTAREA'||!e.isTrusted) return;
    if(e.key!=='e'&&e.key!=='E') return; e.preventDefault();
    var esc=function(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;')};
    var src=window.__kitSource.replace(/<\/script/gi,'<\\/script');
    var html='<!DOCTYPE html>\n<html lang="ko">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>'+esc(document.title)+'</title>\n</head>\n<body data-course="'+esc(document.body.dataset.course||'erw1')+'">\n<div id="deck">'+ORIGINAL+'</div>\n<script>'+src+'</'+'script>\n</body>\n</html>\n';
    var name=(document.title||'deck').replace(/[\\/:*?"<>|]/g,'_').replace(/\s+/g,' ').trim()+'_LMS.html';
    var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'})); a.download=name; document.body.appendChild(a); a.click();
    setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},1500); });
  window.__kitSource='('+KIT.toString()+')();';
})();
