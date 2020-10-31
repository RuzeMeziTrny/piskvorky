'use strict';

let whoPlays = 'circle';

const circleCross = document.querySelector('.circle-cross');
const gameFields = document.querySelectorAll('.game-plan button');

const addSymbol = (event) => {
  event.target.classList.add(`game-field--${whoPlays}`);
  event.target.disabled = true;
};

const changePlayer = () => {
  if (whoPlays === 'circle') {
    whoPlays = 'cross';
  } else if (whoPlays === 'cross') {
    whoPlays = 'circle';
  }
  circleCross.src = `images/${whoPlays}.svg`;
  circleCross.alt = `icon ${whoPlays}`;
};

const boardSize = 10;

const getPosition = (field) => {
  for (let i = 0; i < gameFields.length; i++) {
    if (field === gameFields[i]) {
      return {
        row: Math.floor(i / boardSize),
        column: i % boardSize,
      };
    }
  }
};

const getField = (row, column) => {
  return gameFields[row * boardSize + column];
};

const getSymbol = (field) => {
  if (field.classList.contains(`game-field--circle`)) {
    return 'circle';
  } else if (field.classList.contains(`game-field--cross`)) {
    return 'cross';
  }
};

const symbolsToWin = 5;

const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  // Koukni doleva nahoru
  let inDiagonal = 1;
  let row = origin.row;
  let column = origin.column;
  while (
    column > 0 &&
    row > 0 &&
    symbol === getSymbol(getField(row - 1, column - 1))
  ) {
    inDiagonal++;
    column--;
    row--;
  }

  // Koukni doprava dolu
  row = origin.row;
  column = origin.column;
  while (
    column < boardSize - 1 &&
    row < boardSize - 1 &&
    symbol === getSymbol(getField(row + 1, column + 1))
  ) {
    inDiagonal++;
    column++;
    row++;
  }

  if (inDiagonal >= symbolsToWin) {
    return true;
  }

  // Koukni doprava nahoru
  inDiagonal = 1;
  row = origin.row;
  column = origin.column;
  while (
    column < boardSize - 1 &&
    row > 0 &&
    symbol === getSymbol(getField(row - 1, column + 1))
  ) {
    inDiagonal++;
    column++;
    row--;
  }

  // Koukni doleva dolu
  row = origin.row;
  column = origin.column;
  while (
    column > 0 &&
    row < boardSize - 1 &&
    symbol === getSymbol(getField(row + 1, column - 1))
  ) {
    inDiagonal++;
    column--;
    row++;
  }

  if (inDiagonal >= symbolsToWin) {
    return true;
  }

  return false;
};

for (let i = 0; i < gameFields.length; i++) {
  gameFields[i].addEventListener('click', (event) => {
    addSymbol(event);
    if (isWinningMove(event.target)) {
      const winningMessage = () => {
        if (confirm(`${whoPlays} wins, congratulations :)`)) {
          location.reload();
        }
      };
      setTimeout(winningMessage, 100);
    } else {
      changePlayer();
    }
  });
}
