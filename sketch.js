var mic;

var candyR,
    candyG,
    candyB,
    candyY,
    candyR2,
    candyG2,
    candyB2,
    candyY2,
    sfondo;
    
var quantity = 300;
var xPosition = [];
var yPosition = [];
var flakeSize = [];
var direction = [];
var minFlakeSize = 1;
var maxFlakeSize = 5;
var snowColor = '0, 0, 100';
    
/*var colBlackCappL,
    colBlackCappM,
    colBlackCappD,
    colSnowL = '255, 0, 255',
    colSnowD = '255, 50, 255',
    colBlackOcchi,
    colNaso,
    colBocca;*/


function preload() {
  candyR = loadImage("assets/candyR.png");
  candyG = loadImage("assets/candyG.png");
  candyB = loadImage("assets/candyB.png");
  candyY = loadImage("assets/candyY.png");
  candyR2 = loadImage("assets/candyR2.png");
  candyG2 = loadImage("assets/candyG2.png");
  candyB2 = loadImage("assets/candyB2.png");
  candyY2 = loadImage("assets/candyY2.png");
  sfondo = loadImage("assets/sfondo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  imageMode(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  
  for(var i = 0; i < quantity; i++) {
    flakeSize[i] = round(random(minFlakeSize, maxFlakeSize));
    xPosition[i] = random(0, width);
    yPosition[i] = random(0, height);
    direction[i] = round(random(0, 1));
  }
}

function draw() {
  background(208, 67, 80);
  fill(snowColor);
  rect(0,  height/2, width, height/2);
  image(sfondo,width/2, height/2-50,sfondo.width*0.8,sfondo.height*0.8);
  
  var vol = map(mic.getLevel(), 0, 1, 50, 200);
  
  snowMan();
  candyStick(candyR, candyR2, width/2-400, height/2+30, 1.2, 1.2, -18, 1);
  candyStick(candyG, candyG2, width/2-190, height/2+90, -1.4, 1.4, 5, 2);
  candyStick(candyY, candyY2, width/2+160, height/2+20, 1.1, 1.1, -5, 3);
  candyStick(candyB, candyB2, width/2+380, height/2+90, -1.5, 1.5, 15, 4);
  
  snow();
}

function windowResized() {
  resizeCanvas (windowWidth, windowHeight);
}

function snowMan() {
  noStroke();
  //ombra
  fill(255, 0, 90);
  ellipse(width/2, height/2+146, 120, 15);
  
  //sotto
  fill(255, 0, 96);
  ellipse(width/2, height/2+80, 140, 140);
  
  //mezzo
  push();
    var saltMezzo = map(mic.getLevel(), 0, 0.8, 0, -40);
    translate(0, saltMezzo);
    fill(255, 0, 96);
    ellipse(width/2, height/2, 95, 95);
  pop();
  
  //cappello
    push();
    var saltCapp = map(mic.getLevel(), 0, 0.5, 0, -70);
    translate(width/2, height/2 - 115 + saltCapp);
    rotate(357);
      fill(250, 0, 15)
      rect(-35, -65, 70, 65);
      //black 
      fill(250, 0, 15);
      ellipse(0, -65, 70, 25);
      //red
      fill(350, 100, 255);
      ellipse(0, -45, 70, 25);
      rect(-35, -45, 70, 20);
      //black
      fill(250, 0, 15);
      ellipse(0, -25, 70, 25);
      fill(250, 0, 30);
      ellipse(0, 0, 120, 50);
      fill(250, 0, 20);
      ellipse(-2, 2, 65, 20);
    pop();  
    
  //fine cappello
  
  //testa
   push();
    var saltTesta = map(mic.getLevel(), 0, 0.6, 0, -60);
    translate(0, saltTesta);
    fill(255, 0, 96);
    ellipse(width/2, height/2-70, 100, 100);
    //occhi
    fill(255, 255, 0);
    ellipse(width/2+18, height/2-90, 10, 10);
    ellipse(width/2-18, height/2-90, 10, 10);
    //naso
    fill(50, 255, 255);
    ellipse(width/2, height/2-71, 15, 15);
    // bocca
    fill(255, 0, 70);
    var vol = map(mic.getLevel(), 0, 0.7, 5, 60);
    arc(width/2+2, height/2-53, 50, vol, 0, 180);
  pop();
  //fine testa
}

function candyStick(colCandy, colCandy2, x, y, s1, s2, a, v) {
  var vol = round(map(mic.getLevel(), 0, 0.6, 0, 4));
  
  var myCandy = colCandy2;
  
  if (vol == v) {
    myCandy = colCandy;
  }
  else {
    myCandy = colCandy2;
  }
  
  push();
  translate(x, y);
  rotate(a);
  scale(s1, s2);
  image(myCandy,0,0,myCandy.width*0.5,myCandy.height*0.5);
  fill(255, 0, 255);
  ellipse(30, 100, 100, 100);
  pop();
}

function snow() {
	for(var i = 0; i < xPosition.length; i++) {
    
    ellipse(xPosition[i], yPosition[i], flakeSize[i], flakeSize[i]);
    
    if(direction[i] == 0) {
      xPosition[i] += map(flakeSize[i], minFlakeSize, maxFlakeSize, .1, .5);
    } else {
      xPosition[i] -= map(flakeSize[i], minFlakeSize, maxFlakeSize, .1, .5);
    }
    
    yPosition[i] += flakeSize[i] + direction[i]; 
    
    if(xPosition[i] > width + flakeSize[i] || xPosition[i] < -flakeSize[i] || yPosition[i] > height + flakeSize[i]) {
      xPosition[i] = random(0, width);
      yPosition[i] = -flakeSize[i];
    } 
  }
}