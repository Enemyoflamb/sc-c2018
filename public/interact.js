function show(){
  var showelem= document.getElementsByClassName("hide")[0];
  var movedRight = -40;
  var show = setInterval(right, 5);
  function right(){
    if (movedRight >= 2){
      clearInterval(show);
    }else{
      movedRight = movedRight + 0.1;
      showelem.style.marginLeft = movedRight + "vw";
    }
  }
}

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
  show();
}
function showAddStudent(){
  var elem = document.getElementsByClassName("show")[0]
  var moved = -40;
  var show = setInterval(right, 5);
  function right(){
    if (moved == -2){
      clearInterval(show);
    }else{
      moved = moved + 0.1;
      elem.style.marginLeft = moved + "vw";
    }
  }
}
function hideInfo(){
  var showelem = document.getElementsByClassName("hide")[0];
  var moveInfo = 2;
  var goLeft = setInterval(infoLeft, 5);
  function infoLeft(){
    if (moveInfo == -40){
      clearInterval(goLeft);
    }else{
      moveInfo = moveInfo - 0.1;
      showelem.style.marginLeft = moveInfo + "vw";
    }
  }
}
