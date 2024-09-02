import insertionSort from './insertion-sort';

describe('insertionSort', () => {
  test('empty', () => {
    expect(insertionSort([])).toEqual([]);
  });

  test('one element', () => {
    expect(insertionSort([1])).toEqual([1]);
  });

  test('two elements', () => {
    expect(insertionSort([2, 1])).toEqual([1, 2]);
    expect(insertionSort([1, 2])).toEqual([1, 2]);
  });
});
