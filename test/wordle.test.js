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

test('play first attempt with correct guess', async () => {
  async function readGuess() {
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

  await play('FAVOR', readGuess, display);

  expect(displayCalled).toBe(true);
});

test('play first attempt with invalid guess', async () => {
  async function readGuess() {
    return 'FOR';
  }

  await expect(async () => await play('FAVOR', readGuess, undefined)).rejects.toThrow('Invalid guess');
});

test('play first attempt with non-winning guess', async () => {
  async function readGuess() {
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

  await play('FAVOR', readGuess, display);

  expect(displayCalled).toBe(true);
});

test('play second attempt with winning guess', async () => {
  const guesses = ['FAVOR', 'TESTS'];

  async function readGuess() {
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

  await play('FAVOR', readGuess, display);

  expect(displayCallCount).toBe(2);
});

test('play second attempt with non-winning guess', async () => {
  const guesses = ['BIZZY', 'TESTS'];

  async function readGuess() {
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

  await play('FAVOR', readGuess, display);

  expect(displayCallCount).toBe(2);
});


test('play third attempt with winning guess', async () => {
  const guesses = ['FAVOR', 'BIZZY', 'TESTS'];

  async function readGuess() {
    return guesses.pop();
  }

  const expectedReponses = [
    [3, WON, [EXACT, EXACT, EXACT, EXACT, EXACT], 'Awesome'],
    [2, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [1, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
  ];

  let displayCallCount = 0;

  function display(numberOfAttempts, status, matchResponse, message) {
    if (numberOfAttempts <= 3) {
      expect([numberOfAttempts, status, matchResponse, message]).toStrictEqual(expectedReponses.pop());
      displayCallCount += 1;
    }
  }

  await play('FAVOR', readGuess, display);

  expect(displayCallCount).toBe(3);
});

test('play fourth attempt with winning guess', async () => {
  const guesses = ['FAVOR', 'BIZZY', 'TESTS', 'SHIMS'];

  async function readGuess() {
    return guesses.pop();
  }

  const expectedReponses = [
    [4, WON, [EXACT, EXACT, EXACT, EXACT, EXACT], 'Yay'],
    [3, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [2, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [1, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
  ];

  let displayCallCount = 0;

  function display(numberOfAttempts, status, matchResponse, message) {
    if (numberOfAttempts <= 4) {
      expect([numberOfAttempts, status, matchResponse, message]).toStrictEqual(expectedReponses.pop());
      displayCallCount += 1;
    }
  }

  await play('FAVOR', readGuess, display);

  expect(displayCallCount).toBe(4);
});

test('play fifth attempt with winning guess', async () => {
  const guesses = ['FAVOR', 'BIZZY', 'TESTS', 'SHIMS', 'BIZZY'];

  async function readGuess() {
    return guesses.pop();
  }

  const expectedReponses = [
    [5, WON, [EXACT, EXACT, EXACT, EXACT, EXACT], 'Yay'],
    [4, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [3, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [2, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [1, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
  ];

  let displayCallCount = 0;

  function display(numberOfAttempts, status, matchResponse, message) {
    if (numberOfAttempts <= 5) {
      expect([numberOfAttempts, status, matchResponse, message]).toStrictEqual(expectedReponses.pop());
      displayCallCount += 1;
    }
  }

  await play('FAVOR', readGuess, display);

  expect(displayCallCount).toBe(5);
});

test('play sixth attempt with winning guess', async () => {
  const guesses = ['FAVOR', 'BIZZY', 'TESTS', 'SHIMS', 'BIZZY', 'TESTS'];

  async function readGuess() {
    return guesses.pop();
  }

  const expectedReponses = [
    [6, WON, [EXACT, EXACT, EXACT, EXACT, EXACT], 'Yay'],
    [5, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [4, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [3, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [2, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [1, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
  ];

  let displayCallCount = 0;

  function display(numberOfAttempts, status, matchResponse, message) {
    if (numberOfAttempts <= 6) {
      expect([numberOfAttempts, status, matchResponse, message]).toStrictEqual(expectedReponses.pop());
      displayCallCount += 1;
    }
  }

  await play('FAVOR', readGuess, display);

  expect(displayCallCount).toBe(6);
});

test('play sixth attempt with non-winning guess', async () => {
  const guesses = ['SHIMS', 'BIZZY', 'TESTS', 'SHIMS', 'BIZZY', 'TESTS'];

  async function readGuess() {
    return guesses.pop();
  }

  const expectedReponses = [
    [6, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], 'It was FAVOR, better luck next time'],
    [5, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [4, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [3, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [2, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
    [1, IN_PROGRESS, [NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH], ''],
  ];

  let displayCallCount = 0;

  function display(numberOfAttempts, status, matchResponse, message) {
    if (numberOfAttempts <= 6) {
      expect([numberOfAttempts, status, matchResponse, message]).toStrictEqual(expectedReponses.pop());
      displayCallCount += 1;
    }
  }

  await play('FAVOR', readGuess, display);

  expect(displayCallCount).toBe(6);
});

test('verify that readGuess is not called after the win on second attempt', async () => {
  const guesses = ['FAVOR', 'TESTS'];
  let guessCallCount = 0;

  async function readGuess() {
    guessCallCount += 1;
    return guesses.pop();
  }

  expect(guessCallCount).toBe(2);
});

test('verify that readGuess is not called after loss on sixth attempt', async () => {
  const guesses = ['SHIMS', 'BIZZY', 'TESTS', 'SHIMS', 'BIZZY', 'TESTS'];
  let guessCallCount = 0;

  async function readGuess() {
    guessCallCount += 1;
    return guesses.pop();
  }

  expect(guessCallCount).toBe(0);
});
