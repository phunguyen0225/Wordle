'use strict';

const Match = {
  EXACT: 'Exact',
  MATCH: 'Match',
  NO_MATCH: 'NO_MATCH'
};

const Status = { 'WON': 'Won', 'IN_PROGRESS': 'In progress' };

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


function determineStatus(response) {
  return response.filter(match => match === Match.EXACT)
    .length === WORD_SIZE ? Status.WON : Status.IN_PROGRESS;
}


function createMessage(attempts, status) {
  const message = ['', 'Amazing', 'Splendid', 'Awesome', 'Yay'];
  return status === Status.WON ? message[attempts] : '';
}


function play(target, readGuess, display) {
  const guess = readGuess();
  const response = tally(guess, target);
  const status = determineStatus(response);
  const message = createMessage(1, status);
  display(1, status, response, message);

  if (status === Status.IN_PROGRESS) {
    const guess = readGuess();
    const response = tally(guess, target);
    const status = determineStatus(response);
    const message = createMessage(2, status);
    display(2, status, response, message);
  }
}

module.exports = { tally, Match, Status, play };