const board = document.getElementById("board");
const status = document.getElementById("status");
let cells = Array(9).fill(null);
let currentPlayer = "X"; // Player = X, Computer = O
let gameOver = false;

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = val;
    cell.addEventListener("click", () => handleClick(idx));
    board.appendChild(cell);
  });
}

function handleClick(index) {
  if (cells[index] || gameOver || currentPlayer !== "X") return;
  cells[index] = "X";
  drawBoard();
  if (checkGameOver()) return;
  currentPlayer = "O";
  status.textContent = "Computer's turn...";
  setTimeout(computerMove, 500);
}

function computerMove() {
  let emptyIndices = cells.map((val, idx) => val === null ? idx : null).filter(idx => idx !== null);
  if (emptyIndices.length === 0) return;

  // Basic AI: pick random empty cell
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  cells[randomIndex] = "O";
  drawBoard();
  if (checkGameOver()) return;
  currentPlayer = "X";
  status.textContent = "Your turn (X)";
}

function checkGameOver() {
  if (checkWin("X")) {
    status.textContent = "You win!";
    gameOver = true;
    return true;
  } else if (checkWin("O")) {
    status.textContent = "Computer wins!";
    gameOver = true;
    return true;
  } else if (cells.every(Boolean)) {
    status.textContent = "It's a draw!";
    gameOver = true;
    return true;
  }
  return false;
}

function checkWin(player) {
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] === player && cells[b] === player && cells[c] === player;
  });
}

function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  status.textContent = "Your turn (X)";
  drawBoard();
}

drawBoard();
