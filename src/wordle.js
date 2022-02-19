'use strict';

const Match = {
  EXACT: 'Exact',
  MATCH: 'Match',
  NO_MATCH: 'NO_MATCH'
};

const WORD_SIZE = 5;

function count(str) {
  return str.split('').reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});
}

function tally(guess, target) {
  const response = new Array(WORD_SIZE).fill('NO_MATCH');
  const target_count = count(target);

  if (guess.length !== WORD_SIZE) {
    throw new Error('Invalid guess');
  }

  for (let i = 0; i < WORD_SIZE; i++) {
    if (guess[i] === target[i]) {
      response[i] = Match.EXACT;
      target_count[guess[i]]--;
    }
  }

  for (let i = 0; i < WORD_SIZE; i++) {
    if (response[i] === Match.NO_MATCH && target_count[guess[i]]) {
      response[i] = Match.MATCH;
      target_count[guess[i]]--;
    }
  }

  return response;
}

module.exports = { tally, Match };