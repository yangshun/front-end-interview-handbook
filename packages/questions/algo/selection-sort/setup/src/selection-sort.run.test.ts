import selectionSort from './selection-sort';

describe('selectionSort', () => {
  test('empty', () => {
    expect(selectionSort([])).toEqual([]);
  });

  test('one element', () => {
    expect(selectionSort([1])).toEqual([1]);
  });

  test('two elements', () => {
    expect(selectionSort([2, 1])).toEqual([1, 2]);
    expect(selectionSort([1, 2])).toEqual([1, 2]);
  });
});
