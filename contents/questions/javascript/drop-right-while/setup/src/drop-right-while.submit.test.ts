import dropRightWhile from './drop-right-while';

describe('dropRightWhile', () => {
  test('empty array', () => {
    expect(dropRightWhile([], (value, _index, _array) => value > 3)).toEqual(
      [],
    );
  });

  test('drop elements from the right until predicate returns false', () => {
    expect(
      dropRightWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 3),
    ).toEqual([1, 2, 3]);
  });

  test('predicate always returns true', () => {
    expect(
      dropRightWhile([1, 2, 3, 4, 5], (value, _index, _array) => value < 6),
    ).toEqual([]);
  });

  test('predicate always returns false', () => {
    expect(
      dropRightWhile([1, 2, 3, 4, 5], (value, _index, _array) => value < 0),
    ).toEqual([1, 2, 3, 4, 5]);
  });

  test('should stop dropping once predicate is false', () => {
    expect(
      dropRightWhile([1, 6, 3, 7, 8], (value, _index, _array) => value > 5),
    ).toEqual([1, 6, 3]);
  });

  describe('required arguments are passed', () => {
    test('index is passed', () => {
      const array = [1, 2, 3, 4, 5];
      expect(
        dropRightWhile(array, (_value, index, _array) => index >= 3),
      ).toEqual([1, 2, 3]);
    });

    test('array is passed', () => {
      const array = [20, 30, 40, 5, 4]; // length is 5
      expect(
        dropRightWhile(array, (value, _index, arr) => value <= arr.length),
      ).toEqual([20, 30, 40]);
    });
  });

  test('should not modify the original input array', () => {
    const array = [1, 2, 3, 4, 5];
    dropRightWhile(array, (value, _index, _array) => value > 3);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
});
