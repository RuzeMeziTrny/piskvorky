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
        column: fieldIndex % boardSize,
      };
    }
  }
};

const getField = (row, column) => {
  return gameFields[row * boardSize + column];
};

const getSymbol = (field) => {
  if (field.className === `game-field--${whoPlays}`) {
    return whoPlays;
  }
};

for (let i = 0; i < gameFields.length; i++) {
  gameFields[i].addEventListener('click', (event) => {
    addSymbol(event);
    changePlayer();
  });
}
