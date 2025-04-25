import findLastIndex from './find-last-index';

describe('findLastIndex', () => {
  test('empty array', () => {
    expect(findLastIndex([], (value) => value > 5)).toEqual(-1);
  });

  test('simple array', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(findLastIndex(arr, (value) => value > 2)).toEqual(4);
  });

  test('no element satisfies the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(findLastIndex(arr, (value) => value > 5)).toEqual(-1);
  });

  test('starts the search from the given index', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(findLastIndex(arr, (value) => value < 4, 3)).toEqual(2); // Checks 4(false), 3(true) -> index 2
  });

  test('handles negative fromIndex', () => {
    const arr = [1, 2, 3, 4, 5];
    // fromIndex = -2 resolves to index 3 (5 + -2 = 3)
    // Checks index 3: 4 > 3 is true. Returns 3.
    expect(findLastIndex(arr, (value) => value > 3, -2)).toEqual(3);
  });

  test('handles negative out of bound indices correctly', () => {
    const arr = [1, 2, 3, 4, 5];
    // fromIndex = -10 resolves to index 0. Check index 0: 1 % 2 === 0 is false. Returns -1.
    expect(findLastIndex(arr, (value) => value % 2 === 0, -10)).toEqual(-1);
    // fromIndex = -100 resolves to index 0. Check index 0: 1 < 2 is true. Returns 0.
    expect(findLastIndex(arr, (value) => value < 2, -100)).toEqual(0);
  });

  test('handles positive out of bound indices', () => {
    const arr = [1, 2, 3, 4, 5];
    // fromIndex = 10 resolves to index 4.
    // Checks index 4: 5 > 3 is true. Returns 4.
    expect(findLastIndex(arr, (value) => value > 3, 10)).toEqual(4);
  });

  test('predicate uses index argument', () => {
    const arr = [0, 5, 10, 3, 20]; // Indices: 0, 1, 2, 3, 4
    // Find last element where value > index * 4
    // Check 4: 20 > 4*4=16 (true) -> index 4
    expect(findLastIndex(arr, (value, index) => value > index * 4)).toEqual(4);
    // Check 3: 3 > 3*4=12 (false)
    // Check 2: 10 > 2*4=8 (true) -> index 2
    expect(findLastIndex(arr, (value, index) => value > index * 4, 3)).toEqual(
      2,
    );
  });

  test('predicate uses array argument', () => {
    const arr = [10, 20, 5, 30, 15]; // Indices: 0, 1, 2, 3, 4
    // Find last element > first element
    // Check 4: 15 > arr[0]=10 (true) -> index 4
    expect(
      findLastIndex(arr, (value, index, array) => value > array[0]),
    ).toEqual(4);
    // Start from index 2
    // Check 2: 5 > arr[0]=10 (false)
    // Check 1: 20 > arr[0]=10 (true) -> index 1
    expect(
      findLastIndex(arr, (value, index, array) => value > array[0], 2),
    ).toEqual(1);
  });

  test('unsorted array', () => {
    const arr = [50, 10, 40, 20, 30];
    // Find last element < 25
    // Check 4: 30 < 25 (false)
    // Check 3: 20 < 25 (true) -> index 3
    expect(findLastIndex(arr, (value) => value < 25)).toEqual(3);
  });

  test('array with duplicates', () => {
    const arr = [5, 8, 6, 8, 7]; // Indices: 0, 1, 2, 3, 4
    // Check 4: 7 === 8 (false)
    // Check 3: 8 === 8 (true) -> index 3
    expect(findLastIndex(arr, (value) => value === 8)).toEqual(3);
    // Start from index 2
    // Check 2: 6 === 8 (false)
    // Check 1: 8 === 8 (true) -> index 1
    expect(findLastIndex(arr, (value) => value === 8, 2)).toEqual(1);
  });

  test('array with mixed types', () => {
    const arr = [1, 'apple', true, null, 'banana', 0];
    // Find last string
    // Check 5: 0 (false)
    // Check 4: 'banana' (true) -> index 4
    expect(findLastIndex(arr, (value) => typeof value === 'string')).toEqual(4);
    // Find last boolean
    // Check 5: 0 (false)
    // Check 4: 'banana' (false)
    // Check 3: null (false)
    // Check 2: true (true) -> index 2
    expect(findLastIndex(arr, (value) => typeof value === 'boolean')).toEqual(
      2,
    );
  });

  test('array with falsy values', () => {
    const arr = [1, '', 0, false, null, undefined, 2]; // Indices: 0, 1, 2, 3, 4, 5, 6
    // Find last null
    expect(findLastIndex(arr, (value) => value === null)).toEqual(4);
    // Find last falsy value (using !)
    // Check 6: 2 (false)
    // Check 5: undefined (true) -> index 5
    expect(findLastIndex(arr, (value) => !value)).toEqual(5);
    // Find last falsy value starting from index 3
    // Check 3: false (true) -> index 3
    expect(findLastIndex(arr, (value) => !value, 3)).toEqual(3);
  });

  test('fromIndex exactly 0', () => {
    const arr = [10, 20, 30];
    // Checks index 0: 10 > 5 (true) -> index 0
    expect(findLastIndex(arr, (value) => value > 5, 0)).toEqual(0);
    // Checks index 0: 10 < 5 (false) -> -1
    expect(findLastIndex(arr, (value) => value < 5, 0)).toEqual(-1);
  });

  test('fromIndex exactly last index', () => {
    const arr = [10, 5, 20]; // Indices: 0, 1, 2
    // fromIndex = 2
    // Check 2: 20 > 15 (true) -> index 2
    expect(findLastIndex(arr, (value) => value > 15, 2)).toEqual(2);
    // Check 2: 20 < 15 (false)
    // Check 1: 5 < 15 (true) -> index 1
    expect(findLastIndex(arr, (value) => value < 15, 2)).toEqual(1);
  });

  test('negative fromIndex resolves exactly to 0', () => {
    const arr = [10, 20, 30]; // length 3
    // fromIndex = -3 resolves to index 0 (3 + -3 = 0)
    // Checks index 0: 10 > 5 (true) -> index 0
    expect(findLastIndex(arr, (value) => value > 5, -3)).toEqual(0);
    // Checks index 0: 10 < 5 (false) -> -1
    expect(findLastIndex(arr, (value) => value < 5, -3)).toEqual(-1);
  });

  test('negative fromIndex resolves exactly to last index', () => {
    const arr = [10, 5, 20]; // length 3
    // fromIndex = -1 resolves to index 2 (3 + -1 = 2)
    // Check 2: 20 > 15 (true) -> index 2
    expect(findLastIndex(arr, (value) => value > 15, -1)).toEqual(2);
    // Check 2: 20 < 15 (false)
    // Check 1: 5 < 15 (true) -> index 1
    expect(findLastIndex(arr, (value) => value < 15, -1)).toEqual(1);
  });

  test('single element array - match', () => {
    expect(findLastIndex([42], (v) => v > 10)).toEqual(0);
    expect(findLastIndex([42], (v) => v > 10, 0)).toEqual(0);
    expect(findLastIndex([42], (v) => v > 10, 10)).toEqual(0); // Out of bounds positive
    expect(findLastIndex([42], (v) => v > 10, -1)).toEqual(0); // Negative resolves to 0
    expect(findLastIndex([42], (v) => v > 10, -10)).toEqual(0); // Out of bounds negative
  });

  test('single element array - no match', () => {
    expect(findLastIndex([5], (v) => v > 10)).toEqual(-1);
    expect(findLastIndex([5], (v) => v > 10, 0)).toEqual(-1);
    expect(findLastIndex([5], (v) => v > 10, 10)).toEqual(-1); // Out of bounds positive
    expect(findLastIndex([5], (v) => v > 10, -1)).toEqual(-1); // Negative resolves to 0
    expect(findLastIndex([5], (v) => v > 10, -10)).toEqual(-1); // Out of bounds negative
  });
});
