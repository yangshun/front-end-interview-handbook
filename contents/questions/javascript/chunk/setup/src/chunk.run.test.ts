import chunk from './chunk';

describe('chunk', () => {
  test('empty array', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  test('single-element array', () => {
    expect(chunk([1], 3)).toEqual([[1]]);
  });

  test('splits into chunks', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11],
    ]);
  });
});
