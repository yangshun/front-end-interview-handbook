import dropWhile from './drop-while';

describe('dropWhile', () => {
  test('empty array', () => {
    expect(dropWhile([], (value) => value < 3)).toEqual([]);
  });

  test('drop elements until predicate returns false', () => {
    expect(dropWhile([1, 2, 3, 4, 5], (value) => value < 3)).toEqual([3, 4, 5]);
  });

  test('predicate always returns true', () => {
    expect(dropWhile([1, 2, 3, 4, 5], () => true)).toEqual([]);
  });

  test('predicate always returns false', () => {
    expect(dropWhile([1, 2, 3, 4, 5], () => false)).toEqual([1, 2, 3, 4, 5]);
  });

  test('sparse arrays', () => {
    expect(dropWhile([1, , 3, 4, 5], (value) => value === undefined)).toEqual([
      1,
      ,
      3,
      4,
      5,
    ]);
  });

  describe('required arguments are passed', () => {
    test('index is passed', () => {
      const array = [1, 2, 3, 4, 5];
      expect(dropWhile(array, (_, index) => index < 3)).toEqual([4, 5]);
    });

    test('array is passed', () => {
      const array = [20, 30, 40, 5, 6];
      expect(dropWhile(array, (value, _, arr) => value > arr.length)).toEqual([
        5, 6,
      ]);
    });
  });

  test('should not modify the original input array', () => {
    const array = [1, 2, 3, 4, 5];
    dropWhile(array, (value) => value > 3);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
});
