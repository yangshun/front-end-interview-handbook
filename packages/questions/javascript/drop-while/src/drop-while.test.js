import dropWhile from './drop-while';

describe('dropWhile', () => {
  test('empty array', () => {
    expect(dropWhile([], (value) => value < 3)).toEqual([]);
  });

  test('drop elements until predicate returns falsey', () => {
    expect(dropWhile([1, 2, 3, 4, 5], (value) => value < 3)).toEqual([3, 4, 5]);
  });

  test('predicate always returns truthy', () => {
    expect(dropWhile([1, 2, 3, 4, 5], () => true)).toEqual([]);
  });

  test('predicate always returns falsey', () => {
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

  test('should not modify the original input array', () => {
    const array = [1, 2, 3, 4, 5];
    dropWhile(array, (value) => value > 3);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
});
