import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";

import { update as updateFood, draw as drawFood } from "./food.js";

import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");
let gameOver = false;
let score = 0;
let startButton = document.getElementById("start");

startButton.onclick = function () {
  startGame();
};

function startGame() {
  console.log("STARTED");
  window.requestAnimationFrame(main);
}

function main(currentTime) {
  if (gameOver) {
    console.log("THE SCORE WAS:", score);
    if (confirm("Score:" + score + " PRESS OK TO GO BACK TO THE MENU")) {
      window.location = "/";
    }

    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;
  update();
  draw();
}

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  const scoreElement = document.createElement("P");
  scoreElement.innerText = "Score:" + score;
  scoreElement.classList.add("score");
  gameBoard.appendChild(scoreElement);
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

export function updateScore(sum) {
  score += sum;
}
