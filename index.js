const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const width = 700;
const height = 600;

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

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = 4;
    this.dy = -4;
  }

  collides() {
    // collisions with walls
    if (this.x <= 0 || this.x + this.r >= width) {
      this.dx *= -1;
    }
    if (this.y <= 0 /* || this.y + this.r >= height*/) {
      this.dy *= -1;
    }

    //collisions with paddle

    // if(this.y+this.r>ship.y && this.dy>0) {

    //   if(this.x+this.r>=ship.x && this.x-this.r<=ship.x+ship.w) {
    //     this.dy*=-1;
    //     this.y+=this.dy;
    //   }

    // }

    if (
      this.x + this.r >= ship.x &&
      this.x - this.r <= ship.x + ship.w &&
      this.y + this.r >= ship.y &&
      this.y - this.r <= ship.y + ship.h &&
      this.dy > 0
    ) {
      if (this.x + this.r >= ship.x + ship.w - ship.w * 0.25 && this.dx < 0)
        this.dx *= -1;
      if (this.x + this.r <= ship.x + ship.w * 0.25 && this.dx > 0)
        this.dx *= -1;
      this.dy *= -1;
      //this.y += this.dy;
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
  update() {
    if (this.x < 0) this.x = 0;
    if (this.x > width - this.w) this.x = width - this.w;
    if (this.y < height - this.h) this.y = height - this.h;
    if (this.y > height - this.h) this.y = height - this.h;
    this.draw();
  }
}
let fps = 0;
let startTime = 0;
let frame = 0;
let ship;
let ball;
let bricks;
init();

function init() {
  ship = new Ship(50, 100, 100, 20);
  ball = new Ball(200, 450, 5);
  let colors = ["red", "orange", "yellow", "green"];
  let color = colors[0],
    colorIndex = 0;
  bricks = [];
  let brickW = 75;
  let brickH = 20;

  let cols = Math.floor(width / brickW);
  let padding = width / cols - brickW;
  let rows = 12;
  let offsetX = 0;
  let offsetY = 100;

  for (let j = 0; j < rows; j++) {
    //console.log(padding);
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
}

//let brick=new Brick(10,10,50,10,'rgba(0,0,255,1)');

//x+y*width

// for(let i=0;i<brickCount;i++) {
//   if(i%cols===0) row++;
//   bricks.push(new Brick(i*brickWidth,row*10,brickWidth,10,'rgba(0,0,255,1)'));
// }

function update() {
  let time = Date.now();
  ctx.fillStyle = "rgba(0,0,0,100)";
  ctx.fillRect(0, 0, width, height);
  ship.update();

  bricks.forEach((brick) => {
    brick.update();
  });
  ball.update();
  frame++;
  if (time - startTime > 1000) {
    document.querySelector('h1').innerHTML= ((frame / ((time - startTime) / 1000)).toFixed(1));    
    startTime = time;
    frame = 0;
  }
  requestAnimationFrame(update);
}

// setInterval(() => {
//   bricks.pop();
// }, 5000);

update();
//console.log(bricks.length);
//setTimeout(()=>{bricks.splice(5,1);console.log(bricks.length)},5000)
document.addEventListener("pointermove", (e) => {
  ship.x = e.clientX - bounds.left - ship.w / 2;
  //ship.y = e.clientY - bounds.top - ship.h / 2;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    ball = null;
    ship = null;
    init();
  }
});

window.addEventListener("resize", () => {
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
