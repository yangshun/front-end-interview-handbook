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
});
