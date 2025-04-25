import intersectionBy from './intersection-by';

describe('intersectionBy', () => {
  test('empty arrays', () => {
    const arr1: Array<number> = [];
    const arr2: Array<number> = [1, 2, 3];
    const arr3: Array<number> = [];
    const iteratee = String;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual([]);
  });

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

  test('single array', () => {
    const arr1 = [1, 2.5, 3, 7.8];
    const iteratee = Math.floor;

    expect(intersectionBy(iteratee, arr1)).toEqual([1, 2.5, 3, 7.8]);
  });

  test('multiple intersections', () => {
    const arr1 = [1.2, 2.3, 3.4];
    const arr2 = [2.1, 1.2, 4.5];
    const arr3 = [1.2, 4.5, 2.3, 3.4];
    const iteratee = Math.floor;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual([1.2, 2.3]);
  });

  test('non-primitive values', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 2 }, { id: 3 }];
    const iteratee = (obj: { id: number }) => obj.id;

    expect(intersectionBy(iteratee, arr1, arr2)).toEqual([{ id: 2 }]);
  });

  test('different iteratee values', () => {
    const arr1 = ['apple', 'banana', 'pear'];
    const arr2 = ['orange', 'kiwi', 'banana'];
    const arr3 = ['grape', 'pear', 'watermelon'];
    const iteratee = (value: string) => value.length;

    expect(intersectionBy(iteratee, arr1, arr2, arr3)).toEqual(['pear']);
  });

  test('same iteratee values in one array', () => {
    expect(
      intersectionBy(
        (str) => str.toLowerCase(),
        ['apple', 'banana', 'ORANGE', 'orange'],
        ['Apple', 'Banana', 'Orange'],
      ),
    ).toEqual(['apple', 'banana', 'ORANGE']);
  });
});
