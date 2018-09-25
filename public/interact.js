function hide(){
  var elem = document.getElementsByClassName("show")[0];
  var moved = -25;
  var hide = setInterval(left, 5);
  function left(){
    if (moved == -40){
      clearInterval(hide);
    }else{
      moved = moved - 0.1;
      elem.style.marginLeft = moved + "vw";
    }
  }
}
