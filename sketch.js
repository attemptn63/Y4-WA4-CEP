let bg_gif,explode,tt,bgm;
let batter,balls,endl;
let points = 0,missed = 0;
function preload(){
  soundFormats('mp3');
  bg_gif = loadImage("assets/beach_background.gif");
  explode = loadImage("assets/explosion.png");
  tt = loadImage("assets/tt_bat.png");
  bgm = loadSound("assets/bgm.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  batter = new Sprite();  
  batter.width = width/12;
  batter.height = width/12;
  batter.collider = 'k';
  batter.x = width/10;
  batter.y = height/4;
  batter.img = tt;
  batter.img.scale = 0.2;

  balls = new Group();
  balls.diameter = width/50;
  balls.color = "yellow";

  endl = new Sprite();
  endl.width = 2;
  endl.height = 2*height;
  endl.collider = 'k';
  endl.x = -2;
  endl.y = 0;

  batter.overlapping(balls,smack);
  endl.overlapping(balls,kill);
}
function smack(batter,ball){
  if(kb.pressing('d') || kb.pressing('f') || kb.pressing('j') || kb.pressing('k')){
    image(explode,ball.x - width/50,ball.y - width/50,width/10,width/10);
    ball.remove();
    points += 1;
  }
}
function kill(endl,ball){
  ball.remove();
  missed += 1;
}
function draw() {
  if(!bgm.isPlaying()){
    bgm.play();
  }
  background(bg_gif);
  rectMode(CENTER);
  push();
  fill("purple");
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text("Points: " + points, 17*width/20, height/20);
  text("Missed: " + missed, 17*width/20, 3*height/20);
  pop();
  if(frameCount % 20 === 0){
    ball = new balls.Sprite();
    ball.y = Math.round(Math.random()) * height/2 + height/4;
    ball.x = width;
    balls.vel.x = -10 - frameCount/800;
  }
}
function keyPressed(){
    if(key === 'd' || key === 'f'){
        batter.moveTo(width/10,height/4,150);
    }
    if(key === 'k' || key === 'j'){
        batter.moveTo(width/10,3*height/4,150);
    }
}