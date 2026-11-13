:root{
  --paper:#f3f6f7; --ink:#12222b; --muted:#566b77; --rule:#c2d1d9; --signal:#0a6f8f; --tick:#7d939f; --chill-to:#d2e3ed;
  --deep:#0f1d25; --deep-ink:#e6eff3; --deep-rule:#2b414d;
  --panel:#ffffff; --panel-alt:#edf4f7; --surface:#dfeef5; --ink-soft:#294857; --shadow: rgba(9, 31, 40, 0.12);
  box-sizing:border-box; padding-top:env(safe-area-inset-top,0px); padding-bottom:env(safe-area-inset-bottom,0px);
  color-scheme: light dark;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --paper:#0c171e; --ink:#e6eff3; --muted:#8fa4b0; --rule:#253945; --signal:#6fc0dc; --tick:#4a6270; --chill-to:#12303f; --deep:#050d12;
  --panel:#101d27; --panel-alt:#122833; --surface:#15313d; --ink-soft:#cfe8f1; --shadow: rgba(2, 8, 12, 0.52);
}}
:root[data-theme="dark"]{--paper:#0c171e;--ink:#e6eff3;--muted:#8fa4b0;--rule:#253945;--signal:#6fc0dc;--tick:#4a6270;--chill-to:#12303f;--deep:#050d12;--panel:#101d27;--panel-alt:#122833;--surface:#15313d;--ink-soft:#cfe8f1;--shadow: rgba(2, 8, 12, 0.52);}
html{scroll-padding-top:calc(72px + env(safe-area-inset-top,0px));scroll-behavior:smooth}
*,*::before,*::after{box-sizing:border-box}
body{--chill:0;--bg:var(--paper);background:var(--bg);color:var(--ink);font:400 15px/1.6 "Archivo",system-ui,sans-serif;font-stretch:100%;-webkit-font-smoothing:antialiased}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);background:var(--bg);z-index:20}
h1,h2,h3{margin:0;font-weight:400}
h1,h2{font-family:"Newsreader",Georgia,serif;letter-spacing:-.015em;line-height:1.08}
a{color:inherit}
:focus-visible{outline:2px solid var(--signal);outline-offset:3px}

