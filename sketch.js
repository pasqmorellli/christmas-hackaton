var myImage, state = true;

function preload(){
    myImage = loadImage("./assets/flamingo.jpg");
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    imageMode(CENTER)
    background(202);
    image(myImage,width/2,height/2,myImage.width,myImage.height);
}

function draw() {
    if (state) {
        var thisX = random(0,width);
        var thisY = random(0,height)
        var c = get(thisX, thisY)
        fill(c);
        noStroke(255);
        ellipse(thisX, thisY, 10, 10);
    }
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight)
}