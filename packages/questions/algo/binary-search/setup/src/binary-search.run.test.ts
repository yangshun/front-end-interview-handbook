import binarySearch from './binary-search';

describe('binarySearch', () => {
  test('target value', () => {
    expect(binarySearch([1, 2, 3, 10, 11, 20], 2)).toBe(1);
  });

  test('boundary value', () => {
    expect(binarySearch([1, 2, 3, 10, 11, 20], 20)).toBe(5);
  });

  test('non-existent value', () => {
    expect(binarySearch([1, 2, 3, 10, 11, 20], 9)).toBe(-1);
  });
});
