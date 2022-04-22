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
      simulate(1 / 320);
    },
    render: () => {
      render();
    },
  },
  1 / 320
);
timer.start();
window.timer = timer;
let bounds = canvas.getBoundingClientRect();
let paddle;
let ball;
let bricks;
let playing=false;
init();

export function init() {
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

let lastTime = Date.now(),
  frames = 0;
let lastTime2 = Date.now(),
  frames2 = 0;

function render() {
  const now = Date.now();
  frames++;
  if (now > lastTime + 1000) {
    let fps = Math.round((frames * 1000) / (now - lastTime));
    document.querySelector(".fps1").innerHTML = `Drawing FPS: ${fps}`;
    lastTime = now;
    frames = 0;
  }
  //console.log("Drawing every " + step / 1000);
  bricks.forEach((brick) => {
    brick.draw(ctx);
  });
  paddle.draw(ctx);
  ball.draw(ctx);
}
function simulate(dt) {
  //console.log("Simulating every " + dt / 1000);
  const now2 = Date.now();
  frames2++;
  if (now2 > lastTime2 + 1000) {
    let fps2 = Math.round((frames2 * 1000) / (now2 - lastTime2));
    document.querySelector(".fps2").innerHTML = `Simulating FPS: ${fps2}`;
    lastTime2 = now2;
    frames2 = 0;
  }

  ctx.fillStyle = "rgba(0,0,0,100)";
  ctx.fillRect(0, 0, width, height);

  paddle.update(width);
  ball.update(bricks, paddle, width, height, dt);
}

document.addEventListener("pointermove", (e) => {
  paddle.x = e.clientX - bounds.left - paddle.w / 2;
});

document.addEventListener("pointerdown", (e) => {
  if(!playing) {
    ball.vel = {
      x: 300 * (Math.random() > 0.5 ? 1 : -1),
      y: -300 * (Math.random() * 0.8 + 1),
    };
    ball.len = 400;
    playing=true;
  }
  if (ball.vel.x === 0 && ball.vel.y === 0) {
    
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
    ball.vel = {
      x: 300 * (Math.random() > 0.5 ? 1 : -1),
      y: -300 * (Math.random() * 0.8 + 1),
    };
    ball.len = 400;
  }
});

window.addEventListener("resize", () => {
  bounds = canvas.getBoundingClientRect();
});
