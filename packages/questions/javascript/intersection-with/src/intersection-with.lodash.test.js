import { intersectionWith } from 'lodash';

import intersectionWith from './intersection-with';

describe('intersectionWith', () => {
  test('should return an empty array when no arrays are provided', () => {
    const actual = intersectionWith((x, y) => true);
    expect(actual).toEqual([]);
  });

  test('should return an empty array when any of the arrays is empty', () => {
    const actual = intersectionWith([], [1, 2, 3], [4, 5, 6], (x, y) => true);
    expect(actual).toEqual([]);
  });

  test('should return an empty array when there are no common elements', () => {
    const actual = intersectionWith(
      [(1, 2, 3)],
      [4, 5, 6],
      [7, 8, 9],
      (x, y) => x == y,
    );
    expect(actual).toEqual([]);
  });

  test('should return the intersection of two arrays', () => {
    const arr1 = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ];
    const arr2 = [
      { x: 2, y: 3 },
      { x: 4, y: 5 },
      { x: 5, y: 6 },
    ];

    const comparator = (a, b) => a.x === b.x && a.y === b.y;

    const actual = intersectionWith(arr1, arr2, comparator);
    const expected = [{ x: 2, y: 3 }];

    expect(actual).toEqual(expected);
  });

  test('should return the intersection of multiple arrays using a comparator', () => {
    const arr1 = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ];
    const arr2 = [
      { x: 2, y: 3 },
      { x: 4, y: 5 },
      { x: 5, y: 6 },
    ];
    const arr3 = [
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
      { x: 6, y: 7 },
    ];

    const comparator = (a, b) => a.x === b.x && a.y === b.y;

    const actual = intersectionWith(arr1, arr2, arr3, comparator);
    const expected = [{ x: 2, y: 3 }];

    expect(actual).toEqual(expected);
  });

  test('should return the intersection of arrays with different lengths', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4, 5];
    const arr3 = [3, 4, 5, 6, 7];

    const actual = intersectionWith(arr1, arr2, arr3, (x, y) => x == y);
    const expected = [3];

    expect(actual).toEqual(expected);
  });

  test('should return the intersection of arrays with single elements', () => {
    const arr1 = [{ x: 1, y: 2 }];
    const arr2 = [{ x: 2, y: 3 }];
    const arr3 = [{ x: 3, y: 4 }];

    const comparator = (a, b) => a.x === b.x && a.y === b.y;
    const actual = intersectionWith(arr1, arr2, arr3, comparator);
    expect(actual).toEqual([]);
  });
});
