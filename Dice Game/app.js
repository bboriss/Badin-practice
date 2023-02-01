// names input references
const names = document.getElementById("namesInput");
let playerOne;
let playerTwo;
// counter 3 2 1
const gameCounter = document.getElementsByClassName("counter")[0];
const counterNumber = document.getElementsByClassName("number")[0];

// game
const game = document.getElementsByClassName("game")[0];
const firstName = document.getElementsByClassName("firstPlayerName")[0];
const secondName = document.getElementsByClassName("secondPlayerName")[0];
const rollBtn = document.getElementsByClassName("rollBtn")[0];
const storeBtn = document.getElementsByClassName("storeBtn")[0];
// scores
const scoreFirst = document.getElementsByClassName("score_left")[0];
const currentFirst = document.getElementsByClassName("current_left")[0];
const scoreSecond = document.getElementsByClassName("score_right")[0];
const currentSecond = document.getElementsByClassName("current_right")[0];
// active
const active1 = document.getElementsByClassName("player_1")[0];
const active2 = document.getElementsByClassName("player_2")[0];
// dice images
const diceFirst = document.getElementsByClassName("diceFirst")[0];
const diceSecond = document.getElementsByClassName("diceSecond")[0];
// winner container
const winnerWindow = document.getElementsByClassName("winner")[0];
const playerWinner = document.getElementsByClassName("player-winner")[0];
// play indicator
const leftIndicator = document.getElementsByClassName(
  "play_indicator_first"
)[0];
const rightIndicator = document.getElementsByClassName(
  "play_indicator_second"
)[0];
// play again
const playAgain = document.getElementsByClassName("playAgain")[0];

const firstPlayerMemory = {
  score: 0,
  current: 0,
};

const secondPlayerMemory = {
  score: 0,
  current: 0,
};

names.addEventListener("submit", (e) => {
  e.preventDefault();
  playerOne = names.elements[0].value || "player1";
  playerTwo = names.elements[1].value || "player2";
  e.target.reset();
  names.classList.add("hide");
  gameCounter.classList.remove("hide");
  const counterInterval = setInterval(counter, 1000);
  setTimeout(() => {
    gameCounter.classList.add("hide");
    clearInterval(counterInterval);
    game.classList.remove("hide");
    firstName.innerText = playerOne;
    secondName.innerText = playerTwo;
  }, 3000);
});

function counter() {
  counterNumber.innerText = counterNumber.innerText - 1;
}

rollBtn.addEventListener("click", () => {
  if (active1.classList.contains("active")) {
    randomNumber = Math.floor(Math.random() * 6) + 1;
    if (randomNumber === 1) {
      firstPlayerMemory.current = 0;
      diceFirst.src = `./dice imgages/dice-1.png`;
      currentFirst.innerText = `Current = 0`;
      active1.classList.remove("active");
      active2.classList.add("active");
      leftIndicator.classList.add("hide");
      rightIndicator.classList.remove("hide");
    } else {
      firstPlayerMemory.current += randomNumber;
      diceFirst.src = `./dice imgages/dice-${randomNumber}.png`;
      currentFirst.innerText = `Current = ${firstPlayerMemory.current}`;
    }
  } else {
    randomNumber = Math.floor(Math.random() * 6) + 1;
    if (randomNumber === 1) {
      secondPlayerMemory.current = 0;
      diceSecond.src = `./dice imgages/dice-1.png`;
      currentSecond.innerText = `Current = 0`;
      active2.classList.remove("active");
      active1.classList.add("active");
      leftIndicator.classList.remove("hide");
      rightIndicator.classList.add("hide");
    } else {
      secondPlayerMemory.current += randomNumber;
      diceSecond.src = `./dice imgages/dice-${randomNumber}.png`;
      currentSecond.innerText = `Current = ${secondPlayerMemory.current}`;
    }
  }
});

storeBtn.addEventListener("click", () => {
  if (active1.classList.contains("active")) {
    scoreFirst.innerText = `Score = ${(firstPlayerMemory.score +=
      firstPlayerMemory.current)}`;
    if (firstPlayerMemory.score >= 50) {
      game.classList.add("hide");
      winnerWindow.classList.remove("hide");
      playerWinner.innerText = `${playerOne} won`;
    }
    currentFirst.innerText = "Current = 0";
    firstPlayerMemory.current = 0;
    active1.classList.remove("active");
    active2.classList.add("active");
    leftIndicator.classList.add("hide");
    rightIndicator.classList.remove("hide");
  } else {
    scoreSecond.innerText = `Score = ${(secondPlayerMemory.score +=
      secondPlayerMemory.current)}`;
    if (secondPlayerMemory.score >= 50) {
      game.classList.add("hide");
      winnerWindow.classList.remove("hide");
      playerWinner.innerText = `${playerTwo} won`;
    }
    currentSecond.innerText = "Current = 0";
    secondPlayerMemory.current = 0;
    active2.classList.remove("active");
    active1.classList.add("active");
    leftIndicator.classList.remove("hide");
    rightIndicator.classList.add("hide");
  }
});

playAgain.addEventListener("click", () => {
  playerOne = null;
  playerTwo = null;
  firstPlayerMemory.score = 0;
  firstPlayerMemory.current = 0;
  secondPlayerMemory.score = 0;
  secondPlayerMemory.current = 0;
  winnerWindow.classList.add("hide");
  names.classList.remove("hide");
  active1.classList.add("active");
  active2.classList.remove("active");
  leftIndicator.classList.remove("hide");
  rightIndicator.classList.add("hide");
  scoreFirst.innerText = "Score = 0";
  scoreSecond.innerText = "Score = 0";
  diceFirst.src = `./dice imgages/dice-1.png`;
  diceSecond.src = `./dice imgages/dice-1.png`;
  counterNumber.innerText = 3;
});
