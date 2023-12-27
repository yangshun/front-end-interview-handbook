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

  test('starts the search from the given index', () => {
    expect(findLastIndex([1, 2, 3, 4, 5], (value) => value < 4, 3)).toEqual(2);
  });

  test('handles negative fromIndex', () => {
    expect(findLastIndex([1, 2, 3, 4, 5], (value) => value > 3, -2)).toEqual(3);
  });

  test('handles negative out of bound indices', () => {
    expect(
      findLastIndex([1, 2, 3, 4, 5], (value) => value % 2 === 0, -10),
    ).toEqual(-1);
    expect(findLastIndex([1, 2, 3, 4, 5], (value) => value < 2, -100)).toEqual(
      0,
    );
  });

  test('handles out of bound indices', () => {
    expect(findLastIndex([1, 2, 3, 4, 5], (value) => value > 3, 10)).toEqual(4);
  });
});
