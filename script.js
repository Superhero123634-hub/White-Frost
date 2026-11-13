(function(){
  window.wfReady=1;
  var TO="hariomrefgim@gmail.com",WA="919825940670";
  var root=document.documentElement;
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(id){return document.getElementById(id)}
  function fmt(t){var n=Math.round(t);return (n>0?"+":n<0?"−":"")+Math.abs(n)+"°C"}
  function ease(p){return 1-Math.pow(1-p,4)}

  /* enquiry page: email and WhatsApp messages written from the form */
  var form=$("enq");
  if(form){
    var sel=$("product"),send=$("send");
    var want=new URLSearchParams(window.location.search).get("product");
    if(want){for(var o=0;o<sel.options.length;o++){if(sel.options[o].text===want){sel.selectedIndex=o}}}
    function message(){
      var name=$("name").value.trim(),phone=$("phone").value.trim(),details=$("msg").value.trim();
      return {
        product:sel.value,
        body:"Hello White Frost,\n\nI would like to enquire about: "+sel.value+".\n"+
          (details?"\nDetails:\n"+details+"\n":"")+
          "\nPlease share availability and price.\n\nRegards,\n"+(name||"")+(phone?"\nPhone: "+phone:"")
      };
    }
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var m=message();
      send.textContent="Opening your email…";
      setTimeout(function(){send.textContent="Enquire by email"},4000);
      window.location.href="mailto:"+TO+"?subject="+encodeURIComponent("Enquiry for "+m.product+" – White Frost")+"&body="+encodeURIComponent(m.body);
    });
    $("wa").addEventListener("click",function(){
      window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(message().body),"_blank","noopener");
    });
  }

  /* home page ruler: marker cools from +10 to -18 and lights the scale behind it */
  var scale=$("scale");
  if(scale){
    var marker=$("marker"),mtemp=$("mtemp"),ticks=[],ruler=marker.parentNode;
    for(var k=0;k<=50;k++){var i=document.createElement("i");if(k%10===0)i.className="M";scale.appendChild(i);ticks.push(i)}
    var setT=function(t){
      ruler.style.setProperty("--x",((t+40)/50*100)+"%");
      mtemp.textContent=fmt(t);
      for(var j=0;j<ticks.length;j++){ticks[j].classList.toggle("on",(-40+j)>=t)}
    };
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
  }

  /* every page: header reading falls from +10 to -40, page turns colder, progress line */
  var reading=$("reading"),prog=$("progress"),busy=false;
  function onScroll(){
    if(busy)return;busy=true;
    requestAnimationFrame(function(){
      var h=root.scrollHeight-window.innerHeight;
      var p=h>0?Math.min(1,Math.max(0,window.scrollY/h)):0;
      document.body.style.setProperty("--chill",p.toFixed(3));
      if(prog)prog.style.transform="scaleX("+p+")";
      if(reading)reading.textContent=fmt(10-50*p);
      busy=false;
    });
  }
  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("resize",onScroll);
  onScroll();

  /* cold rooms page: numbers count up to their temperature when seen */
  var table=$("temps"),nums=[];
  if(table){
    table.querySelectorAll("td:first-child").forEach(function(td){
      td.innerHTML=td.textContent.replace(/([+−-]?)(\d+)/g,function(m,sg,v){return '<span class="num" data-s="'+sg+'" data-v="'+v+'">'+sg+(reduce?v:0)+'</span>'});
    });
    nums=table.querySelectorAll(".num");
  }
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

  /* product rules draw in one after another */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      e.target.classList.add("in");
      if(e.target===table)countUp();
      io.unobserve(e.target);
    });
  },{threshold:.3});
  document.querySelectorAll(".rows li").forEach(function(li,n){li.style.setProperty("--d",(n%6)*90+"ms");io.observe(li)});
  if(table)io.observe(table);

  /* cold rooms page: snowfall, only while the section is on screen */
  var cv=$("snow");
  if(cv&&!reduce&&cv.getContext){
    var ctx=cv.getContext("2d"),W=0,H=0,flakes=[],raf=0;
    var size=function(){
      var r=cv.parentNode.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);
      W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
      var count=Math.max(24,Math.min(70,Math.round(W/16)));
      flakes=[];
      for(var f=0;f<count;f++)flakes.push({x:Math.random()*W,y:Math.random()*H,r:.5+Math.random()*1.5,v:.12+Math.random()*.4,a:.15+Math.random()*.4,p:Math.random()*6.28});
    };
    var draw=function(t){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="#dff0f8";
      flakes.forEach(function(f){
        f.y+=f.v;f.x+=Math.sin(t/1600+f.p)*.18;
        if(f.y>H+4){f.y=-4;f.x=Math.random()*W}
        ctx.globalAlpha=f.a;ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,6.283);ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    size();window.addEventListener("resize",size);
    new IntersectionObserver(function(es){
      if(es[0].isIntersecting){if(!raf)raf=requestAnimationFrame(draw)}
      else{cancelAnimationFrame(raf);raf=0}
    }).observe(cv.parentNode);
  }
  /* page doors: open on arrival, close when leaving */
  var shut=$("shut"),home=!!$("gate");
  var titles={"products.html":"Products","coldrooms.html":"Cold rooms","inquiry.html":"Enquiry","index.html":"White Frost"};
  function norm(p){return p.replace(/index\.html$/,"")}
  if(shut&&!home){
    var ready=(document.fonts&&document.fonts.ready)?document.fonts.ready:Promise.resolve();
    Promise.race([ready,new Promise(function(r){setTimeout(r,2500)})]).then(function(){
      setTimeout(function(){root.classList.add("entered");shut.classList.add("open")},Math.max(0,(reduce?150:1000)-performance.now()));
    });
  }
  if(shut){
    document.addEventListener("click",function(e){
      var a=e.target.closest&&e.target.closest("a[href]");
      if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button)return;
      if(a.target&&a.target!=="_self")return;
      var u=new URL(a.href,window.location.href);
      if(u.origin!==window.location.origin||!/(\.html|\/)$/.test(u.pathname))return;
      if(norm(u.pathname)===norm(window.location.pathname)&&u.search===window.location.search)return;
      if(reduce)return;
      e.preventDefault();
      var file=u.pathname.split("/").pop()||"index.html",p=shut.querySelector(".mid p");
      if(p)p.textContent=titles[file]||"White Frost";
      shut.classList.remove("open");
      setTimeout(function(){window.location.href=u.href},820);
    });
    window.addEventListener("pageshow",function(e){if(e.persisted){shut.classList.add("open")}});
  }
})();
