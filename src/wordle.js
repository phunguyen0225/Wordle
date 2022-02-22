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
  const message = ['', 'Amazing', 'Splendid', 'Awesome', 'Yay', 'Yay', 'Yay', 'It was FAVOR, better luck next time'];
  return status === Status.WON ? message[attempts] : '';
}


async function play(target, readGuess, display) {
  for (let i = 1; i <= 6; i++) {
    const guess = await readGuess();
    if (guess === undefined) {
      break;
    }
    const response = tally(guess, target);
    const status = determineStatus(response);
    const message = createMessage(i, status);
    display(i, status, response, message);
    if (status === Status.WON) {
      break;
    }
    if (status === Status.IN_PROGRESS && i === 6) {
      display(i, status, response, 'It was FAVOR, better luck next time');
    }
  }
}

module.exports = { tally, Match, Status, play };