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
});
