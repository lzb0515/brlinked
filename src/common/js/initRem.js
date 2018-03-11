(function init(){
  const docEle=document.documentElement;
  const resizeEvt="orientationchange" in window?"orientationchange":"resize";
  const fontSize=function(){
      const clientWidth=docEle.clientWidth;
      if(!clientWidth) return;
      docEle.style.fontSize=20*(clientWidth/375)+"px";
  }
  fontSize();
  window.addEventListener(resizeEvt,fontSize,false);
})();




