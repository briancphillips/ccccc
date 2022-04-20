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
      update(1 / 640);
    },
    render: () => {
      render();
    },
  },
  1 / 640
);
//window.timer = timer;
let bounds = canvas.getBoundingClientRect();
let fps = 0;
let startTime = 0;
let frame = 0;
let paddle;
let ball;
let bricks;
init();

export function init() {
  timer.start();

  paddle = new Paddle(285, height - 60, 100, 20);
  ball = new Ball(paddle.x + paddle.w / 2, paddle.y - 510, 5);
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
function render() {
  bricks.forEach((brick) => {
    brick.draw(ctx);
  });
  paddle.draw(ctx, width);
  ball.draw(ctx);
  //console.log('in real update')
  // let time = Date.now();
  // ctx.fillStyle = "rgba(0,0,0,100)";
  // ctx.fillRect(0, 0, width, height);
  // paddle.update(ctx, width);
  // bricks.forEach((brick) => {
  //   brick.update(ctx);
  // });
  // ball.update(ctx, bricks, paddle, width, height);
  //console.log(ball.x,ball.y,ball.vel.x,ball.vel.y)
  //console.log(timer);
  // frame++;

  // if (time - startTime > 1000) {
  //   document.querySelector("h1").innerHTML = (
  //     frame /
  //     ((time - startTime) / 1000)
  //   ).toFixed(1);
  //   startTime = time;
  //   frame = 0;
  // }
  //requestAnimationFrame(update);
}
function update(dt) {
  //console.log(dt)
  //let time = Date.now();
  ctx.fillStyle = "rgba(0,0,0,100)";
  ctx.fillRect(0, 0, width, height);
  paddle.update(ctx, width, dt, ball);
  ball.update(bricks, paddle, width, height, dt);
  //console.log(ball.x,ball.y,ball.vel.x,ball.vel.y)
  //console.log(timer);
  // frame++;

  // if (time - startTime > 1000) {
  //   document.querySelector("h1").innerHTML = (
  //     frame /
  //     ((time - startTime) / 1000)
  //   ).toFixed(1);
  //   startTime = time;
  //   frame = 0;
  // }
  //requestAnimationFrame(update);
}

//update();

document.addEventListener("pointermove", (e) => {
  paddle.x = e.clientX - bounds.left - paddle.w / 2;
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
    //paddle.x=180
    ball.vel = { x: -300, y: -300 };
  }
});

window.addEventListener("resize", () => {
  bounds = canvas.getBoundingClientRect();
});
