import { findIndex } from 'lodash';

describe('findIndex', () => {
  const arr = [5, 12, 8, 130, 44];

  test('finds index of first even number', () => {
    const result = findIndex(arr, (num) => num % 2 === 0);
    expect(result).toBe(1);
  });

  test('returns -1 if no element passes test', () => {
    const result = findIndex(arr, (num) => num > 200);
    expect(result).toBe(-1);
  });

  test('returns -1 if array is empty', () => {
    const result = findIndex([], (num) => num > 200);
    expect(result).toBe(-1);
  });

  test('searches from given start index', () => {
    const result = findIndex(arr, (num) => num % 2 === 0, 3);
    expect(result).toBe(3);
  });

  test('handles negative start index', () => {
    const result = findIndex(arr, (num) => num > 3, -2);
    expect(result).toEqual(3);
  });

  test('handles out of range index', () => {
    expect(findIndex(arr, (value) => value >= 12, 10)).toEqual(-1);
    expect(findIndex(arr, (value) => value >= 12, -10)).toEqual(1);
  });
});
