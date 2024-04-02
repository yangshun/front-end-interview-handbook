import unionBy from './union-by';

describe('unionBy', () => {
  test('empty arrays', () => {
    expect(unionBy((o: any) => o.id, [], [])).toEqual([]);
  });

  test('primitive values with identity iteratee', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];
    expect(unionBy((value: any) => value, arr1, arr2)).toEqual([1, 2, 3, 4, 5]);
  });

  test('null and undefined values in arrays', () => {
    const arr1 = [null, undefined, 1];
    const arr2 = [1, null, 2];
    expect(unionBy((value: any) => value, arr1, arr2)).toEqual([
      null,
      undefined,
      1,
      2,
    ]);
  });

  test('arrays with mixed types', () => {
    const arr1 = [1, '1', true];
    const arr2 = ['1', 2, false];
    expect(unionBy((value: any) => value, arr1, arr2)).toEqual([
      1,
      '1',
      true,
      2,
      false,
    ]);
  });

  test('complex objects with custom function iteratee', () => {
    const arr1 = [
      { id: 'a', value: 1 },
      { id: 'b', value: 2 },
    ];
    const arr2 = [
      { id: 'a', value: 3 },
      { id: 'b', value: 2 },
    ];
    const iteratee = (obj: any) => obj.id + obj.value;
    expect(unionBy(iteratee, arr1, arr2)).toEqual([
      { id: 'a', value: 1 },
      { id: 'b', value: 2 },
      { id: 'a', value: 3 },
    ]);
  });

  test('handling of arrays with different lengths', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4, 5, 6];
    expect(unionBy((value: any) => value, arr1, arr2)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
  });

  test('arrays with complex nesting', () => {
    const arr1 = [
      [1, 2],
      [3, 4],
    ];
    const arr2 = [
      [3, 4],
      [5, 6],
    ];
    expect(unionBy(JSON.stringify, arr1, arr2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });
});
