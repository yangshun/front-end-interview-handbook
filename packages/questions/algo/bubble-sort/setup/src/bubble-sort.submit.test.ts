import bubbleSort from './bubble-sort';

describe('bubbleSort', () => {
  test('empty', () => {
    expect(bubbleSort([])).toEqual([]);
  });

  test('one element', () => {
    expect(bubbleSort([1])).toEqual([1]);
  });

  test('two elements', () => {
    expect(bubbleSort([2, 1])).toEqual([1, 2]);
    expect(bubbleSort([1, 2])).toEqual([1, 2]);
  });

  test('more than two elements', () => {
    expect(bubbleSort([10, 2, 4])).toEqual([2, 4, 10]);
    expect(bubbleSort([4, 5, 6, 1, 2, 3])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(bubbleSort([1, 2, 3, 4, 5, 0])).toEqual([0, 1, 2, 3, 4, 5]);
    expect(bubbleSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(bubbleSort([5, 4, 3, 2, 1, 10, 9, 8, 7, 6])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(bubbleSort([98322, 3242, 876, -234, 34, 12331])).toEqual([
      -234, 34, 876, 3242, 12331, 98322,
    ]);
  });

  test('duplicate elements', () => {
    expect(bubbleSort([1, 1])).toEqual([1, 1]);
    expect(bubbleSort([2, 2, 2])).toEqual([2, 2, 2]);
    expect(bubbleSort([2, 1, 2])).toEqual([1, 2, 2]);
    expect(bubbleSort([1, 1, 1, 1, 1, 1])).toEqual([1, 1, 1, 1, 1, 1]);
    expect(bubbleSort([7, 2, 4, 3, 1, 2])).toEqual([1, 2, 2, 3, 4, 7]);
  });
});
