const nameInput = document.getElementById("newPlayer");
const currentPlayerName = document.querySelector(".current_player_name");
const colorModelSelect = document.getElementsByTagName("select")[0];
const currentColor = document.querySelector(".color_to_guess");
const colorCardsContainer = document.querySelector(".card_container");
const colorCards = Array.from(document.getElementsByClassName("card"));
const namesRow = document.getElementsByClassName("table_names")[0];
const scoresRow = document.getElementsByClassName("table_scores")[0];

let playerName;
let allPlayers = [];
let randomColor;
let score = 5;

const generateHexa = () => {
  const hexValues = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let hex = "#";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * hexValues.length);
    hex += hexValues[index];
  }
  return hex;
};

const generateRgb = () => {
  let o = Math.round,
    r = Math.random,
    s = 255;
  return `rgb(${o(r() * s)},${o(r() * s)},${o(r() * s)})`;
};

const randomIndex = Math.floor(Math.random() * 6);

const fillTheTabe = () => {
  const newScore = document.createElement("td");
  const newName = document.createElement("td");
  newScore.innerText = score;
  newName.innerText = playerName;
  namesRow.appendChild(newName);
  scoresRow.appendChild(newScore);
};

const newGame = () => {
  nameInput.classList.remove("hide");
  currentPlayerName.classList.add("hide");
  colorModelSelect.disabled = true;
  colorCardsContainer.classList.add("not_visible");
  currentColor.classList.add("not_visible");
  score = 5;
  colorModelSelect.selectedIndex = null;
  colorCards.forEach((card) => card.classList.remove("not_visible"));
};

// get player name

nameInput.addEventListener("submit", (e) => {
  e.preventDefault();
  playerName = nameInput.elements[0].value || "player1";
  e.target.reset();
  allPlayers = [...allPlayers, playerName];
  nameInput.classList.add("hide");
  currentPlayerName.classList.remove("hide");
  currentPlayerName.children[0].children[0].innerText = playerName;
  colorModelSelect.disabled = false;
});

colorModelSelect.addEventListener("change", (e) => {
  let selectedModel = e.target.value;
  console.log(selectedModel);
  selectedModel === "HEXA"
    ? (randomColor = generateHexa())
    : (randomColor = generateRgb());
  console.log(randomColor);
  currentColor.classList.remove("not_visible");
  colorCardsContainer.classList.remove("not_visible");
  currentColor.innerText = randomColor;
  colorModelSelect.disabled = true;

  //   fill cards

  selectedModel === "HEXA"
    ? colorCards.forEach((card) => (card.style.background = generateHexa()))
    : colorCards.forEach((card) => (card.style.background = generateRgb()));

  //  set current color to random card

  colorCards[randomIndex].style.background = randomColor;
  console.log(randomIndex);
});

// when card clicked check color

const checkColor = (e) => {
  const selectedCard = e.target;
  const selectedCardIndex = [...selectedCard.parentElement.children].indexOf(
    selectedCard
  );
  if (selectedCardIndex !== randomIndex) {
    score--;
    selectedCard.classList.add("not_visible");
  }
  if (selectedCardIndex === randomIndex) {
    if (scoresRow.children.length > 10) {
      scoresRow.removeChild(scoresRow.getElementsByTagName("td")[0]);
      namesRow.removeChild(namesRow.getElementsByTagName("td")[0]);
    }

    fillTheTabe();
    newGame();
  }
};

colorCards.forEach((card) => card.addEventListener("click", checkColor));
