import chunk from './chunk';

describe('chunk', () => {
  test('empty array', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  test('single-element array', () => {
    expect(chunk([1], 3)).toEqual([[1]]);
  });

  test('size of 1', () => {
    expect(chunk([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  test('splits into chunks of the given size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11],
    ]);
  });

  test('default size', () => {
    expect(chunk(['A', 'B', 'C'])).toEqual([['A'], ['B'], ['C']]);
  });

  test('size larger than the array length', () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  test('input array is not modified', () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const output = chunk(input, 3);
    output[0][0] = 100;
    expect(input[0]).toEqual(1);
  });
});
