import heapSort from './heap-sort';

describe('heapSort', () => {
  test('empty', () => {
    expect(heapSort([])).toEqual([]);
  });

  test('one element', () => {
    expect(heapSort([1])).toEqual([1]);
  });

  test('two elements', () => {
    expect(heapSort([2, 1])).toEqual([1, 2]);
    expect(heapSort([1, 2])).toEqual([1, 2]);
  });

  test('more than two elements', () => {
    expect(heapSort([10, 2, 4])).toEqual([2, 4, 10]);
    expect(heapSort([4, 5, 6, 1, 2, 3])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(heapSort([1, 2, 3, 4, 5, 0])).toEqual([0, 1, 2, 3, 4, 5]);
    expect(heapSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(heapSort([5, 4, 3, 2, 1, 10, 9, 8, 7, 6])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(heapSort([98322, 3242, 876, -234, 34, 12331])).toEqual([
      -234, 34, 876, 3242, 12331, 98322,
    ]);
  });

  test('duplicate elements', () => {
    expect(heapSort([1, 1])).toEqual([1, 1]);
    expect(heapSort([2, 2, 2])).toEqual([2, 2, 2]);
    expect(heapSort([2, 1, 2])).toEqual([1, 2, 2]);
    expect(heapSort([1, 1, 1, 1, 1, 1])).toEqual([1, 1, 1, 1, 1, 1]);
    expect(heapSort([7, 2, 4, 3, 1, 2])).toEqual([1, 2, 2, 3, 4, 7]);
  });
});
