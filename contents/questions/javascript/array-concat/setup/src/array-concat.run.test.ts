import './array-concat';

describe('Array.prototype.myConcat', () => {
  test('empty arguments', () => {
    expect([].myConcat()).toStrictEqual([]);
    expect([1, 2, 3].myConcat()).toStrictEqual([1, 2, 3]);
  });

  test('empty array', () => {
    expect([].myConcat([])).toStrictEqual([]);
    expect([1].myConcat([])).toStrictEqual([1]);
    expect([1, 2].myConcat([])).toStrictEqual([1, 2]);
  });

  test('join arrays', () => {
    expect([1, 2, 3].myConcat([4, 5, 6])).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  test('new array is returned', () => {
    const orig = [1, 2, 3];
    const res = orig.myConcat([4, 5, 6]);
    expect(res).toStrictEqual([1, 2, 3, 4, 5, 6]);

    orig.push(4);
    expect(res).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
