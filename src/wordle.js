'use strict';

const Match = {
  EXACT: 'Exact',
  MATCH: 'Match',
  NO_MATCH: 'NO_MATCH'
};

const Status = { 'WON': 'Won', 'WRONG': 'Wrong' };

const WORD_SIZE = 5;

function countPositionalMatches(guess, target, letter) {
  return guess.split('')
    .filter((char, index) => target[index] === guess[index])
    .filter(char => char === letter)
    .length;
}


function countUntilPosition(position, word, letter) {
  return word.split('').slice(0, position + 1)
    .filter((char) => char === letter)
    .length;
}


function tallyForPosition(position, guess, target) {
  const theLetter = guess[position];
  const guessOccurTilPosition = countUntilPosition(position, guess, theLetter);
  const nonExactOccurInTarget = countUntilPosition(WORD_SIZE, target, theLetter) - countPositionalMatches(guess, target, theLetter);

  if (target[position] === guess[position]) {
    return Match.EXACT;
  }

  return nonExactOccurInTarget >= guessOccurTilPosition ? Match.MATCH : Match.NO_MATCH;
}

function tally(guess, target) {
  if (guess.length !== WORD_SIZE) {
    throw new Error('Invalid guess');
  }

  return guess.split('')
    .reduce((response, letter, i) => [...response, tallyForPosition(i, guess, target)], []);
}


function play(target, readGuess, display) {
  const response = tally(readGuess(), target);
  const responseMatch = new Array(WORD_SIZE).fill('Exact');
  for (let i = 0; i < WORD_SIZE; i++) {
    if (responseMatch[i] === response[i]) {
      const displayOutput = display(1, Status.WON, response, 'Amazing');
    } else {
      const displayOutput = display(1, Status.WRONG, response, 'Try again');
    }
  }
}

module.exports = { tally, Match, Status, play };