class Stone
{
  constructor(x, y, w, h) 
  {
    let options = {
     restitution:0.8
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }

  show() {
    var pos = this.body.position;
    push();
    ellipseMode(CENTER);
    noStroke();
    fill("white");
    ellipse(pos.x,pos.y, this.w, this.h);
    pop();
  }
}