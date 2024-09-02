import mergeSort from './merge-sort';

describe('mergeSort', () => {
  test('empty', () => {
    expect(mergeSort([])).toEqual([]);
  });

  test('one element', () => {
    expect(mergeSort([1])).toEqual([1]);
  });

  test('two elements', () => {
    expect(mergeSort([2, 1])).toEqual([1, 2]);
    expect(mergeSort([1, 2])).toEqual([1, 2]);
  });

  test('more than two elements', () => {
    expect(mergeSort([10, 2, 4])).toEqual([2, 4, 10]);
    expect(mergeSort([4, 5, 6, 1, 2, 3])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(mergeSort([1, 2, 3, 4, 5, 0])).toEqual([0, 1, 2, 3, 4, 5]);
    expect(mergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(mergeSort([5, 4, 3, 2, 1, 10, 9, 8, 7, 6])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(mergeSort([98322, 3242, 876, -234, 34, 12331])).toEqual([
      -234, 34, 876, 3242, 12331, 98322,
    ]);
  });

  test('duplicate elements', () => {
    expect(mergeSort([1, 1])).toEqual([1, 1]);
    expect(mergeSort([2, 2, 2])).toEqual([2, 2, 2]);
    expect(mergeSort([2, 1, 2])).toEqual([1, 2, 2]);
    expect(mergeSort([1, 1, 1, 1, 1, 1])).toEqual([1, 1, 1, 1, 1, 1]);
    expect(mergeSort([7, 2, 4, 3, 1, 2])).toEqual([1, 2, 2, 3, 4, 7]);
  });
});
