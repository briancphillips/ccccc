export default class Brick {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  draw(ctx) {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update(ctx) {
    this.draw(ctx);
  }
}
