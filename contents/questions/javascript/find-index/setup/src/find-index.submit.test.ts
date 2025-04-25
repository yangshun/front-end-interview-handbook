import findIndex from './find-index';

describe('findIndex', () => {
  const basicArr = [5, 12, 8, 130, 44, 99, 32, 15];
  const mixedArr = [10, 'apple', 20, 'banana', 30, 'cherry', 40];
  const objArr = [{ id: 1 }, { id: 5 }, { id: 10 }, { id: 5 }, { id: 15 }];
  const searchArr = [5, 12, 8, 130, 44, 99, 32, 15]; // Indices 0-7

  describe('empty array', () => {
    test('empty array always returns -1', () => {
      expect(
        findIndex(
          [],
          (value: any, _index: number, _array: any[]) => value === 0,
        ),
      ).toBe(-1);
    });
    test('empty array with positive fromIndex', () => {
      expect(
        findIndex(
          [],
          (value: any, _index: number, _array: any[]) => value === 0,
          5,
        ),
      ).toBe(-1);
    });
    test('empty array with negative fromIndex', () => {
      expect(
        findIndex(
          [],
          (value: any, _index: number, _array: any[]) => value === 0,
          -5,
        ),
      ).toBe(-1);
    });
  });

  describe('basic functionality', () => {
    test('finds index of first even number', () => {
      expect(
        findIndex(
          [4, 12, 8, 130, 44],
          (num: number, _index: number, _array: number[]) => num % 2 === 0,
        ),
      ).toBe(0);
      expect(
        findIndex(
          basicArr,
          (num: number, _index: number, _array: number[]) => num % 2 === 0,
        ),
      ).toBe(1); // 12 is the first even
    });
    test('finds index of first odd number', () => {
      expect(
        findIndex(
          basicArr,
          (num: number, _index: number, _array: number[]) => num % 2 !== 0,
        ),
      ).toBe(0); // 5 is the first odd
      expect(
        findIndex(
          [4, 12, 8, 130, 44, 99],
          (num: number, _index: number, _array: number[]) => num % 2 !== 0,
        ),
      ).toBe(5); // 99 is the first odd
    });
    test('finds index of first string', () => {
      expect(
        findIndex(
          mixedArr,
          (val: any, _index: number, _array: any[]) => typeof val === 'string',
        ),
      ).toBe(1); // 'apple'
    });
    test('finds index of first string longer than 5 chars', () => {
      expect(
        findIndex(
          mixedArr,
          (val: any, _index: number, _array: any[]) =>
            typeof val === 'string' && val.length > 5,
        ),
      ).toBe(3); // 'banana'
    });
    test('finds index of first object with id > 5', () => {
      expect(
        findIndex(
          objArr,
          (obj: { id: number }, _index: number, _array: any[]) => obj.id > 5,
        ),
      ).toBe(2); // { id: 10 }
    });
    test('finds index using index parameter', () => {
      // Find first element whose value is less than its index
      expect(
        findIndex(
          [5, 4, 3, 2, 1],
          (val: number, index: number, _array: number[]) => val < index,
        ),
      ).toBe(3); // value 2 at index 3
    });
    test('finds index using array parameter', () => {
      // Find first element greater than the last element
      expect(
        findIndex(
          [10, 5, 20, 15, 18],
          (val: number, _index: number, arr: number[]) =>
            val > arr[arr.length - 1],
        ),
      ).toBe(2); // 20 > 18
    });
  });

  describe('no element passes test', () => {
    test('no element passes test (simple)', () => {
      expect(
        findIndex(
          [5, 12, 8, 130, 44],
          (num: number, _index: number, _array: number[]) => num > 200,
        ),
      ).toBe(-1);
    });
    test('no element passes test (type mismatch)', () => {
      expect(
        findIndex(
          [1, 2, 3, 4],
          (val: any, _index: number, _array: any[]) => typeof val === 'string',
        ),
      ).toBe(-1);
    });
    test('no element passes test (always false predicate)', () => {
      expect(
        findIndex(
          [1, 2, 3, 4],
          (_val: any, _index: number, _array: any[]) => false,
        ),
      ).toBe(-1);
    });
    test('no element passes test (object property)', () => {
      expect(
        findIndex(
          objArr,
          (obj: { id: number }, _index: number, _array: any[]) =>
            obj.id === 100,
        ),
      ).toBe(-1);
    });
  });

  describe('searches from given positive start index', () => {
    test('basic', () => {
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num % 2 === 0,
          1,
        ),
      ).toBe(1); // Start at 12, finds 12
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num % 10 === 0,
          2,
        ),
      ).toBe(3); // Start at 8, finds 130
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num % 2 === 0,
          4,
        ),
      ).toBe(4); // Start at 44, finds 44
    });
    test('searches from start index, finds later element', () => {
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num === 32,
          2,
        ),
      ).toBe(6); // Start at 8, find 32
    });
    test('searches from start index, finds element at start index', () => {
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num === 130,
          3,
        ),
      ).toBe(3); // Start at 130, find 130
    });
    test('searches from start index, no match found after start', () => {
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num === 5,
          1,
        ),
      ).toBe(-1); // Start at 12, look for 5, not found
    });
    test('using index predicate', () => {
      // Find first element where index > 5, starting search from index 4
      expect(
        findIndex(
          searchArr,
          (_val: number, index: number, _array: number[]) => index > 5,
          4,
        ),
      ).toBe(6); // Start at 44 (idx 4), check 99 (idx 5), find 32 (idx 6)
    });
  });

  describe('handles negative start index', () => {
    // searchArr = [5, 12, 8, 130, 44, 99, 32, 15]; // Length 8
    // Indices:    0   1  2    3   4   5   6   7
    // Negative:  -8  -7 -6   -5  -4  -3  -2  -1
    test('basic', () => {
      // Start at index 6 (-2), find num > 30 -> finds 32 at index 6
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num > 30,
          -2,
        ),
      ).toBe(6);
      // Start at index 4 (-4), find num < 50 -> finds 44 at index 4
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num < 50,
          -4,
        ),
      ).toBe(4);
    });
    test('negative start index -1 (last element)', () => {
      // Start at index 7 (-1), find num === 15 -> finds 15 at index 7
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num === 15,
          -1,
        ),
      ).toBe(7);
      // Start at index 7 (-1), find num > 100 -> returns -1
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num > 100,
          -1,
        ),
      ).toBe(-1);
    });
    test('negative start index -array.length (starts at 0)', () => {
      // Start at index 0 (-8), find num > 100 -> finds 130 at index 3
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num > 100,
          -8,
        ),
      ).toBe(3);
    });
    test('negative start index mid-array', () => {
      // Start at index 3 (-5), find num === 99 -> finds 99 at index 5
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num === 99,
          -5,
        ),
      ).toBe(5);
    });
    test('negative start index, no match found after start', () => {
      // Start at index 5 (-3), no number < 10 after that -> returns -1
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num < 10,
          -3,
        ),
      ).toBe(-1);
    });
  });

  describe('handles out of bound index', () => {
    // searchArr = [5, 12, 8, 130, 44, 99, 32, 15]; // Length 8
    test('positive out of bound index (start >= length)', () => {
      // Start at index 8 (length), should find nothing
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num >= 0,
          8,
        ),
      ).toBe(-1);
      // Start at index 10 (way out), should find nothing
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num >= 0,
          10,
        ),
      ).toBe(-1);
    });
    test('negative out of bound index (start < -length)', () => {
      // Start at index -10 (resolves to 0), find num > 100 -> finds 130 at index 3
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num > 100,
          -10,
        ),
      ).toBe(3);
      // Start at index -9 (resolves to 0), find first even -> finds 12 at index 1
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num % 2 === 0,
          -9,
        ),
      ).toBe(1);
    });
    test('negative out of bound index far below -length', () => {
      // Start at index -100 (resolves to 0), find num === 8 -> finds 8 at index 2
      expect(
        findIndex(
          searchArr,
          (num: number, _index: number, _array: number[]) => num === 8,
          -100,
        ),
      ).toBe(2);
    });
  });
});
