import inRange from './in-range';

describe('inRange', () => {
  test('both `start` and `end` specified', () => {
    expect(inRange(1, 1, 5)).toBe(true);
    expect(inRange(3, 1, 5)).toBe(true);
    expect(inRange(0, 1, 5)).toBe(false);
    expect(inRange(5, 1, 5)).toBe(false);
  });

  test('differently signed `start` and positive `end`', () => {
    expect(inRange(-1, -2, 5)).toBe(true);
    expect(inRange(5, -2, 5)).toBe(false);
    expect(inRange(-1, 5, -2)).toBe(true);
  });

  test('only 2 arguments specified', () => {
    expect(inRange(3, 5)).toBe(true);
    expect(inRange(5, 5)).toBe(false);
    expect(inRange(6, 5)).toBe(false);
  });

  test('swap `start` and `end` when `start` > `end`', () => {
    expect(inRange(2, 5, 1)).toBe(true);
    expect(inRange(-3, -2, -6)).toBe(true);
  });

  test('floating point value', () => {
    expect(inRange(0.5, 5)).toBe(true);
    expect(inRange(1.2, 1, 5)).toBe(true);
    expect(inRange(5.2, 5)).toBe(false);
    expect(inRange(0.5, 1, 5)).toBe(false);
    expect(inRange(-4.5, -2, -6)).toBe(true);
  });
});
