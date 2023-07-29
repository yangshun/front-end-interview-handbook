import { countBy } from 'lodash';

describe('countBy function', () => {
  test('handles non-empty arrays', () => {
    expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 4: 1, 6: 2 });
    expect(countBy(['one', 'two', 'three'], 'length')).toEqual({ 3: 2, 5: 1 });
  });

  test('handles single-element arrays', () => {
    expect(countBy([6.1], Math.floor)).toEqual({ 6: 1 });
    expect(countBy(['one'], 'length')).toEqual({ 3: 1 });
  });

  test('handles two-element arrays', () => {
    expect(countBy([6.1, 4.2], Math.floor)).toEqual({ 4: 1, 6: 1 });
    expect(countBy(['one', 'two'], 'length')).toEqual({ 3: 2 });
  });

  test('handles empty arrays', () => {
    expect(countBy([], Math.floor)).toEqual({});
  });

  test('does not mutate the original array and returns a new object', () => {
    const arr = [6.1, 4.2, 6.3];
    const result = countBy(arr, Math.floor);
    expect(result).toEqual({ 4: 1, 6: 2 });
    expect(arr).toEqual([6.1, 4.2, 6.3]); // ensure original array is unchanged
  });
});
