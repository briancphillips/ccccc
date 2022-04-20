import { intersect } from "./math.js";

export default class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel = { x: -300, y: 300 };
    this.c = "white";
  }

  collides(subject, rect = "", type = "", width = 0, _height = 0) {
    // collisions with walls
    if (type == "wall") {
      if (subject.x <= 0 || subject.x + subject.r >= width) {
        subject.vel.x *= -1;
      }
      if (subject.y <= 0 /* || subject.y + subject.r >= height*/) {
        subject.vel.y *= -1;
      }
    }

    //collisions with bricks and paddle
    if (intersect(subject, rect)) {
      if (
        (subject.x + subject.r >= rect.x + rect.w - rect.w * 0.25 &&
          subject.vel.x < 0) ||
        (subject.x + subject.r <= rect.x + rect.w * 0.25 && subject.vel.x > 0)
      )
        subject.vel.x *= -1;
        //subject.vel.x*=1.01
      if (
        (subject.y + subject.r <= rect.y + rect.h ||
          subject.y + subject.r >= rect.y) &&
        subject.vel.y != 0
      ) {
        subject.vel.y *= -1;
        //subject.vel.y*=1.01
      }

      return true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }

  update(ctx, bricks, paddle, width, height,dt) {
    this.x += this.vel.x*dt;
    this.y += this.vel.y*dt;
    bricks.forEach((brick, i) => {
      if (this.collides(this, brick)) {
        bricks.splice(i, 1);
      }
    });
    this.collides(this, paddle, "wall", width, height);

    //this.draw(ctx);
  }
}
