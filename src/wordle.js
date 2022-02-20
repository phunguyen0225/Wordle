'use strict';

const Match = {
  EXACT: 'Exact',
  MATCH: 'Match',
  NO_MATCH: 'NO_MATCH'
};

const WORD_SIZE = 5;

function count_positional_matches(guess, target, letter) {
  return guess.split('')
    .filter((char, index) => target[index] === guess[index])
    .filter(char => char === letter)
    .length;
}


function count_until_position(position, word, letter) {
  return word.split('').slice(0, position + 1)
    .filter((char) => char === letter)
    .length;
}


function tallyForPosition(position, guess, target) {
  const theLetter = guess[position];
  const numOccur = count_until_position(position, guess, theLetter);
  const non_exact = count_until_position(WORD_SIZE, target, theLetter) - count_positional_matches(guess, target, theLetter);

  if (target[position] === guess[position]) {
    return Match.EXACT;
  }

  return non_exact >= numOccur ? Match.MATCH : Match.NO_MATCH;
}

function tally(guess, target) {
  const response = new Array(WORD_SIZE).fill('NO_MATCH');

  if (guess.length !== WORD_SIZE) {
    throw new Error('Invalid guess');
  }

  return guess.split('')
    .reduce((response, letter, i) => [...response, tallyForPosition(i, guess, target)], []);
}

module.exports = { tally, Match };