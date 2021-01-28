import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
import { updateScore } from "./game.js";

let food = getRandomPosition();
const EXPANSION_RATE = 1;
const SCORE_AWARDED = 100;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    updateScore(SCORE_AWARDED);
    food = getRandomPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
