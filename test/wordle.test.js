'use strict';

const { tally, Match: { EXACT, MATCH, NO_MATCH } } = require('../src/wordle.js');

test('canary test', () => {
  expect(true).toBe(true);
});

//Feedback: How about?
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

// test('GUESS: FAVOR, TARGET: FAVOR', () => {
//   expect(tally('FAVOR', 'FAVOR')).toStrictEqual([EXACT, EXACT, EXACT, EXACT, EXACT]);
// });

// test('GUESS: TESTS, TARGET: FAVOR', () => {
//   expect(tally('TESTS', 'FAVOR')).toStrictEqual([NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH]);
// });

// test('GUESS: RAPID, TARGET: FAVOR', () => {
//   expect(tally('RAPID', 'FAVOR')).toStrictEqual([MATCH, EXACT, NO_MATCH, NO_MATCH, NO_MATCH]);
// });

// test('GUESS: MAYOR, TARGET: FAVOR', () => {
//   expect(tally('MAYOR', 'FAVOR')).toStrictEqual([NO_MATCH, EXACT, NO_MATCH, EXACT, EXACT]);
// });

// test('GUESS: FOR, TARGET: FAVOR)', () => {
//   expect(() => tally('FOR', 'FAVOR')).toThrow('Invalid guess');
// });

// test('GUESS: FERVER, TARGET: FAVOR', () => {
//   expect(() => tally('FERVER', 'FAVOR')).toThrow('Invalid guess');
// });

// test('GUESS: RIVER, TARGET: FAVOR', () => {
//   expect(tally('RIVER', 'FAVOR')).toStrictEqual([NO_MATCH, NO_MATCH, EXACT, NO_MATCH, EXACT]);
// });

// test('GUESS: AMAST, TARGET: FAVOR', () => {
//   expect(tally('AMAST', 'FAVOR')).toStrictEqual([MATCH, NO_MATCH, NO_MATCH, NO_MATCH, NO_MATCH]);
// });

// test('GUESS: SKILL, TARGET: SKILL', () => {
//   expect(tally('SKILL', 'SKILL')).toStrictEqual([EXACT, EXACT, EXACT, EXACT, EXACT]);
// });

// test('GUESS: SWIRL, TARGET: SKILL', () => {
//   expect(tally('SWIRL', 'SKILL')).toStrictEqual([EXACT, NO_MATCH, EXACT, NO_MATCH, EXACT]);
// });

// test('GUESS: CIVIL, TARGET: SKILL', () => {
//   expect(tally('CIVIL', 'SKILL')).toStrictEqual([NO_MATCH, MATCH, NO_MATCH, NO_MATCH, EXACT]);
// });

// test('GUESS: SHIMS, TARGET: SKILL', () => {
//   expect(tally('SHIMS', 'SKILL')).toStrictEqual([EXACT, NO_MATCH, EXACT, NO_MATCH, NO_MATCH]);
// });

// test('GUESS: SILLY, TARGET: SKILL', () => {
//   expect(tally('SILLY', 'SKILL')).toStrictEqual([EXACT, MATCH, MATCH, EXACT, NO_MATCH]);
// });

// test('GUESS: SLICE, TARGET: SKILL', () => {
//   expect(tally('SLICE', 'SKILL')).toStrictEqual([EXACT, MATCH, EXACT, NO_MATCH, NO_MATCH]);
// });

// test('GUESS: ABASE, TARGET: SAGAS', () => {
//   expect(tally('ABASE', 'SAGAS')).toStrictEqual([MATCH, NO_MATCH, MATCH, MATCH, NO_MATCH]);
// });