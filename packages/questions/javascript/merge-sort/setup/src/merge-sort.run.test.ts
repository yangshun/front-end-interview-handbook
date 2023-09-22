import sort from './merge-sort';

describe('mergeSort', () => {
  test('empty', () => {
    expect(sort([])).toEqual([]);
  });

  test('one element', () => {
    expect(sort([1])).toEqual([1]);
  });

  test('two elements', () => {
    expect(sort([2, 1])).toEqual([1, 2]);
    expect(sort([1, 2])).toEqual([1, 2]);
  });
});
