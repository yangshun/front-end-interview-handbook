import dropWhile from './drop-while';

/* eslint-disable no-undef */
describe('dropWhile', () => {
  test('should drop elements until predicate returns falsey', () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (value) => value < 3;
    expect(dropWhile(array, predicate)).toEqual([3, 4, 5]);
  });

  test('should return empty array if predicate always returns truthy', () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = () => true;
    expect(dropWhile(array, predicate)).toEqual([]);
  });

  test('should return entire array if predicate always returns falsey', () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = () => false;
    expect(dropWhile(array, predicate)).toEqual([1, 2, 3, 4, 5]);
  });

  test('should handle sparse arrays', () => {
    const array = [1, , 3, 4, 5];
    const predicate = (value) => value === undefined;
    expect(dropWhile(array, predicate)).toEqual([1, , 3, 4, 5]);
  });
});
