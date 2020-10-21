'use strict';

let whoPlays = 'circle';

const circleCross = document.querySelector('.circle-cross');
const gameField = document.querySelectorAll('.game-plan button');

const changePlayer = () => {
  if (whoPlays === 'circle') {
    whoPlays = 'cross';
  } else if (whoPlays === 'cross') {
    whoPlays = 'circle';
  }
  circleCross.src = `images/${whoPlays}.svg`;
  circleCross.alt = `icon ${whoPlays}`;
};

const addSymbol = (event) => {
  event.target.classList.add(`game-field--${whoPlays}`);
  event.target.disabled = true;
  changePlayer();
};

for (let i = 0; i < gameField.length; i++) {
  gameField[i].addEventListener('click', addSymbol);
}
