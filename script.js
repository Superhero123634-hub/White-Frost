(function(){
  var TO="hariomrefgim@gmail.com";
  var sel=document.getElementById("product");
  function open(product,name,phone,details){
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
    open(sel.value,document.getElementById("name").value.trim(),document.getElementById("phone").value.trim(),document.getElementById("msg").value.trim());
  });
})();