.top{position:sticky;top:env(safe-area-inset-top,0px);z-index:10;display:flex;justify-content:space-between;align-items:center;gap:18px;height:72px;padding:0 max(22px,calc((100% - 1100px)/2));background:rgba(243,246,247,.82);backdrop-filter:blur(10px);border-bottom:1px solid rgba(194,209,217,.7)}
@media (prefers-color-scheme:dark){.top{background:rgba(12,23,30,.76)}}
:root[data-theme="dark"] .top{background:rgba(12,23,30,.76)}
.mark{display:flex;align-items:center;gap:10px;font-weight:700;font-size:15px;text-decoration:none;letter-spacing:.04em;color:var(--ink)}
.right{display:flex;align-items:center;gap:18px}
.reading{min-width:52px;text-align:right;font:600 12px "Archivo",sans-serif;font-variant-numeric:tabular-nums;color:var(--signal)}
.top nav{display:flex;align-items:center;gap:20px;font-size:13px;color:var(--muted)}
.top nav a{text-decoration:none;background:linear-gradient(currentColor,currentColor) no-repeat 0 100%/0 1px;transition:background-size .3s,color .2s,padding .2s;padding-bottom:2px}
.top nav a:hover,.top nav a:focus-visible{color:var(--ink);background-size:100% 1px}
.progress{position:absolute;left:0;bottom:-1px;height:2px;width:100%;background:var(--signal);transform:scaleX(0);transform-origin:left}
.btn{position:relative;z-index:0;overflow:hidden;display:inline-block;background:var(--ink);color:var(--paper);border:1px solid var(--ink);padding:12px 22px;border-radius:999px;font:600 13px "Archivo",sans-serif;letter-spacing:.02em;text-decoration:none;transition:transform .18s ease,background .2s ease,color .2s ease,border-color .2s ease;box-shadow:0 12px 30px rgba(18,34,43,.12)}
.btn::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--signal);transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.2,.7,.2,1)}
.btn:hover,.btn:focus-visible{color:#fff;border-color:var(--signal);transform:translateY(-1px)}
.btn:hover::before,.btn:focus-visible::before{transform:scaleX(1)}
.btn.light{background:var(--deep-ink);color:var(--deep);border-color:var(--deep-ink)}
.btn.mini{padding:9px 14px;border-radius:999px;font-size:12px;white-space:nowrap}
.plain{font-size:13px;color:var(--muted);text-decoration:none;transition:color .2s ease}
.plain:hover,.plain:focus-visible{color:var(--ink)}

.hero,.block,.cold .inner{max-width:1100px;margin:0 auto;padding-left:22px;padding-right:22px}
.hero{display:grid;grid-template-columns:1.08fr .92fr;align-items:center;gap:44px;padding-top:88px;padding-bottom:64px}
.hero h1{font-size:clamp(42px,7vw,84px)}
.ln{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}
.ln>span{display:block;transform:translateY(108%);animation:rise 1.1s cubic-bezier(.2,.7,.2,1) forwards}
.ln:nth-child(2)>span{animation-delay:.12s}.ln:nth-child(3)>span{animation-delay:.24s}
@keyframes rise{to{transform:none}}
.intro{opacity:0;animation:show .8s ease .8s forwards}
@keyframes show{to{opacity:1}}
.hero p{color:var(--muted);max-width:44ch;margin:22px 0 28px}
.actions{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.eyebrow{display:inline-block;padding:7px 12px;border:1px solid var(--rule);border-radius:999px;color:var(--muted);font:600 11px "Archivo",sans-serif;letter-spacing:.14em;text-transform:uppercase;background:rgba(255,255,255,.28)}
.hero-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:28px}
.metric{padding:16px 18px;border:1px solid var(--rule);border-radius:18px;background:linear-gradient(180deg,var(--panel),var(--panel-alt));box-shadow:0 18px 42px rgba(11,27,34,.05)}
.metric strong{display:block;font-size:clamp(18px,2vw,26px);font-family:"Newsreader",Georgia,serif;line-height:1.1;color:var(--ink)}
.metric span{display:block;margin-top:6px;color:var(--muted);font-size:12px;line-height:1.5}

.hero-visual{position:relative;display:flex;align-items:center;justify-content:center;min-height:420px;perspective:1200px}
.visual-stage{--tilt-x:0deg;--tilt-y:0deg;position:relative;width:min(100%,460px);height:420px;transform-style:preserve-3d;transform:rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) translateY(-8px);animation:floatStage 9s ease-in-out infinite alternate;transition:transform .2s ease}
@keyframes floatStage{0%{transform:rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) translateY(-10px)}100%{transform:rotateX(calc(var(--tilt-x) + 3deg)) rotateY(calc(var(--tilt-y) - 5deg)) translateY(6px)}}
.visual-glow{position:absolute;inset:18% 10% auto 8%;height:58%;background:radial-gradient(circle at 50% 30%, rgba(111,192,220,.5), rgba(111,192,220,0) 65%);filter:blur(12px);transform:translateZ(20px)}
.cold-room{position:absolute;left:50%;top:50%;width:300px;height:220px;transform:translate(-50%,-50%) rotateX(12deg) rotateY(-18deg) translateZ(40px)}
.room-panel{position:absolute;border:1px solid rgba(111,192,220,.45);background:linear-gradient(160deg, rgba(197,227,242,.7), rgba(112,159,183,.18));box-shadow:inset 0 0 0 1px rgba(255,255,255,.28)}
.room-panel.front{inset:20px 10px 10px 10px;border-radius:22px;transform:translateZ(38px)}
.room-panel.side{inset:28px 0 18px auto;width:72px;border-radius:18px;transform:translateX(92px) rotateY(80deg);background:linear-gradient(160deg, rgba(162,197,213,.9), rgba(90,128,145,.25))}
.room-panel.roof{left:30px;right:48px;top:0;height:60px;border-radius:18px 18px 10px 10px;transform:rotateX(70deg) translateZ(20px)}
.room-doors{position:absolute;inset:44px 20px 26px 20px;display:grid;grid-template-columns:1fr 1fr;gap:8px;transform:translateZ(56px)}
.room-doors span{display:block;border-radius:14px;background:linear-gradient(180deg, rgba(23,49,62,.48), rgba(17,32,41,.75));border:1px solid rgba(126,172,197,.66);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}
.room-window{position:absolute;right:52px;bottom:24px;width:86px;height:68px;border-radius:16px;border:1px solid rgba(126,172,197,.8);background:linear-gradient(180deg, rgba(188,229,248,.9), rgba(103,139,161,.42));transform:translateZ(64px) rotateY(-18deg)}
.floating-card{position:absolute;display:grid;gap:4px;padding:12px 14px;border:1px solid rgba(111,192,220,.4);border-radius:14px;background:rgba(255,255,255,.68);backdrop-filter:blur(6px);box-shadow:0 24px 40px rgba(9,31,40,.12);transform-style:preserve-3d}
.card-one{right:14px;top:34px;transform:translateZ(90px) rotateY(-16deg)}
.card-two{left:18px;bottom:42px;transform:translateZ(110px) rotateY(12deg)}
.card-label{color:var(--muted);font-size:10px;letter-spacing:.16em;text-transform:uppercase}
.floating-card strong{font-size:24px;line-height:1;font-family:"Newsreader",Georgia,serif}
.floating-orbit{position:absolute;border:1px solid rgba(111,192,220,.45);border-radius:50%}
.orbit-a{inset:54px auto auto 28px;width:120px;height:120px;transform:translateZ(10px) rotateX(60deg)}
.orbit-b{right:32px;bottom:36px;width:150px;height:150px;transform:translateZ(8px) rotateY(70deg)}

