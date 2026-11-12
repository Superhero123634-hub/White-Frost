(function(){
  var html=document.documentElement,gate=document.getElementById("gate");
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function loadSite(){var s=document.createElement("script");s.src="script.js";document.body.appendChild(s)}
  if(!gate){html.classList.add("entered");loadSite();return}

  var parts=document.querySelectorAll("body > header, body > main, body > footer");
  parts.forEach(function(el){el.inert=true});
  function $(id){return document.getElementById(id)}
  function fmt(t){var n=Math.round(t);return (n>0?"+":n<0?"−":"")+Math.abs(n)+"°C"}

  /* starfield: slow drift while waiting, streaks while cooling */
  var cv=$("space"),ctx=cv.getContext("2d"),W=0,H=0,stars=[],speed=.0009,target=.0009,raf=0;
  function make(s,fresh){s.x=(Math.random()-.5)*2;s.y=(Math.random()-.5)*2;s.z=fresh?Math.random():1}
  function size(){
    var d=Math.min(2,window.devicePixelRatio||1);
    W=window.innerWidth;H=window.innerHeight;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
    stars=[];for(var i=0,n=Math.min(240,Math.round(W*H/5500));i<n;i++){var s={};make(s,true);stars.push(s)}
  }
  function frame(){
    ctx.clearRect(0,0,W,H);
    speed+=(target-speed)*.04;
    var cx=W/2,cy=H/2,k=Math.max(cx,cy)*.55;
    ctx.lineCap="round";
    for(var i=0;i<stars.length;i++){
      var s=stars[i],pz=s.z+speed*1.6;
      s.z-=speed;
      var sx=cx+s.x/s.z*k,sy=cy+s.y/s.z*k;
      if(s.z<=.02||sx<-20||sx>W+20||sy<-20||sy>H+20){make(s,false);continue}
      var px=cx+s.x/pz*k,py=cy+s.y/pz*k,a=(1-s.z);
      ctx.strokeStyle="rgba(205,232,246,"+(.12+a*.85).toFixed(2)+")";
      ctx.lineWidth=.4+a*1.5;
      ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(sx+.01,sy+.01);ctx.stroke();
    }
    raf=requestAnimationFrame(frame);
  }
  size();window.addEventListener("resize",size);
  if(reduce){frame();cancelAnimationFrame(raf);raf=0}else{raf=requestAnimationFrame(frame)}

  /* the question, then the button */
  var yeah=$("yeah"),started=false;
  setTimeout(function(){yeah.classList.add("on");try{yeah.focus({preventScroll:true})}catch(e){}},reduce?300:4300);

  /* cooling loader */
  function start(){
    if(started)return;started=true;
    gate.classList.add("loading");
    var deg=$("deg"),fill=$("fill"),status=$("status"),t0=performance.now(),dur=reduce?900:2900,fontsOk=false;
    if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){fontsOk=true})}else{fontsOk=true}
    setTimeout(function(){fontsOk=true},4500);
    (function tick(now){
      var p=Math.min(1,(now-t0)/dur),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
      deg.textContent=fmt(10-28*e);
      fill.style.transform="scaleX("+e+")";
      if(!reduce)target=.0009+e*e*.05;
      if(p<1)requestAnimationFrame(tick);
      else{status.textContent="Holding steady";(function wait(){fontsOk?open():setTimeout(wait,100)})()}
    })(performance.now());
  }

  /* doors open, site starts */
  function open(){
    target=.0009;
    setTimeout(function(){
      gate.classList.add("ready");
      setTimeout(function(){
        gate.classList.add("open");
        setTimeout(function(){
          html.classList.add("entered");
          parts.forEach(function(el){el.inert=false});
          window.scrollTo(0,0);
          loadSite();
        },350);
        setTimeout(function(){cancelAnimationFrame(raf);gate.remove()},2000);
      },500);
    },400);
  }

  yeah.addEventListener("click",start);
  $("skip").addEventListener("click",start);
})();
