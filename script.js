(function(){
  var TO="hariomrefgim@gmail.com";
  var root=document.documentElement;
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sel=document.getElementById("product");
  var send=document.getElementById("send");

  /* enquiry: opens the visitor's mail app with the email written */
  function openMail(product,name,phone,details){
    var subject="Enquiry for "+product+" – White Frost";
    var body="Hello White Frost,\n\nI would like to enquire about: "+product+".\n"+
      (details?"\nDetails:\n"+details+"\n":"")+
      "\nPlease share availability and price.\n\nRegards,\n"+(name||"")+(phone?"\nPhone: "+phone:"");
    window.location.href="mailto:"+TO+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
  }
  document.querySelectorAll("[data-product]").forEach(function(el){
    el.addEventListener("click",function(e){
      var p=el.getAttribute("data-product");
      for(var i=0;i<sel.options.length;i++){if(sel.options[i].text===p){sel.selectedIndex=i}}
      if(el.tagName==="BUTTON"){e.preventDefault();document.getElementById("contact").scrollIntoView({behavior:"smooth"});setTimeout(function(){document.getElementById("name").focus({preventScroll:true})},500)}
    });
  });
  document.getElementById("enq").addEventListener("submit",function(e){
    e.preventDefault();
    send.textContent="Opening your email…";
    setTimeout(function(){send.textContent="Enquire"},4000);
    openMail(sel.value,document.getElementById("name").value.trim(),document.getElementById("phone").value.trim(),document.getElementById("msg").value.trim());
  });

  function fmt(t){var n=Math.round(t);return (n>0?"+":n<0?"−":"")+Math.abs(n)+"°C"}
  function ease(p){return 1-Math.pow(1-p,4)}

  /* hero ruler: marker cools from +10 to -18 and lights the scale behind it */
  var scale=document.getElementById("scale"),marker=document.getElementById("marker"),mtemp=document.getElementById("mtemp"),ticks=[];
  for(var k=0;k<=50;k++){var i=document.createElement("i");if(k%10===0)i.className="M";scale.appendChild(i);ticks.push(i)}
  var ruler=marker.parentNode;
  function setT(t){
    ruler.style.setProperty("--x",((t+40)/50*100)+"%");
    mtemp.textContent=fmt(t);
    for(var j=0;j<ticks.length;j++){ticks[j].classList.toggle("on",(-40+j)>=t)}
  }
  if(reduce){setT(-18)}
  else{
    setT(10);
    setTimeout(function(){
      var s=null,dur=2800;
      (function step(ts){
        if(s===null)s=ts;
        var p=Math.min(1,(ts-s)/dur);
        setT(10+(-28)*ease(p));
        if(p<1)requestAnimationFrame(step);
      })(performance.now());
    },500);
  }

  /* scroll: header reading falls from +10 to -40, page turns slightly colder, progress line */
  var reading=document.getElementById("reading"),prog=document.getElementById("progress"),busy=false;
  function onScroll(){
    if(busy)return;busy=true;
    requestAnimationFrame(function(){
      var h=root.scrollHeight-window.innerHeight;
      var p=h>0?Math.min(1,Math.max(0,window.scrollY/h)):0;
      document.body.style.setProperty("--chill",p.toFixed(3));
      prog.style.transform="scaleX("+p+")";
      reading.textContent=fmt(10-50*p);
      busy=false;
    });
  }
  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("resize",onScroll);
  onScroll();

  /* cold room table: numbers count up to their temperature when seen */
  var table=document.getElementById("temps"),nums=[];
  table.querySelectorAll("td:first-child").forEach(function(td){
    td.innerHTML=td.textContent.replace(/([+−-]?)(\d+)/g,function(m,sg,v){return '<span class="num" data-s="'+sg+'" data-v="'+v+'">'+sg+(reduce?v:0)+'</span>'});
  });
  nums=table.querySelectorAll(".num");
  function countUp(){
    if(reduce)return;
    var s=null,dur=1500;
    (function step(ts){
      if(s===null)s=ts;
      var p=ease(Math.min(1,(ts-s)/dur));
      nums.forEach(function(n){n.textContent=n.getAttribute("data-s")+Math.round(+n.getAttribute("data-v")*p)});
      if(p<1||ts-s<dur)requestAnimationFrame(step);
    })(performance.now());
  }

  /* reveal: product rules draw in one after another */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      e.target.classList.add("in");
      if(e.target===table)countUp();
      io.unobserve(e.target);
    });
  },{threshold:.3});
  document.querySelectorAll(".rows li").forEach(function(li,n){li.style.setProperty("--d",(n%6)*90+"ms");io.observe(li)});
  io.observe(table);

  /* cold room snowfall, only while that section is on screen */
  var cv=document.getElementById("snow");
  if(cv&&!reduce&&cv.getContext){
    var ctx=cv.getContext("2d"),W=0,H=0,flakes=[],raf=0;
    function size(){
      var r=cv.parentNode.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);
      W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
      var count=Math.max(24,Math.min(70,Math.round(W/16)));
      flakes=[];
      for(var f=0;f<count;f++)flakes.push({x:Math.random()*W,y:Math.random()*H,r:.5+Math.random()*1.5,v:.12+Math.random()*.4,a:.15+Math.random()*.4,p:Math.random()*6.28});
    }
    function draw(t){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="#dff0f8";
      flakes.forEach(function(f){
        f.y+=f.v;f.x+=Math.sin(t/1600+f.p)*.18;
        if(f.y>H+4){f.y=-4;f.x=Math.random()*W}
        ctx.globalAlpha=f.a;ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,6.283);ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    }
    size();window.addEventListener("resize",size);
    new IntersectionObserver(function(es){
      if(es[0].isIntersecting){if(!raf)raf=requestAnimationFrame(draw)}
      else{cancelAnimationFrame(raf);raf=0}
    }).observe(cv.parentNode);
  }
})();
