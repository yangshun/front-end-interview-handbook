import './array-square';

describe('Array.prototype.square', () => {
  test('empty array', () => {
    expect([].square()).toEqual([]);
  });

  test('one value', () => {
    expect([10].square()).toEqual([100]);
  });

  test('two values', () => {
    expect([-4, 10].square()).toEqual([16, 100]);
  });

  test('multiple values', () => {
    expect([1, 2, 3, 4].square()).toEqual([1, 4, 9, 16]);
    expect([1, 2, 3, 4, 5].square()).toEqual([1, 4, 9, 16, 25]);
  });

  test('original array is not modified', () => {
    const arr = [1, 2, 3, 4];
    expect(arr.square()).toEqual([1, 4, 9, 16]);
    expect(arr).toEqual([1, 2, 3, 4]);
  });
});