.block{padding-top:72px;padding-bottom:72px;border-top:1px solid var(--rule)}
.block h2,.cold h2{font-size:clamp(30px,4vw,42px)}
.lead{color:var(--muted);max-width:56ch;margin:12px 0 0}
.rows{list-style:none;margin:36px 0 0;padding:0;border-bottom:1px solid var(--rule)}
.rows li{position:relative;display:grid;grid-template-columns:220px 1fr auto;gap:24px;align-items:baseline;padding:18px 0}
.rows li::before,.rows li::after{content:"";position:absolute;left:0;right:0;top:0;height:1px;transform-origin:left}
.rows li::before{background:var(--rule);transition:transform .9s cubic-bezier(.2,.7,.2,1) var(--d,0ms)}
.rows li::after{background:var(--signal);height:2px;top:-.5px;transform:scaleX(0);transition:transform .45s cubic-bezier(.2,.7,.2,1)}
.js .rows li:not(.in)::before{transform:scaleX(0)}
.js .rows li>*{transition:opacity .7s ease calc(var(--d,0ms) + 250ms)}
.js .rows li:not(.in)>*{opacity:0}
.rows h3{font-weight:600;font-stretch:108%;font-size:15px;transition:transform .35s cubic-bezier(.2,.7,.2,1)}
.rows p{margin:0;color:var(--muted);font-size:14px}
.rows a.enq{display:inline-block;font:600 13px "Archivo",sans-serif;color:var(--signal);padding:4px 0;text-decoration:underline;text-underline-offset:4px}
@media(hover:hover){.rows li:hover::after{transform:scaleX(1)}.rows li:hover h3{transform:translateX(8px)}}

footer{padding:34px max(22px,calc((100% - 1100px)/2)) 26px;border-top:1px solid var(--rule);background:linear-gradient(180deg, rgba(0,0,0,0), rgba(111,192,220,.04));}
.footer-inner{display:grid;grid-template-columns:1.3fr .9fr .6fr;gap:28px;max-width:1100px;margin:0 auto}
.footer-inner strong{display:block;font-size:20px;margin-bottom:10px}
.footer-inner p{margin:0;color:var(--muted);max-width:34ch}
.footer-inner a, .footer-inner span{display:block;margin-bottom:8px;color:var(--muted);text-decoration:none}
.footer-inner a:hover,.footer-inner a:focus-visible{color:var(--ink)}
.footer-bottom{max-width:1100px;margin:18px auto 0;padding-top:18px;border-top:1px solid var(--rule);font-size:12px;color:var(--muted)}

