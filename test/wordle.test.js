'use strict';

const { tally, Match: { EXACT, MATCH, NO_MATCH }, Status: { WON, WRONG }, play } = require('../src/wordle.js');

test('canary test', () => {
  expect(true).toBe(true);
});

[
  ['FAVOR', 'FAVOR', [EXACT, EXACT, EXACT, EXACT, EXACT]],
  ['TESTS', 'FAVOR', [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH]],
  ['RAPID', 'FAVOR', [MATCH, EXACT, NO_MATCH, NO_MATCH, NO_MATCH]],
  ['MAYOR', 'FAVOR', [NO_MATCH, EXACT, NO_MATCH, EXACT, EXACT]],
  ['RIVER', 'FAVOR', [NO_MATCH, NO_MATCH, EXACT, NO_MATCH, EXACT]],
  ['AMAST', 'FAVOR', [MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH]],
  ['SKILL', 'SKILL', [EXACT, EXACT, EXACT, EXACT, EXACT]],
  ['SWIRL', 'SKILL', [EXACT, NO_MATCH, EXACT, NO_MATCH, EXACT]],
  ['CIVIL', 'SKILL', [NO_MATCH, MATCH, NO_MATCH, NO_MATCH, EXACT]],
  ['SHIMS', 'SKILL', [EXACT, NO_MATCH, EXACT, NO_MATCH, NO_MATCH]],
  ['SILLY', 'SKILL', [EXACT, MATCH, MATCH, EXACT, NO_MATCH]],
  ['SLICE', 'SKILL', [EXACT, MATCH, EXACT, NO_MATCH, NO_MATCH]],
  ['ABASE', 'SAGAS', [MATCH, NO_MATCH, MATCH, MATCH, NO_MATCH]]

].forEach(([guess, answer, expectedResponse]) => {
  test(`tally guess ${guess} for answer ${answer}`, () => {
    expect(tally(guess, answer)).toStrictEqual(expectedResponse);
  });
});

[
  ['FOR', 'FAVOR', 'Invalid guess'],
  ['FERVER', 'FAVOR', 'Invalid guess']
].forEach(([guess, answer, expectedResponse]) => {
  test(`tally guess ${guess} for answer ${answer}`, () => {
    expect(() => tally(guess, answer)).toThrow(expectedResponse);
  });
});

test('play first attempt with correct guess', () => {
  function readGuess() {
    return 'FAVOR';
  }

  let displayCalled = false;

  function display(numberOfAttempts, status, matchResponse, message) {
    expect(numberOfAttempts).toEqual(1);
    expect(status).toEqual(WON);
    expect(matchResponse).toStrictEqual([EXACT, EXACT, EXACT, EXACT, EXACT]);
    expect(message).toEqual('Amazing');
    displayCalled = true;
  }

  play('FAVOR', readGuess, display);
  expect(displayCalled).toBe(true);
});

test('play first attempt with invalid guess', () => {
  function readGuess() {
    return 'FOR';
  }

  let displayCalled = false;

  function display(numberOfAttempts, status, matchResponse, message) {
    expect(numberOfAttempts).toEqual(0);
    expect(status).toEqual(WRONG);
    expect(matchResponse).toStrictEqual([NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH]);
    expect(message).toEqual('Try again');
    displayCalled = true;
  }

  expect(() => play('FAVOR', readGuess, display)).toThrow('Invalid guess');
  expect(displayCalled).toBe(false);
});

test('play first attempt with non-winning guess', () => {
  function readGuess() {
    return 'TESTS';
  }

  let displayCalled = false;

  function display(numberOfAttempts, status, matchResponse, message) {
    expect(numberOfAttempts).toEqual(1);
    expect(status).toEqual(WRONG);
    expect(matchResponse).toStrictEqual([NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH]);
    expect(message).toEqual('Try again');
    displayCalled = true;
  }

  play('FAVOR', readGuess, display);
  expect(displayCalled).toBe(true);
});
