// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let brushHue, backgroundColor, coinX, coinY, coin2X, coin2Y, timeX, timeY, score, time, gameIsOver, hit, hit2, hit3;
let objArray =[];
function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  coin2X = random(width);
  coin2Y = random(height);
  timeX = random(width);
  timeY = random(height);
  time = 200;
  score = 0;
  gameIsOver = false;
  objArray.push(new Coin(100,100,1,random(5),random(5)))
  objArray.push(new Coin(100,100,2,random(5),random(5)))
  objArray.push(new Coin(100,100,3,random(5),random(5)))
  objArray.push(new Coin(100,100,"T",random(5),random(5)))
}

function draw() {
  background(backgroundColor);
  //ellipse(coinX, coinY, 20);
  //text(`1`, coinX-4, coinY+4)
  //ellipse(coin2X, coin2Y, 20);
  //text(`2`, coin2X-4, coin2Y+4)
  //text(`T`,timeX, timeY)
  ellipse(mouseX, mouseY, 20);
  text(`Your score: ${score}`, 20, 20);
  text(`Time remaining: ` + time, 20, 40);
  handleTime();
  
  for(var i =0; i < objArray.length; i++){
    var hit= collideCircleCircle(mouseX, mouseY, 20, objArray[i].x,objArray[i].y,20)
    if(hit && !gameIsOver){
      objArray[i].handleCollision();
    }
    objArray[i].display()
  
}
  //hit = collideCircleCircle(mouseX, mouseY, 20, coinX, coinY, 20);
  //hit2 = collideCircleCircle(mouseX, mouseY, 20, coin2X, coin2Y,20);
  //hit3 = collideCircleCircle(mouseX, mouseY, 20, timeX, timeY, 20)
  //if (hit && !gameIsOver) {
   // handleCollision(1);
  //} else if (hit2 && !gameIsOver) {
  //  handleCollision(2);
  //} else if (hit3 && !gameIsOver){
  //  handleCollision(3)
 // }
}

function handleCollision(coin) {
  // We'll write code for what happens if your character hits a coin.
  console.log(`You got a hit at ${mouseX}, ${mouseY}!`);
  
  if (coin == 1){
    coinX = random(width);
    coinY = random(height);
    score += 1;
  } else if(coin == 2){
    coin2X = random(width);
    coin2Y = random(height);
    score += 1;
  } else if (coin == 3){
    time += 100
    timeX = random(width);
    timeY = random(height);
  }
}

function handleTime() {
  // We'll write code to handle the time.
  if (time > 0) {
    time -= 1;
  } else {
    gameIsOver = true;
  }
}

class Coin{
  constructor(x,y,value,Vx, Vy){
    this.x = x
    this.y =y 
    this.value = value
    this.Vx = Vx
    this.Vy = Vy
    this.ticker = 0
    this.change = 1
  }
  display(){
    if(!gameIsOver){
    if(this.ticker >=20){
      this.change = -1
    }
    if(this.ticker <=0){
      this.change = 1
    }
    this.ticker+=this.change;
    
    this.x += this.Vx
    this.y += this.Vy
    if(this.x <= 0){
      this.x = 0;
      this.Vx = -this.Vx
    } else if(this.x >width){
      this.x = height;
      this.Vx = -this.Vx
    }
    if(this.y <= 0){
      this.y = 0;
      this.Vy = -this.Vy
    } else if(this.y >width){
      this.y = width;
      this.Vy = -this.Vy
    }
    }
    if(gameIsOver){
      this.ticker = 19
    }
    if(typeof(this.value) == "number"){
      push()
      fill(60,100,100)
      ellipse(this.x, this.y,this.ticker%20, 20)
      fill(255,0,0)
      text(`${this.value}`,this.x-4, this.y+4)
      pop()
    }else if(this.value=="T"){
      push()
      fill(120,100,100)
      ellipse(this.x, this.y,this.ticker%20, 20)
      fill(255,0,0)
      text(`${this.value}`,this.x-4, this.y+4)
      pop()
    }
  }
  handleCollision(){
    this.x = random(width)
    this.y = random(height)
    this.Vx = random(5)
    this.Vy = random(5)
    if(this.value == "T"){
      time += 100
    }else if(typeof(this.value) == "number"){
      score += this.value
    }
  }
  
}