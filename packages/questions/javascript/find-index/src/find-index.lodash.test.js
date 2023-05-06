import { findIndex } from 'lodash';

describe('findIndex', () => {
  test('empty array', () => {
    expect(findIndex([], (num) => num % 2 === 0)).toBe(-1);
  });

  test('finds index of first even number', () => {
    expect(findIndex([5, 12, 8, 130, 44], (num) => num % 2 === 0)).toBe(1);
  });

  test('no element passes test', () => {
    expect(findIndex([5, 12, 8, 130, 44], (num) => num > 200)).toBe(-1);
  });

  test('searches from given start index', () => {
    expect(findIndex([5, 12, 8, 130, 44], (num) => num % 2 === 0, 3)).toBe(3);
  });

  test('handles negative start index', () => {
    expect(findIndex([5, 12, 8, 130, 44], (num) => num > 3, -2)).toEqual(3);
  });

  test('handles out of range index', () => {
    expect(findIndex([5, 12, 8, 130, 44], (value) => value >= 12, 10)).toEqual(
      -1,
    );
    expect(findIndex([5, 12, 8, 130, 44], (value) => value >= 12, -10)).toEqual(
      1,
    );
  });
});
