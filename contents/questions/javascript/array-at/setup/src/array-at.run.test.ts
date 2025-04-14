import './array-at';

describe('Array.prototype.myAt', () => {
  const arr = [42, 34];

  test('first value', () => {
    expect(arr.myAt(0)).toBe(42);
  });

  test('last value', () => {
    expect(arr.myAt(-1)).toBe(34);
  });

  test('out of bounds', () => {
    expect(arr.myAt(2)).toBeUndefined();
  });
});
