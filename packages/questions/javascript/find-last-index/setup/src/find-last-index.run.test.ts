import findLastIndex from './find-last-index';

describe('findLastIndex', () => {
  test('empty array', () => {
    expect(findLastIndex([], (value) => value > 5)).toEqual(-1);
  });

  test('returns the index of the last element that satisfies the predicate', () => {
    expect(findLastIndex([1, 2, 3, 4, 5], (value) => value > 2)).toEqual(4);
  });

  test('no element satisfies the predicate', () => {
    expect(findLastIndex([1, 2, 3, 4, 5], (value) => value > 5)).toEqual(-1);
  });
});
