'use strict';

const Match = {
  EXACT: 'Exact',
  MATCH: 'Match',
  NO_MATCH: 'NO_MATCH'
};

const WORD_SIZE = 5;

function count_postion(guess, target, letter) {
  let count = 0;
  for (let i = 0; i < WORD_SIZE; i++) {
    if (guess[i] === letter && target[i] === letter)
      count++;
  }

  return count;
}


function count_until_position(position, word, letter) {
  let count = 0;
  for (let i = 0; i <= position; i++) {
    if (word[i] === letter)
      count++;
  }

  return count;
}


function tallyForPosition(position, guess, target) {
  const theLetter = guess[position];
  const numOccur = count_until_position(position, guess, theLetter);
  const non_exact = count_until_position(WORD_SIZE, target, theLetter) - count_postion(guess, target, theLetter);

  if (target[position] === guess[position]) {
    return 'Exact';
  } else if (non_exact >= numOccur) {
    return 'Match';
  } else {
    return 'NO_MATCH';
  }
}

function tally(guess, target) {
  const response = new Array(WORD_SIZE).fill('NO_MATCH');

  if (guess.length !== WORD_SIZE) {
    throw new Error('Invalid guess');
  }

  for (let i = 0; i < WORD_SIZE; i++) {
    response[i] = tallyForPosition(i, guess, target);
  }

  return response;
}

module.exports = { tally, Match };