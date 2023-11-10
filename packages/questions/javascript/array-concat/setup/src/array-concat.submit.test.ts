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

  test('single array argument', () => {
    expect([1].myConcat([2])).toStrictEqual([1, 2]);
    expect([1, 2, 3].myConcat([4, 5, 6])).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  test('multiple arrays arguments', () => {
    expect([1, 2, 3].myConcat([4, 5, 6], [7, 8, 9])).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
  });

  test('primitive arguments', () => {
    expect([1, 2].myConcat(3, 4)).toStrictEqual([1, 2, 3, 4]);
    expect([1, 2, 3].myConcat(4, 5, 6)).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  test('mixed arguments', () => {
    expect([1, 2, 3].myConcat([4, 5, 6], 7)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
    expect([1, 2, 3].myConcat(4, [5, 6, 7])).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
    expect([1, 2, 3].myConcat(4, [5, 6], 7)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  test('sparse arrays', () => {
    const combined = [1, , 2].myConcat(3, 4);
    expect(combined).toHaveLength(5);
    expect(combined[0]).toBe(1);
    expect(combined[2]).toBe(2);
    expect(combined[3]).toBe(3);
    expect(combined[4]).toBe(4);
  });

  test('new array is returned', () => {
    const orig = [1, 2, 3];
    const res = orig.myConcat([4, 5, 6]);
    expect(res).toStrictEqual([1, 2, 3, 4, 5, 6]);

    orig.push(4);
    expect(res).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
