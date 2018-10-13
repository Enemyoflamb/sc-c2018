function setup(){
    createCanvas(600, 600);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
}

//var ppl = []; //defined in write.js
var selected = null;

//var Person constructor // defined in write.js
Person.prototype.draw = function() {
    if(this.name.includes("#")) return; // hiding the testing stuff
    push();
    translate(this.x, this.y);
    fill(255, 255, 255, 100);
    stroke(0, 0, 0, 100 + this.f);
    ellipse(0, 0, 50, 50);
    noFill();
    arc(0, 5, 14, 2, 0.349066, 2.79253); //20deg - 160deg
    point(-15, 0);
    point(15, 0);
    noStroke();
    fill(0, 0, 70, 100 + this.f);
    text(this.name, 0, -35);
    pop();
    this.px = this.x;
    this.py = this.y;
    this.x += this._x;
    this.y += this._y;
    this._x /= 2;
    this._y /= 2;
    this.f = Math.max(this.f - 10, 0);
};

var mp = false;
function mousePressed(){
    mp = true;
}
function mouseReleased(){
    selected = null;
}
var k = 0;
function draw() {
    background(255, 255, 255);
    fill(0, 0, 0);
    //text(~~this.__frameRate+"FPS\n"+k, 100, 100);
    k = 0;
    if(selected){
        ppl[selected]._x = -(ppl[selected].x - mouseX) / 3;
        ppl[selected]._y = -(ppl[selected].y - mouseY) / 3;
    }
    //ppl[0]._x = ppl[1]._y = Math.cos(frameCount*2) * 3;
    //ppl[0]._y = ppl[1]._x = Math.sin(frameCount*3) * 3;
    for(var i = 0; i < ppl.length; i ++){
        ppl[i].draw();
        for(var j = 0; j < ppl.length; j ++){
            if(i === j){
                continue;
            }
            k ++;
            if(Math.abs(ppl[i].x - ppl[j].x) < 50 && Math.abs(ppl[i].y - ppl[j].y) < 50){
                var s = Math.atan2(ppl[i].y-ppl[j].y, ppl[i].x-ppl[j].x);
                ppl[i]._x += Math.cos(s)*2;
                ppl[i]._y += Math.sin(s)*2;
                ppl[i].f = 100;
            }
        }
        if(Math.abs(ppl[i].x - 300) > 301){
            ppl[i].x = ppl[i].px;
        }
        if(Math.abs(ppl[i].y - 300) > 301){
            ppl[i].y = ppl[i].py;
        }
        if(Math.abs(ppl[i].x - mouseX) < 25 & Math.abs(ppl[i].y - mouseY) < 25){
            ppl[i].f = 100;
            if(mp){
                selected = i;
            }
        }
    }
    mp = false;
};
