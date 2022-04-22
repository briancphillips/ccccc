import { intersect } from "./math.js";
import { init } from "./index.js";
//import { Timer } from "./Timer.js";
export default class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel = { x: 0, y: 0 };
    this.len = 400;
    this.c = "white";
    this.isInPlay = true;
  }

  get len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set len(value) {
    const fact = value / this.len;
    this.vel.x *= fact;
    this.vel.y *= fact;
    //console.log('factor '+fact);
  }

  collides(subject, rect) {
    if (intersect(subject, rect)) {
      if (rect.constructor.name == "Paddle") {
        if (subject.isInPlay) {
          if (
            subject.x + subject.r >= rect.x - subject.r * 2 &&
            subject.x + subject.r <= rect.x + rect.w + subject.r * 2
          ) {
            //console.log("in bounding box");
            //debugger
            if (subject.y + subject.r >= rect.y) {
              subject.y -= subject.r * 2;
              const len = subject.len;
              //subject.vel.x += 500*(Math.random()-.5);
              subject.vel.y *= -1;
              subject.len = len * 1.02;
              //console.log("increasing vel len "+subject.len);
              //subject.vel.x *=-1;
            }
          }
        }
      }
      if (rect.constructor.name == "Brick") {
        console.log("hitting brick");
        if (
          subject.y + subject.r >= rect.y ||
          subject.y + subject.r <= rect.y + rect.h
        ) {
          subject.vel.y *= -1;
          //subject.vel.len *= 1.02;
        }
      }
      //subject.vel.y*=1.00001;
      //subject.vel.x*=1.00001;
      //subject.vel.len*=1.02;
      return true;
    } else {
      if (rect.constructor.name == "Paddle") {
        if (subject.y + subject.r > rect.y + rect.h) {
          subject.isInPlay = false;
        }
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }

  update(bricks, paddle, width, height, dt) {
    this.x += this.vel.x * dt;
    this.y += this.vel.y * dt;
    //console.log(this.vel.len);

    if (this.x <= 0 || this.x + this.r >= width) {
      this.vel.x *= -1;
      //this.vel.x*=1.1;
    }
    if (this.y <= 0) {
      this.vel.y *= -1;
      //this.vel.y*=1.1;
    }
    if (this.y + this.r >= height + 100) {
      //console.log(this.vel)      
      init();
    }

    bricks.forEach((brick, i) => {
      if (this.collides(this, brick)) {
        bricks.splice(i, 1);
      }
    });

    this.collides(this, paddle);

    //this.draw(ctx);
  }
}
