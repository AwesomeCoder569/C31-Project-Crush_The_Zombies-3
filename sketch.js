const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base1,base2;

var bridge, jointPoint;

var jointLink;

var stones = [];
var stone;

var zombie, zombie1, zombie2, zombie3, zombie4, sad_zombie;

var bgImg;

var edges;

var breakButton;

function preload() {
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");

  sad_zombie = loadImage("./assets/sad_zombie.png");

  bgImg = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  base1 =  new Base (200, height/2 + 50, 500, 100, true);
  base2 = new Base (width - 250, height/2 + 50, 700, 100, true);
  
  bridge = new Bridge(12, { x: width/2 - 300, y: height/2 });
  jointPoint = new Base(width - 600, height / 2 + 10, 40, 20, color, true);
  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link (bridge, jointPoint);

  zombie = createSprite(width/2, height - 110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.addAnimation("sad", sad_zombie);
  zombie.scale = 0.08;
  zombie.velocityX = 10;

  breakButton = createButton("Break");
  breakButton.position(width - 585, height/2 - 0);
  breakButton.class("breakbutton");
  breakButton.mouseClicked(handleButttonPress);

  for(var i = 0; i <= 8; i++) {
    var x = random(width/2 - 200, width/2 + 100);
    var y = random(-10, 140);
    stone = new Stone(x,y, 50, 50);
    stones.push(stone);
  }

  imageMode(CENTER);
}

function draw() {
  background(51);
  image(bgImg,width/2,height/2,windowWidth,windowHeight);
  Engine.update(engine);

  edges = createEdgeSprites();
  zombie.bounceOff(edges);

  base1.show();
  base2.show();
  bridge.show();

  for(var stone of stones) {
    stone.show();
    var pos = stone.body.position;
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    if(distance <= 50) {
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, { x:10, y:-10});
      zombie.changeAnimation("sad");
      collided = true;
    }
  }

  drawSprites();
}

function handleButttonPress() {
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}

