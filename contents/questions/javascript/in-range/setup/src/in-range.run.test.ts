import inRange from './in-range';

describe('inRange', () => {
  test('both `start` and `end` specified', () => {
    expect(inRange(1, 1, 5)).toBe(true);
    expect(inRange(0, 1, 5)).toBe(false);
  });

  test('only 2 arguments specified', () => {
    expect(inRange(3, 5)).toBe(true);
    expect(inRange(6, 5)).toBe(false);
  });

  test('swap `start` and `end` when `start` > `end`', () => {
    expect(inRange(2, 5, 1)).toBe(true);
    expect(inRange(-3, -2, -6)).toBe(true);
  });
});
