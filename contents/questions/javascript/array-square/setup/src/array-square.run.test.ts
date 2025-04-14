import './array-square';

describe('Array.prototype.square', () => {
  test('one value', () => {
    expect([10].square()).toEqual([100]);
  });

  test('two values', () => {
    expect([-4, 10].square()).toEqual([16, 100]);
  });
});
