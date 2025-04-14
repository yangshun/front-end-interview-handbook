import countBy from './count-by';

describe('countBy', () => {
  test('empty array', () => {
    expect(countBy([], Math.floor)).toEqual({});
  });

  test('undefined keys', () => {
    expect(countBy([{ n: 1 }, { n: 2 }], (o: any) => o.m)).toEqual({
      undefined: 2,
    });
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
      expect(
        countBy(['one', 'two', 'three'], (val: string) => 'length'),
      ).toEqual({
        length: 3,
      });
    });
  });

  test('does not mutate the original array', () => {
    const arr = [6.1, 4.2, 6.3];
    const copy = arr.slice();
    const result = countBy(arr, Math.floor);
    expect(result).toEqual({ 4: 1, 6: 2 });
    expect(arr).toEqual(copy); // Ensure original array is unchanged
  });
});
