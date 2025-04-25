import dropWhile from './drop-while';

describe('dropWhile', () => {
  test('empty array', () => {
    expect(dropWhile([], (value, _index, _array) => value < 3)).toEqual([]);
  });

  test('drop some elements', () => {
    expect(
      dropWhile([1, 2, 3, 4, 5], (value, _index, _array) => value < 3),
    ).toEqual([3, 4, 5]);
  });

  test('drop everything', () => {
    expect(
      dropWhile([1, 2, 3, 4, 5], (_value, _index, _array) => true),
    ).toEqual([]);
  });
});
