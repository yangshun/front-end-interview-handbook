import { difference } from 'lodash';

/* eslint-disable no-undef */
describe('difference', () => {
  test('returns an empty array when the input array is empty', () => {
    expect(difference([], [1, 2, 3])).toEqual([]);
  });

  test('returns original array when the values array is empty', () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  test('returns an array of unique values that are present in array but not in values', () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
    expect(difference(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['a']);
    expect(difference([null, undefined, 1, NaN], [undefined, 2, 3])).toEqual([
      null,
      1,
      NaN,
    ]);
  });

  test('returns an empty array when all values in array are present in values', () => {
    expect(difference([1, 2, 3], [1, 2, 3])).toEqual([]);
    expect(difference(['a', 'b', 'c'], ['a', 'b', 'c'])).toEqual([]);
    expect(difference([null, undefined], [null, undefined])).toEqual([]);
  });

  test('handles input arrays containing NaN values', () => {
    expect(difference([1, NaN, 2], [NaN, 3, 4])).toEqual([1, 2]);
  });
});
