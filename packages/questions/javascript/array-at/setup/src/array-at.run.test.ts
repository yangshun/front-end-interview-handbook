import './array-at';

describe('Array.prototype.myAt', () => {
  test('empty array', () => {
    expect([].myAt(0)).toBeUndefined();
    expect([].myAt(-1)).toBeUndefined();
    expect([].myAt(1)).toBeUndefined();
  });

  describe('one value', () => {
    const arr = [42];
    test('non-negative', () => {
      expect(arr.myAt(0)).toBe(42);
    });

    test('negative', () => {
      expect(arr.myAt(-1)).toBe(42);
    });

    test('out-of-range', () => {
      expect(arr.myAt(1)).toBeUndefined();
      expect(arr.myAt(2)).toBeUndefined();
      expect(arr.myAt(-2)).toBeUndefined();
    });
  });

  describe('two values', () => {
    const arr = [42, 79];

    test('non-negative', () => {
      expect(arr.myAt(0)).toBe(42);
      expect(arr.myAt(1)).toBe(79);
    });

    test('negative', () => {
      expect(arr.myAt(-1)).toBe(79);
      expect(arr.myAt(-2)).toBe(42);
    });

    test('out-of-range', () => {
      expect(arr.myAt(2)).toBeUndefined();
      expect(arr.myAt(3)).toBeUndefined();
      expect(arr.myAt(-3)).toBeUndefined();
      expect(arr.myAt(-4)).toBeUndefined();
    });
  });

  describe('multiple values', () => {
    const arr = [42, 79, 103];

    test('non-negative', () => {
      expect(arr.myAt(0)).toBe(42);
      expect(arr.myAt(1)).toBe(79);
      expect(arr.myAt(2)).toBe(103);
    });

    test('negative', () => {
      expect(arr.myAt(-1)).toBe(103);
      expect(arr.myAt(-2)).toBe(79);
      expect(arr.myAt(-3)).toBe(42);
    });

    test('out-of-range', () => {
      expect(arr.myAt(3)).toBeUndefined();
      expect(arr.myAt(4)).toBeUndefined();
      expect(arr.myAt(-4)).toBeUndefined();
      expect(arr.myAt(-5)).toBeUndefined();
    });
  });

  test('sparse arrays', () => {
    const arr = [1, 2, , 4];
    expect(arr.myAt(2)).toBeUndefined();
    expect(arr.myAt(-2)).toBeUndefined();
  });
});
