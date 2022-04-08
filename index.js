const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const width = 700;
const height = 400;

canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);
const bounds = canvas.getBoundingClientRect();

class Ship {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(255,0,0,100)";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  update() {
    if (this.x < 0) this.x = 0;
    if (this.x > width - this.w) this.x = width - this.w;
    if (this.y < 0) this.y = 0;
    if (this.y > height - this.h) this.y = height - this.h;
    this.draw();
  }
}

let ship = new Ship(100, 100, 64, 64);

function update() {
  ctx.fillStyle = "rgba(0,0,0,100)";
  ctx.fillRect(0, 0, width, height);
  ship.update();
  requestAnimationFrame(update);
}

update();

document.addEventListener("pointermove", (e) => {
  ship.x = e.clientX - bounds.left - ship.w / 2;
  ship.y = e.clientY - bounds.top - ship.h / 2;
});

// function updateMousePos(e) {
//   ship.x = e.clientX - bounds.left - ship.w / 2;
//   ship.y = e.clientY - bounds.top - ship.h / 2;
//   console.log(1);
// }

// let enableCall = true;
// document.addEventListener('pointermove',(e)=> {
//   if (!enableCall) return;

//   enableCall = false;
//   ship.x=e.clientX-bounds.left-ship.w/2;
//     ship.y=e.clientY-bounds.top-ship.h/2;
//   setTimeout(() => enableCall = true, 4);
// });

// document.body.addEventListener("mousemove", throttle(updateMousePos, 0.5));

// function throttle(callback, interval) {
//   let enableCall = true;

//   return function (...args) {
//     if (!enableCall) return;

//     enableCall = false;
//     callback.apply(this, args);
//     setTimeout(() => (enableCall = true), interval);
//   };
// }
