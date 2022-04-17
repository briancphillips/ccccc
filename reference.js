const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const width = 700;
const height = 600;

canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);
let bounds = canvas.getBoundingClientRect();

class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  get t() {
    return this.y;
  }
  get l() {
    return this.x;
  }

  get r() {
    return this.x + this.w;
  }

  get b() {
    return this.y + this.h;
  }

  set t(v) {
    this.y = v;
  }

  set l(v) {
    this.x = v;
  }

  set r(v) {
    this.x = v - this.w;
  }

  set b(v) {
    this.y = v - this.h;
  }
}

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

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = -4;
    this.dy = -4;
  }

  collides(subject, rect) {
    return (
      subject.b > rect.t &&
      subject.t < rect.b &&
      subject.r > rect.l &&
      subject.l < rect.r
    );

    // collisions with walls
    if (this.x <= 0 || this.x + this.r >= width) {
      this.dx *= -1;
    }
    if (this.y <= 0 /* || this.y + this.r >= height*/) {
      this.dy *= -1;
    }

    //collisions with paddle

    if (
      this.x + this.r >= ship.x &&
      this.x + this.r <= ship.x + ship.w &&
      this.y + this.r >= ship.y &&
      this.y + this.r <= ship.y + ship.h
    ) {
      this.dy *= -1;
    }
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.collides();
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
let ball = new Ball(200, 450, 5);
//let brick=new Brick(10,10,50,10,'rgba(0,0,255,1)');

let colors = ["red", "purple", "orange", "green"];
let color = colors[0],
  colorIndex = 0;
let bricks = [];
let brickW = 75;
let brickH = 20;

let cols = Math.floor(width / brickW);
let padding = width / cols - brickW;
let rows = 12;
let offsetX = 0;
let offsetY = 100;

for (let j = 0; j < rows; j++) {
  console.log(padding);
  for (let i = 0; i < cols; i++) {
    bricks.push(
      new Brick(
        i * brickW + i * padding + padding / 2,
        j * brickH + j * padding + padding / 2 + offsetY,
        brickW,
        brickH,
        color
      )
    );
  }
  if ((j + 1) % 3 === 0) {
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
  ball.update();
  requestAnimationFrame(update);
}

// setInterval(() => {
//   bricks.pop();
// }, 5000);

update();
console.log(bricks.length);
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
