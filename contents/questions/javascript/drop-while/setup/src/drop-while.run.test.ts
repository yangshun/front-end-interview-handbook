import dropWhile from './drop-while';

describe('dropWhile', () => {
  test('empty array', () => {
    expect(dropWhile([], (value) => value < 3)).toEqual([]);
  });

  test('drop some elements', () => {
    expect(dropWhile([1, 2, 3, 4, 5], (value) => value < 3)).toEqual([3, 4, 5]);
  });

  test('drop everything', () => {
    expect(dropWhile([1, 2, 3, 4, 5], () => true)).toEqual([]);
  });
});
