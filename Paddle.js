export default class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(ctx) {
    let x = this.x + this.w - this.w * 0.25;
    let x2 = this.x + this.w * 0.25;
    let y = this.y;
    let y2 = this.y + this.h;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(128,128,128,100)";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.moveTo(x, y);
    ctx.strokeStyle = "red";
    ctx.lineTo(x, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(x2, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    //debugging outlines
    //ctx.strokeRect(this.x-20,this.y-20,this.w+40,this.h+20);
    //ctx.strokeRect(this.x-2,this.y-2,this.w+4,this.h+4);
  }
  update(width) {
    if (this.x < 0) this.x = 0;
    if (this.x > width - this.w) this.x = width - this.w;
    //this.x=ball.x-this.w/2;
    //if (this.y < height - this.h) this.y = height - this.h;
    //if (this.y > height - this.h) this.y = height - this.h;
    //this.draw(ctx);
  }
}
