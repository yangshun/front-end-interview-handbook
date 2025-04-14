import dropRightWhile from './drop-right-while';

describe('dropRightWhile', () => {
  test('empty array', () => {
    expect(dropRightWhile([], (value) => value > 3)).toEqual([]);
  });

  test('drop some elements', () => {
    expect(dropRightWhile([1, 2, 3, 4, 5], (value) => value > 3)).toEqual([
      1, 2, 3,
    ]);
  });

  test('drop everything', () => {
    expect(dropRightWhile([1, 2, 3, 4, 5], (value) => value < 6)).toEqual([]);
  });
});
