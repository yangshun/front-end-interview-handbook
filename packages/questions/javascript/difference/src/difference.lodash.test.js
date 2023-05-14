import { difference } from 'lodash';

describe('difference', () => {
  test('empty input array', () => {
    expect(difference([], [])).toEqual([]);
    expect(difference([], [1, 2, 3])).toEqual([]);
  });

  test('values array is empty', () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  test('unique values that are present in array but not in values', () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
    expect(difference(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['a']);
    expect(difference([null, undefined, 1, NaN], [undefined, 2, 3])).toEqual([
      null,
      1,
      NaN,
    ]);
  });

  test('all values in array are present in values', () => {
    expect(difference([1, 2, 3], [1, 2, 3])).toEqual([]);
    expect(difference(['a', 'b', 'c'], ['a', 'b', 'c'])).toEqual([]);
    expect(difference([null, undefined], [null, undefined])).toEqual([]);
  });

  test('NaN values', () => {
    expect(difference([1, NaN, 2], [NaN, 3, 4])).toEqual([1, 2]);
  });
});
