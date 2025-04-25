import dropWhile from './drop-while';

describe('dropWhile', () => {
  test('empty array', () => {
    expect(dropWhile([], (value, _index, _array) => value < 3)).toEqual([]);
  });

  test('drop elements until predicate returns false', () => {
    expect(
      dropWhile([1, 2, 3, 4, 5], (value, _index, _array) => value < 3),
    ).toEqual([3, 4, 5]);
  });

  test('predicate always returns true', () => {
    expect(
      dropWhile([1, 2, 3, 4, 5], (_value, _index, _array) => true),
    ).toEqual([]);
  });

  test('predicate always returns false', () => {
    expect(
      dropWhile([1, 2, 3, 4, 5], (_value, _index, _array) => false),
    ).toEqual([1, 2, 3, 4, 5]);
  });

  test('should stop dropping once predicate is false', () => {
    expect(
      dropWhile([7, 6, 3, 7, 8], (value, _index, _array) => value > 5),
    ).toEqual([3, 7, 8]);
  });

  describe('required arguments are passed', () => {
    test('index is passed', () => {
      const array = [1, 2, 3, 4, 5];
      expect(dropWhile(array, (_value, index, _array) => index < 3)).toEqual([
        4, 5,
      ]);
    });

    test('array is passed', () => {
      const array = [20, 30, 40, 5, 6];
      expect(
        dropWhile(array, (value, _index, arr) => value > arr.length),
      ).toEqual([5, 6]);
    });
  });

  test('should not modify the original input array', () => {
    const array = [1, 2, 3, 4, 5];
    dropWhile(array, (value) => value > 3);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
});
