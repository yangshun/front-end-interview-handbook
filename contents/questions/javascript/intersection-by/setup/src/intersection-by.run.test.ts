import intersectionBy from './intersection-by';

describe('intersectionBy', () => {
  test('intersection of arrays based on iteratee function', () => {
    const arr1 = [2.1, 1.2];
    const arr2 = [2.3, 3.4];
    const arr3 = [4.5, 2.6];
    const iteratee = Math.floor;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual([2.1]);
  });

  test('no intersection', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const arr3 = [7, 8, 9];
    const iteratee = String;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual([]);
  });

  test('multiple intersections', () => {
    const arr1 = [1.2, 2.3, 3.4];
    const arr2 = [2.1, 1.2, 4.5];
    const arr3 = [1.2, 4.5, 2.3, 3.4];
    const iteratee = Math.floor;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual([1.2, 2.3]);
  });
});
