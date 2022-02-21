'use strict';

const { tally, Match: { EXACT, MATCH, NO_MATCH }, Status: { WON, IN_PROGRESS }, play } = require('../src/wordle.js');

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

  expect(() => play('FAVOR', readGuess, undefined)).toThrow('Invalid guess');
});

test('play first attempt with non-winning guess', () => {
  function readGuess() {
    return 'TESTS';
  }

  let displayCalled = false;

  function display(numberOfAttempts, status, matchResponse, message) {
    if (numberOfAttempts === 1) {
      expect(numberOfAttempts).toEqual(1);
      expect(status).toEqual(IN_PROGRESS);
      expect(matchResponse).toStrictEqual([NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH]);
      expect(message).toEqual('');
      displayCalled = true;
    }
  }

  play('FAVOR', readGuess, display);

  expect(displayCalled).toBe(true);
});

test('play second attempt with winning guess', () => {
  const guesses = ['FAVOR', 'TESTS'];

  function readGuess() {
    return guesses.pop();
  }

  const expectedReponses = [
    [2, WON, [EXACT, EXACT, EXACT, EXACT, EXACT], 'Splendid'],
    [1, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
  ];

  let displayCallCount = 0;

  function display(numberOfAttempts, status, matchResponse, message) {
    if (numberOfAttempts <= 2) {
      expect([numberOfAttempts, status, matchResponse, message]).toStrictEqual(expectedReponses.pop());
      displayCallCount += 1;
    }
  }

  play('FAVOR', readGuess, display);

  expect(displayCallCount).toBe(2);
});

test('play second attempt with non-winning guess', () => {
  const guesses = ['BIZZY', 'TESTS'];

  function readGuess() {
    return guesses.pop();
  }

  const expectedReponses = [
    [2, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [1, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
  ];

  let displayCallCount = 0;

  function display(numberOfAttempts, status, matchResponse, message) {
    if (numberOfAttempts <= 2) {
      expect([numberOfAttempts, status, matchResponse, message]).toStrictEqual(expectedReponses.pop());
      displayCallCount += 1;
    }
  }

  play('FAVOR', readGuess, display);

  expect(displayCallCount).toBe(2);
});
