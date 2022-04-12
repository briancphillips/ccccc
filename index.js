const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const width = 700;
const height = 400;

canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);
let bounds = canvas.getBoundingClientRect();

class Brick {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  draw() {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.draw();
  }
}
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
    if (this.y < height - this.h) this.y = height - this.h;
    if (this.y > height - this.h) this.y = height - this.h;
    this.draw();
  }
}

let ship = new Ship(100, 100, 100, 20);
//let brick=new Brick(10,10,50,10,'rgba(0,0,255,1)');

let colors = ["red", "purple", "orange", "blue"];
let color = colors[0],
  colorIndex = 0;
let bricks = [];
let brickW = 75;
let brickH = 20;

let cols = Math.floor(width / brickW);
let padding=width/(cols-1)-brickW
let rows = 16;
let offsetX=1;
let offsetY=1;


for (let j = 0; j < rows; j++) {
  console.log(padding)
  for (let i = 0; i < cols; i++) {

    bricks.push(
      new Brick((i * brickW)+padding , j * brickH, brickW, brickH, color)
    );
  }
  if ((j+1) % 3 === 0) {
    colorIndex++;
    color = colors[colorIndex];
  }
}

//x+y*width

// for(let i=0;i<brickCount;i++) {
//   if(i%cols===0) row++;
//   bricks.push(new Brick(i*brickWidth,row*10,brickWidth,10,'rgba(0,0,255,1)'));
// }

function update() {
  ctx.fillStyle = "rgba(0,0,0,100)";
  ctx.fillRect(0, 0, width, height);
  ship.update();
  bricks.forEach((brick) => {
    brick.update();
  });

  requestAnimationFrame(update);
}

update();
console.log(bricks.length)
//setTimeout(()=>{bricks.splice(5,1);console.log(bricks.length)},5000)
document.addEventListener("pointermove", (e) => {
  ship.x = e.clientX - bounds.left - ship.w / 2;
  ship.y = e.clientY - bounds.top - ship.h / 2;
});

window.addEventListener("resize", (_e) => {
  bounds = canvas.getBoundingClientRect();
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
