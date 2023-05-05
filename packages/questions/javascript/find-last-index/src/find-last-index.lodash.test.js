import { findLastIndex } from 'lodash';

describe('findLastIndex', () => {
  const array = [1, 2, 3, 4, 5];

  test('returns the index of the last element that satisfies the predicate', () => {
    const predicate = (value) => value > 2;
    expect(findLastIndex(array, predicate)).toEqual(4);
  });

  test('returns -1 if no element satisfies the predicate', () => {
    const predicate = (value) => value > 5;
    expect(findLastIndex(array, predicate)).toEqual(-1);
  });

  test('returns -1 if the array is empty', () => {
    const predicate = (value) => value > 5;
    expect(findLastIndex([], predicate)).toEqual(-1);
  });

  test('starts the search from the given index', () => {
    const predicate = (value) => value < 4;
    expect(findLastIndex(array, predicate, 3)).toEqual(2);
  });

  test('handles negative fromIndex', () => {
    const predicate = (value) => value > 3;
    expect(findLastIndex(array, predicate, -2)).toEqual(3);
  });

  test('handles out of range index', () => {
    expect(findLastIndex(array, (value) => value > 3, 10)).toEqual(4);
    expect(findLastIndex(array, (value) => value % 2 === 0, -10)).toEqual(-1);
  });
});
