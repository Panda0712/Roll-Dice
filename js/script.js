'use strict';

import { rollDiceSrc } from './constants.js';

import {
  getImageElement,
  getNewGameButton,
  getRollDiceButton,
  getHoldButton,
  getScoreFirstPlayerTextField,
  getScoreSecondPlayerTextField,
  getCurrentScoreFirstPlayerTextField,
  getCurrentScoreSecondPlayerTextField,
  getAllPlayerSectionElement,
} from './selectors.js';

import {
  checkWin,
  getRandomDice,
  getActivePlayer,
  toggleActivePlayer,
  disableButtons,
} from './utils.js';

// Todo List
// handle 3 buttons click
// when a player win, change the background color of that player background
// when dice is one, change the player
// store the score when click hold button at each player
// a player win when that player hit the 100 scores first
// hit the roll dice many times at current of that player changes

function handleClickRollDice() {
  const imageElement = getImageElement();
  const activePlayer = getActivePlayer();
  const currentScorePlayer = activePlayer.querySelector('.current-score');

  imageElement.srcset = getRandomDice(rollDiceSrc);
  currentScorePlayer.innerText =
    Number.parseInt(currentScorePlayer.innerText) +
    Number.parseInt(imageElement.srcset.match(/\d+/g)[0]);
  if (Number.parseInt(imageElement.srcset.match(/\d+/g)[0]) === 1) {
    currentScorePlayer.innerText = 0;
    toggleActivePlayer();
  }
}

function handleRollDiceButton() {
  const rollDiceButton = getRollDiceButton();
  if (!rollDiceButton) return;

  rollDiceButton.addEventListener('click', handleClickRollDice);
}

function resetGame(
  rollDiceButton,
  holdButton,
  scoreFirstPlayer,
  scoreSecondPlayer,
  currentScoreFirstPlayer,
  currentScoreSecondPlayer,
  sectionPlayerElementList,
  imageElement
) {
  rollDiceButton.disabled = false;
  holdButton.disabled = false;
  scoreFirstPlayer.innerText = 0;
  scoreSecondPlayer.innerText = 0;
  currentScoreFirstPlayer.innerText = 0;
  currentScoreSecondPlayer.innerText = 0;
  imageElement.srcset = 'dice-5.png';
  sectionPlayerElementList.forEach(section => {
    section.classList.remove('player--active', 'player--winner');
  });
  sectionPlayerElementList[0].classList.add('player--active');
}

function handleNewGameButton() {
  const newGameButton = getNewGameButton();
  if (!newGameButton) return;

  newGameButton.addEventListener('click', () => {
    const rollDiceButton = getRollDiceButton();
    const holdButton = getHoldButton();
    const scoreFirstPlayer = getScoreFirstPlayerTextField();
    const scoreSecondPlayer = getScoreSecondPlayerTextField();
    const currentScoreFirstPlayer = getCurrentScoreFirstPlayerTextField();
    const currentScoreSecondPlayer = getCurrentScoreSecondPlayerTextField();
    const sectionPlayerElementList = getAllPlayerSectionElement();
    const imageElement = getImageElement();
    if (
      !rollDiceButton ||
      !holdButton ||
      !currentScoreSecondPlayer ||
      !currentScoreFirstPlayer ||
      !scoreFirstPlayer ||
      !scoreSecondPlayer ||
      !sectionPlayerElementList ||
      !imageElement
    )
      return;

    resetGame(
      rollDiceButton,
      holdButton,
      scoreFirstPlayer,
      scoreSecondPlayer,
      currentScoreFirstPlayer,
      currentScoreSecondPlayer,
      sectionPlayerElementList,
      imageElement
    );
  });
}

function handleHoldButton() {
  const holdButton = getHoldButton();
  if (!holdButton) return;

  holdButton.addEventListener('click', () => {
    const activePlayer = getActivePlayer();
    const playerScore = activePlayer.querySelector('.score');
    const currentScore = activePlayer.querySelector('.current-score');
    playerScore.innerText =
      Number.parseInt(playerScore.innerText) +
      Number.parseInt(currentScore.innerText);
    if (checkWin(playerScore)) {
      activePlayer.classList.add('player--winner');
      disableButtons();
      return;
    }

    currentScore.innerText = 0;
    toggleActivePlayer();
  });
}

(() => {
  handleRollDiceButton();
  handleNewGameButton();
  handleHoldButton();
})();
