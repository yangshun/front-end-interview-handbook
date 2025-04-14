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
});
