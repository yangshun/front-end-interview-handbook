import dropRightWhile from './drop-right-while';

describe('dropRightWhile', () => {
  test('empty array', () => {
    expect(dropRightWhile([], (value) => value > 3)).toEqual([]);
  });

  test('drop elements from the right until predicate returns false', () => {
    expect(dropRightWhile([1, 2, 3, 4, 5], (value) => value > 3)).toEqual([
      1, 2, 3,
    ]);
  });

  test('predicate always returns true', () => {
    expect(dropRightWhile([1, 2, 3, 4, 5], (value) => value < 6)).toEqual([]);
  });

  test('predicate always returns false', () => {
    expect(dropRightWhile([1, 2, 3, 4, 5], (value) => value < 0)).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  test('sparse arrays', () => {
    expect(
      dropRightWhile([1, , 3, 4, 5], (value) => value === undefined),
    ).toEqual([1, , 3, 4, 5]);
  });

  describe('required arguments are passed', () => {
    test('index is passed', () => {
      const array = [1, 2, 3, 4, 5];
      expect(dropRightWhile(array, (_, index) => index >= 3)).toEqual([
        1, 2, 3,
      ]);
    });

    test('array is passed', () => {
      const array = [20, 30, 40, 5, 4];
      expect(
        dropRightWhile(array, (value, _, arr) => value <= arr.length),
      ).toEqual([20, 30, 40]);
    });
  });

  test('should not modify the original input array', () => {
    const array = [1, 2, 3, 4, 5];
    dropRightWhile(array, (value) => value > 3);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
});
