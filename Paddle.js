export default class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(ctx,width) {
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
  }
  update(ctx,width) {
    if (this.x < 0) this.x = 0;
    if (this.x > width - this.w) this.x = width - this.w;
    //if (this.y < height - this.h) this.y = height - this.h;
    //if (this.y > height - this.h) this.y = height - this.h;
    this.draw(ctx,width);
  }
}
