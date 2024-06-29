// get section player element
export function getAllPlayerSectionElement() {
  return document.querySelectorAll('.player');
}

// get new game button
export function getNewGameButton() {
  return document.querySelector('.btn.btn--new');
}

// get roll dice button
export function getRollDiceButton() {
  return document.querySelector('.btn.btn--roll');
}

// get image element
export function getImageElement() {
  return document.querySelector('.dice');
}

// get hold button
export function getHoldButton() {
  return document.querySelector('.btn.btn--hold');
}

// get score 1 text field
export function getScoreFirstPlayerTextField() {
  return document.getElementById('score--0');
}

// get score 2 text field
export function getScoreSecondPlayerTextField() {
  return document.getElementById('score--1');
}

// get current score 1 text field
export function getCurrentScoreFirstPlayerTextField() {
  return document.getElementById('current--0');
}

// get current score 2 text field
export function getCurrentScoreSecondPlayerTextField() {
  return document.getElementById('current--1');
}
