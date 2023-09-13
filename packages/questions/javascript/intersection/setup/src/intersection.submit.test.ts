import intersection from './intersection';

describe('intersection', () => {
  test('empty array', () => {
    expect(intersection()).toEqual([]);
  });

  test('multiple arrays', () => {
    expect(intersection([1, 2, 3], [3, 4, 5], [3, 6, 7])).toEqual([3]);
    expect(
      intersection(['a', 'b', 'c'], ['b', 'c', 'd'], ['c', 'e', 'f']),
    ).toEqual(['c']);
  });

  test('one of the arrays is empty', () => {
    expect(intersection([], [1, 2, 3], [4, 5, 6])).toEqual([]);
    expect(intersection([1, 2, 3], [], [4, 5, 6])).toEqual([]);
    expect(intersection([1, 2, 3], [4, 5, 6], [])).toEqual([]);
  });

  test('no common elements', () => {
    expect(intersection([1, 2, 3], [4, 5, 6])).toEqual([]);
    expect(intersection([1, 2, 3], [4, 5, 6], [7, 8, 9])).toEqual([]);
  });

  test('common elements in the arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  test('duplicate values', () => {
    const actual = intersection([1, 1, 3, 2, 2], [5, 2, 2, 1, 4], [2, 1, 1]);
    expect(actual).toEqual([1, 2]);
  });

  test('single array', () => {
    const actual = intersection([1, 1, 3, 2, 2]);
    expect(actual).toEqual([1, 3, 2]);
  });

  test('different types of elements', () => {
    expect(intersection([1, 2, 3], [2, '3', true])).toEqual([2]);
    expect(
      intersection(['a', 'b', 'c'], [1, 'b', true], [false, 'b', 'c']),
    ).toEqual(['b']);
    expect(
      intersection([null, undefined], [undefined, NaN], [NaN, null]),
    ).toEqual([]);
  });
});
