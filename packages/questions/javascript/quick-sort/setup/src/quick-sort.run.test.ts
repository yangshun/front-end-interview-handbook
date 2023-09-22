import quickSort from './quick-sort';

describe('quickSort', () => {
  test('empty', () => {
    expect(quickSort([])).toEqual([]);
  });

  test('one element', () => {
    expect(quickSort([1])).toEqual([1]);
  });

  test('two elements', () => {
    expect(quickSort([2, 1])).toEqual([1, 2]);
    expect(quickSort([1, 2])).toEqual([1, 2]);
  });
});
