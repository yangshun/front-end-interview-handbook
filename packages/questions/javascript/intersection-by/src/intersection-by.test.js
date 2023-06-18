import intersectionBy from './intersection-by';

describe('intersectionBy', () => {
  test('should return the intersection of arrays based on iteratee function', () => {
    const arr1 = [2.1, 1.2];
    const arr2 = [2.3, 3.4];
    const arr3 = [4.5, 2.6];
    const iteratee = Math.floor;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual([2.1]);
  });

  test('should handle empty arrays', () => {
    const arr1 = [];
    const arr2 = [1, 2, 3];
    const arr3 = [];
    const iteratee = String;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual([]);
  });

  test('should handle arrays with no intersection', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const arr3 = [7, 8, 9];
    const iteratee = String;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual([]);
  });

  test('should handle arrays with multiple intersections', () => {
    const arr1 = [1.2, 2.3, 3.4];
    const arr2 = [2.1, 1.2, 4.5];
    const arr3 = [1.2, 4.5, 2.3, 3.4];
    const iteratee = Math.floor;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual([1.2, 2.3]);
  });

  test('should handle arrays with non-primitive values', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const arr1 = [obj1, obj2];
    const arr2 = [obj2, obj3];
    const iteratee = (obj) => obj.id;

    expect(intersectionBy(iteratee, arr1, arr2)).toEqual([obj2]);
  });

  it('should handle arrays with different iteratee values', () => {
    const arr1 = ['apple', 'banana', 'pear'];
    const arr2 = ['orange', 'kiwi', 'banana'];
    const arr3 = ['grape', 'pear', 'watermelon'];
    const iteratee = (value) => value.length;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual(['pear']);
  });
});
