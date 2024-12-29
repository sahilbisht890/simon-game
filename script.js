const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let isGameStarted = false;

const startBtn = document.getElementById("start-btn");
const gameOverBtn = document.getElementById("gameOver-btn");
const statusText = document.getElementById("status");
const scoreText = document.getElementById("score");


const buttons = document.querySelectorAll(".button");
const gameOverContainer = document.getElementById('game-over-container');

function nextLevel() {
  level++;
  statusText.textContent = `Level ${level}`;
  userSequence = [];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
  showLastColor();
}

function showLastColor() {
  const lastColor = gameSequence[gameSequence.length - 1];
  console.log('lastColor' , lastColor);
  setTimeout(() => {
    animateButton(lastColor);
  }, 1000);
}

function animateButton(color) {
  const button = document.getElementById(color);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 350);
}

function handleUserClick(event) {
  if(!isGameStarted)return ;
  const color = event.target.id;
  userSequence.push(color);
  animateButton(color);
  checkSequence();
}

function checkSequence() {
  const currentIndex = userSequence.length - 1;
  if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
    gameOver();
    return;
  }
  if (userSequence.length === gameSequence.length) {
    setTimeout(nextLevel, 1000);
  }
}

function gameOver() {
  gameOverContainer.style.display = 'flex';
  scoreText.textContent = `You reached Level ${level}.`;
  isGameStarted = false;
  gameSequence = [];
  level = 0;
  startBtn.style.display='inline-block'
  statusText.textContent ='';

}

startBtn.addEventListener("click", () => {
  if (!isGameStarted) {
    isGameStarted = true;
    buttons.forEach((button) => {
        button.style.cursor = "pointer";
      });
    startBtn.style.display='none'
    statusText.textContent = "Game Started!";
    nextLevel();
  }
});

gameOverBtn.addEventListener("click", () => {
    gameOverContainer.style.display = 'none';
  });


buttons.forEach((button) => {
  button.addEventListener("click", handleUserClick);
});
