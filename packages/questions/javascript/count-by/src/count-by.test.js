import countBy from './count-by-alt';

describe('countBy', () => {
  test('empty array', () => {
    expect(countBy([], Math.floor)).toEqual({});
  });

  describe('function iteratees', () => {
    test('single-element arrays', () => {
      expect(countBy([6.1], Math.floor)).toEqual({ 6: 1 });
    });

    test('two-element arrays', () => {
      expect(countBy([6.1, 4.2], Math.floor)).toEqual({ 4: 1, 6: 1 });
    });

    test('multiple element arrays', () => {
      expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 4: 1, 6: 2 });
    });

    test('keys that are also properties', () => {
      expect(countBy(['one', 'two', 'three'], (val) => 'length')).toEqual({
        length: 3,
      });
    });
  });

  describe('property iteratees', () => {
    test('single-element arrays', () => {
      expect(countBy(['one'], 'length')).toEqual({ 3: 1 });
    });

    test('two-element arrays', () => {
      expect(countBy(['one', 'two'], 'length')).toEqual({ 3: 2 });
    });

    test('multiple element arrays', () => {
      expect(countBy(['one', 'two', 'three'], 'length')).toEqual({
        3: 2,
        5: 1,
      });
    });
  });

  test('does not mutate the original array', () => {
    const arr = [6.1, 4.2, 6.3];
    const copy = arr.slice();
    expect(result).toEqual({ 4: 1, 6: 2 });
    expect(arr).toEqual(copy); // Ensure original array is unchanged
  });
});
