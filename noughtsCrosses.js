const board = document.getElementById("board");
let currentPlayer = null;
const firstPlayer = "first-player";
const secondPlayer = "second-player";
const boardFields = document.getElementsByClassName("field");
const restartButton = document.getElementById("restart");
let state = [];
let sign = null;
let isGameFinished = false;

window.onload = function() {
  createFields();
  init();
};

function init() {
  setStartingPlayer();
  highlightActivePlayer();
}

function createFields() {
  for (let i = 1; i < 10; i++) {
    const field = document.createElement("div");
    field.className = "field";
    field.id = "field-" + i;
    field.onclick = playGame;
    board.appendChild(field);
  }
}

function setStartingPlayer() {
  if (Math.round(Math.random(1, 2)) === 1) {
    currentPlayer = firstPlayer;
  } else {
    currentPlayer = secondPlayer;
  }
}

function highlightActivePlayer() {
  document.getElementById(currentPlayer).classList.add("active-player");
  currentPlayer === firstPlayer
    ? document.getElementById(secondPlayer).classList.remove("active-player")
    : document.getElementById(firstPlayer).classList.remove("active-player");
}

function playGame() {
  if (this.innerHTML !== "") return;
  if (isGameFinished) return;

  renderSign(this);

  if (checkIfWins() || checkIfDraw()) {
    isGameFinished = true;
    restartButton.style = "display: inline";
    if (checkIfWins()) {
      endWinGame();
    } else {
      endDrawGame();
    }
  } else {
    changeCurrentPlayer();
  }
}

function renderSign(field) {
  if (currentPlayer === firstPlayer) {
    sign = "x";
  } else {
    sign = "o";
  }
  field.innerHTML = sign;
  field.classList.add(sign);
  changeState(field.id, sign);
}

function changeState(id, sign) {
  state[id[6] - 1] = sign;
}

function checkIfWins() {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < combinations.length; i++) {
    if (compareFields(getRow(combinations[i]))) {
      winningRowIds = combinations[i];
      isGameFinished = true;
      return true, winningRowIds;
    }
  }
}

function compareFields(row) {
  return (
    row[0] != undefined &&
    row[0] === row[1] &&
    row[1] === row[2] &&
    row[0] === row[2]
  );
}

function getRow(line) {
  const row = [];
  for (let i = 0; i < line.length; i++) {
    row.push(state[line[i]]);
  }
  return row;
}

function checkIfDraw() {
  return state.length === 9 && !state.includes(undefined);
}

function endWinGame() {
  turnOffTheBoard();
  highlightWinnigRow();
}

function turnOffTheBoard() {
  for (let i = 0; i < boardFields.length; i++) {
    boardFields[i].classList.add("endgame-field");
  }
}

function highlightWinnigRow() {
  for (let i = 0; i < winningRowIds.length; i++) {
    boardFields[winningRowIds[i]].classList.add("winning-row");
  }
}

function clearBoard() {
  for (let i = 0; i < boardFields.length; i++) {
    boardFields[i].innerHTML = "";
    boardFields[i].classList.remove("x");
    boardFields[i].classList.remove("o");
    boardFields[i].classList.remove("endgame-field");
  }
  for (let i = 0; i < winningRowIds.length; i++) {
    boardFields[winningRowIds[i]].classList.remove("winning-row");
  }
}

function restartGame() {
  clearBoard();
  currentPlayer = null;
  state = [];
  sign = null;
  isGameFinished = false;
  document.getElementById("restart").style = "display: none";
  init();
}

function endDrawGame() {
  turnOffTheBoard();
}

function changeCurrentPlayer() {
  currentPlayer === firstPlayer
    ? (currentPlayer = secondPlayer)
    : (currentPlayer = firstPlayer);
  highlightActivePlayer();
}
