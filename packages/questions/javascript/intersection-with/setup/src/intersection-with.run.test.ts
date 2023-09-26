import intersectionWith from './intersection-with';

describe('intersectionWith', () => {
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
});
