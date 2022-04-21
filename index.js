import Brick from "./Brick.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import { Timer } from "./Timer.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const width = 700;
const height = 600;

canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);

const timer = Timer(
  {
    update: () => {
      simulate(1/320);
    },
    render: () => {
      render();
    },
  },
  1 / 320
);

window.timer = timer;
let bounds = canvas.getBoundingClientRect();
let paddle;
let ball;
let bricks;
let last;
let fps = document.querySelector("h1");
init();

export function init() {
  timer.start();  
  paddle = new Paddle(285, height - 60, 100, 20);
  ball = new Ball(paddle.x + paddle.w / 2, paddle.y - 10, 5);
  window.ball = ball;
  //window.paddle=paddle;
  let colors = ["red", "orange", "yellow", "green"];
  let color = colors[0],
    colorIndex = 0;

  if (!bricks || bricks.length == 0) {
    bricks = [];
    let brickW = 75;
    let brickH = 20;

    let cols = Math.floor(width / brickW);
    let padding = width / cols - brickW;
    let rows = 8;
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
      if ((j + 1) % 2 === 0) {
        colorIndex++;
        color = colors[colorIndex];
      }
    }
  }
}
let frame=0,startTime=0;
window.frame=frame;
function tick() {
  var time = Date.now();
  frame++;
  if (time - startTime > 1000) {
      fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
      startTime = time;
      frame = 0;
	}  
}


function render() {
  
  tick();  
  //console.log("Drawing every " + step / 1000);
  bricks.forEach((brick) => {
    brick.draw(ctx);
  });
  paddle.draw(ctx);
  ball.draw(ctx);
}
function simulate(dt) {
  //console.log("Simulating every " + dt / 1000);  
  ctx.fillStyle = "rgba(0,0,0,100)";
  ctx.fillRect(0, 0, width, height);

  paddle.update(width);
  ball.update(bricks, paddle, width, height, dt);
}

document.addEventListener("pointermove", (e) => {
  paddle.x = e.clientX - bounds.left - paddle.w / 2;
});

document.addEventListener("pointerdown", (e) => {
  if (ball.vel.x === 0 && ball.vel.y === 0) {
    timer.stop();
    timer.start();

    ball.vel = {
      x: 80 * (Math.random() > 0.5 ? 1 : -1),
      y: -80 * (Math.random() * 0.8 + 1),
    };
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    console.clear();
    ball = null;
    paddle = null;
    timer.stop();
    init();
  }
  if (e.key === " " && ball.vel.x === 0 && ball.vel.y === 0) {
    timer.stop();
    timer.start();

    ball.vel = {
      x: 80 * (Math.random() > 0.5 ? 1 : -1),
      y: -80 * (Math.random() * 0.8 + 1),
    };
  }
});

window.addEventListener("resize", () => {
  bounds = canvas.getBoundingClientRect();
});
