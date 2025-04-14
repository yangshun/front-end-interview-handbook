import uniqueArray from './unique-array';

describe('uniqueArray', () => {
  test('empty array', () => {
    expect(uniqueArray([])).toEqual([]);
  });

  test('one value', () => {
    expect(uniqueArray([0])).toEqual([0]);
  });

  test('different values', () => {
    expect(uniqueArray([2, 3])).toEqual([2, 3]);
  });

  test('duplicate values', () => {
    expect(uniqueArray([2, 1, 2])).toEqual([2, 1]);
  });
});
