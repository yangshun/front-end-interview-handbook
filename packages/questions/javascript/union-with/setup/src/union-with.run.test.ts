import unionWith from './union-with';

describe('unionWith', () => {
  test('empty array', () => {
    expect(unionWith((a, b) => a === b, [])).toEqual([]);
  });

  test('string iteratee', () => {
    expect(
      unionWith(
        (a: any, b: any) => a.x === b.x,
        [{ x: 1 }],
        [{ x: 2 }, { x: 1 }],
      ),
    ).toEqual([{ x: 1 }, { x: 2 }]);
  });

  test('function iteratee', () => {
    const arr1 = [2.1, 1.2];
    const arr2 = [2.3, 3.4];
    const arr3 = [4.5, 2.6];

    expect(
      unionWith(
        (a: number, b: number) => Math.floor(a) === Math.floor(b),
        arr1,
        arr2,
        arr3,
      ),
    ).toEqual([2.1, 1.2, 3.4, 4.5]);
  });
});
