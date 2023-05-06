import dropRightWhile from './drop-right-while';

describe('dropRightWhile', () => {
  test('empty array', () => {
    expect(dropRightWhile([], (value) => value > 3)).toEqual([]);
  });

  test('drop elements from the right until predicate returns falsey', () => {
    expect(dropRightWhile([1, 2, 3, 4, 5], (value) => value > 3)).toEqual([
      1, 2, 3,
    ]);
  });

  test('predicate always returns falsey', () => {
    expect(dropRightWhile([1, 2, 3, 4, 5], (value) => value < 0)).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  test('predicate always returns truthy', () => {
    expect(dropRightWhile([1, 2, 3, 4, 5], (value) => value < 6)).toEqual([]);
  });

  test('should not modify the original input array', () => {
    const array = [1, 2, 3, 4, 5];
    dropRightWhile(array, (value) => value > 3);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
});
