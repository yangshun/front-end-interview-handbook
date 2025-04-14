import uniqWith from './uniq-with';

describe('uniqWith', () => {
  test('empty array', () => {
    expect(uniqWith([], (a, b) => a === b)).toEqual([]);
  });

  test('one value', () => {
    expect(uniqWith([0], (a, b) => a === b)).toEqual([0]);
  });

  test('different values', () => {
    expect(
      uniqWith([2.1, 1.2, 2.3], (a, b) => Math.floor(a) === Math.floor(b)),
    ).toEqual([2.1, 1.2]);
  });

  test('duplicate values', () => {
    expect(
      uniqWith([{ x: 1 }, { x: 2 }, { x: 1 }], (a, b) => a.x === b.x),
    ).toEqual([{ x: 1 }, { x: 2 }]);
  });
});
