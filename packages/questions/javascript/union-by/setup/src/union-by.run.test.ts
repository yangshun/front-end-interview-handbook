import unionBy from './union-by';

describe('unionBy', () => {
  test('empty array', () => {
    expect(unionBy((o: any) => o.x, [])).toEqual([]);
  });

  test('string iteratee', () => {
    expect(unionBy((o: any) => o.x, [{ x: 1 }], [{ x: 2 }, { x: 1 }])).toEqual([
      { x: 1 },
      { x: 2 },
    ]);
  });

  test('function iteratee', () => {
    const arr1 = [2.1, 1.2];
    const arr2 = [2.3, 3.4];
    const arr3 = [4.5, 2.6];
    const iteratee = Math.floor;

    expect(unionBy(iteratee, arr1, arr2, arr3)).toEqual([2.1, 1.2, 3.4, 4.5]);
  });
});
