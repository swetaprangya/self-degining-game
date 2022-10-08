var shooteranimation
var shootinganimation
var backgroundImg
var birdanimation
var birdGroup
var bulletsGroup
var birdsColleted=0
var gameState="play"
var life=4
var resetbutton
function preload(){
shooteranimation=loadAnimation("shooter.png")
shootinganimation=loadAnimation("shooter2.png","shooter3.png","shooter4.png")
backgroundImg=loadImage("background.jpg")
birdanimation=loadAnimation("bird11.png","bird22.png","bird33.png")
bulletImage=loadImage("bullet.png")
resetbutton=loadImage("reset.png")
}

function setup() {

  createCanvas(800,400);
 shooter= createSprite(50, 300, 50, 50);
 birdGroup=createGroup()
 bulletsGroup=createGroup()
 shooter.addAnimation("running",shooteranimation)
 shooter.addAnimation("shooting",shootinganimation)
 shooter.scale=1.5
resetButton=createSprite(400,250)
resetButton.addImage(resetbutton)
resetButton.scale=0.1
resetButton.visible=false
 }

function draw() {
  background(backgroundImg); 
  drawSprites(); 
  if(gameState==="play"){
    if(keyWentDown("space")){
      shooter.changeAnimation("shooting",shootinganimation)
  bullets()
    }
    if(keyWentUp("space")){
      shooter.changeAnimation("running",shooteranimation)
    }
    if(keyDown("up")){
      shooter.y-=5
    }
    if(keyDown("down")){
      shooter.y+=5
    }
    if(bulletsGroup.isTouching(birdGroup)){
      birdGroup[0].destroy()
      bulletsGroup[0].destroy()
      birdsColleted+=1
    }
  
    
   birds()
   if(birdGroup.isTouching(shooter)){
life=life-1
birdGroup[0].destroy()
   }
   if(life<=0){
    gameState="end"
   }
   
  }

  if(gameState==="end"){

bulletsGroup.setVelocityXEach(0)
birdGroup.setVelocityXEach(0)
birdGroup.setLifetimeEach(0)

textSize(30)
fill("green")
text("Game Over",400,200)
resetButton.visible=true
if(mousePressedOver(resetButton)){
  reset()
}

  }
 

 
 
 fill("red")
 textSize(20)
 text("Birds Collected: "+birdsColleted,600,50)
 text ("life:"+life,600,80)

  }
  function reset(){
    gameState="play"
    resetButton.visible=false
    life=4
    score=0


  }
  function birds(){
    if (frameCount % 60 === 0) {
     bird = createSprite(800,100,40,10);
     bird.y = Math.round(random(10,300));
     bird.addAnimation("bird",birdanimation);
     bird.scale = 0.5;
     bird.velocityX = -3;
     
    bird.lifetime = 300;
     
     bird.depth = shooter.depth;
    shooter.depth = shooter.depth + 1;
     
    birdGroup.add(bird);
     }
 
  }
  function bullets(){
    bullet=createSprite(80,250,50,50)
    bullet.addImage("shoot",bulletImage)
    bullet.scale=0.05
bullet.velocityX=5
bullet.y=shooter.y  
bulletsGroup.add(bullet)
  }