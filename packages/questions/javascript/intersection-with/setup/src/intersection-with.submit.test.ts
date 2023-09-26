import intersectionWith from './intersection-with';

describe('intersectionWith', () => {
  test('no arrays are provided', () => {
    const actual = intersectionWith((x, y) => true);
    expect(actual).toEqual([]);
  });

  test('empty arrays', () => {
    const actual = intersectionWith((x, y) => true, [], [1, 2, 3], [4, 5, 6]);
    expect(actual).toEqual([]);
  });

  test('no common elements', () => {
    const actual = intersectionWith(
      (x, y) => x === y,
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    );
    expect(actual).toEqual([]);
  });

  test('two arrays', () => {
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

    const comparator = (
      a: { x: number; y: number },
      b: { x: number; y: number },
    ) => a.x === b.x && a.y === b.y;

    const actual = intersectionWith(comparator, arr1, arr2);
    const expected = [{ x: 2, y: 3 }];

    expect(actual).toEqual(expected);
  });

  test('multiple arrays using a comparator', () => {
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

    const comparator = (
      a: { x: number; y: number },
      b: { x: number; y: number },
    ) => a.x === b.x && a.y === b.y;

    const actual = intersectionWith(comparator, arr1, arr2, arr3);
    const expected = [{ x: 2, y: 3 }];

    expect(actual).toEqual(expected);
  });

  test('arrays with different lengths', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4, 5];
    const arr3 = [3, 4, 5, 6, 7];

    const actual = intersectionWith((x, y) => x == y, arr1, arr2, arr3);
    const expected = [3];

    expect(actual).toEqual(expected);
  });

  test('arrays with single elements', () => {
    const arr1 = [{ x: 1, y: 2 }];
    const arr2 = [{ x: 2, y: 3 }];
    const arr3 = [{ x: 3, y: 4 }];

    const comparator = (
      a: { x: number; y: number },
      b: { x: number; y: number },
    ) => a.x === b.x && a.y === b.y;
    const actual = intersectionWith(comparator, arr1, arr2, arr3);
    expect(actual).toEqual([]);
  });
});