.fab{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:8;display:flex;align-items:center;gap:9px;padding:12px 18px;background:var(--ink);color:var(--paper);border-radius:999px;font:600 13px "Archivo",sans-serif;text-decoration:none;opacity:0;transform:translateY(12px);transition:opacity .6s ease .9s,transform .6s cubic-bezier(.2,.7,.2,1) .9s,background .3s,color .3s}
html.entered .fab,html:not(.js) .fab{opacity:1;transform:none}
.fab:hover{background:var(--signal);color:#fff}
.fab svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linejoin:round}
.fab svg .h{fill:currentColor;stroke:none}
.has-fab footer{padding-bottom:88px}
@media(prefers-reduced-motion:reduce){.ln>span,.intro,.visual-stage,.fab{animation:none;transition:none}.hero-visual{transform:none}}

@media(max-width:900px){
  .hero{grid-template-columns:1fr;padding-top:68px}
  .hero-copy{order:1}
  .hero-visual{order:2;min-height:360px}
  .top{height:68px}
  .right{gap:10px}
  .top nav{gap:12px}
  .btn.mini{display:none}
}
@media(max-width:720px){
  .hero,.block,.cold .inner{padding-left:16px;padding-right:16px}
  .right{gap:8px}
  .top nav{gap:10px;font-size:12px}
  .rows li{grid-template-columns:1fr auto;gap:4px 16px}
  .rows p{grid-column:1/2;grid-row:2}
  .rows a.enq{grid-column:2;grid-row:1/3;align-self:center}
  .footer-inner{grid-template-columns:1fr;gap:18px}
}
@media(max-width:520px){
  .reading{display:none}
  .top nav{gap:6px; font-size:11px}
  .hero-metrics{grid-template-columns:1fr;}
  .visual-stage{height:340px}
  .cold-room{width:240px;height:180px}
  .floating-card strong{font-size:20px}
}

/* multi-page additions */
.block h1{font-size:clamp(34px,6vw,56px)}
.block.first{border-top:0}
.top nav a[aria-current="page"]{color:var(--ink);background-size:100% 1px}
@media(max-width:720px){.rows a.enq{grid-column:2;grid-row:1/3;align-self:center}}
@media(max-width:520px){.reading{display:none}.top nav{gap:12px;font-size:12px}}
.logo{width:22px;height:22px;flex:none;color:var(--ink);--logo-accent:var(--signal)}

html.js:not(.entered){overflow:hidden}
html.js:not(.entered) .ln>span,html.js:not(.entered) .hero .intro{animation:none}
html:not(.js) .shut{display:none}
.shut{position:fixed;inset:0;z-index:90;color:#eaf5fa;font-family:"Archivo",system-ui,sans-serif}
.shut:not(.open){pointer-events:auto}
.shut:is(.open){pointer-events:none}
.shut .door{position:absolute;top:0;bottom:0;width:50.3%;background:#020406;transition:transform .85s cubic-bezier(.77,0,.18,1)}
.shut .door.l{left:0;box-shadow:inset -1px 0 0 rgba(127,208,238,.55)}
.shut .door.r{right:0;box-shadow:inset 1px 0 0 rgba(127,208,238,.55)}
.shut.open .door.l{transform:translateX(-101%)}
.shut.open .door.r{transform:translateX(101%)}
.shut .mid{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;transition:opacity .35s ease}
.shut.open .mid{opacity:0}
.shut .mid svg{width:76px;height:76px;color:#eaf5fa;--logo-accent:#7fd0ee;stroke-dasharray:1;stroke-dashoffset:1;animation:draw 1.1s cubic-bezier(.2,.7,.2,1) .1s forwards;filter:drop-shadow(0 0 12px rgba(127,208,238,.3))}
.shut .mid p{margin:0;font:400 clamp(26px,5vw,38px)/1 "Newsreader",Georgia,serif;letter-spacing:.02em}
@keyframes draw{to{stroke-dashoffset:0}}
@media(prefers-reduced-motion:reduce){.shut .mid svg{animation:none;stroke-dashoffset:0}.fab{transition:none}}
