var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var x = 0;

/*function draw(){
  for(var i = 0; i < Math.max(1000-x, 101)/100; i ++){*/
    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(300+x,250);
    ctx.lineTo(500+x,500);
    ctx.stroke();
    x ++;
/*  }
}

setInterval(draw, 10)*/
