'use strict';

const Match = {
  EXACT: 'Exact',
  MATCH: 'Match',
  NO_MATCH: 'NO_MATCH'
};

const WORD_SIZE = 5;

function take(str) {
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
  const guess_count = take(guess);
  const target_count = take(target);

  if (guess.length !== WORD_SIZE) {
    throw new Error('Invalid guess');
  }

  for (let i = 0; i < WORD_SIZE; i++) {
    if (guess[i] === target[i]) {
      response[i] = Match.EXACT;
    } else {
      for (let j = 0; j < WORD_SIZE; j++) {
        if (guess[j] === target[i]) {
          if (guess_count[guess[j]] === target_count[target[i]]) {
            if (response[j] !== Match.EXACT) {
              response[j] = Match.MATCH;
            }
          } else {
            response[j] = Match.MATCH;
            break;
          }
        }
      }
    }
  }

  return response;
}

module.exports = { tally, Match };