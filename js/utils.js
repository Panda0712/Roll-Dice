import {
  getAllPlayerSectionElement,
  getHoldButton,
  getRollDiceButton,
} from './selectors.js';

// check win status
export function checkWin(playerScore) {
  return playerScore.innerText >= 100;
}

// get random dice when click
export function getRandomDice(rollDiceSrc) {
  const randomIndex = Math.floor(Math.random() * rollDiceSrc.length);
  return rollDiceSrc[randomIndex];
}

// get player section has active class
export function getActivePlayer() {
  const sectionPlayerElementList = getAllPlayerSectionElement();
  return Array.from(sectionPlayerElementList).find(x =>
    x.classList.contains('player--active')
  );
}

// toggle class active when click
export function toggleActivePlayer() {
  const sectionPlayerElementList = getAllPlayerSectionElement();
  sectionPlayerElementList.forEach(section => {
    section.classList.toggle('player--active');
  });
}

// disable 2 buttons when a player win
export function disableButtons() {
  const rollDiceButton = getRollDiceButton();
  const holdButton = getHoldButton();

  if (rollDiceButton && holdButton) {
    rollDiceButton.disabled = true;
    holdButton.disabled = true;
  }
}
