import deepMerge from './deep-merge';

describe('deepMerge', () => {
  test('empty', () => {
    expect(deepMerge({}, {})).toEqual({});
  });

  test('objects', () => {
    expect(deepMerge({ foo: 2, bar: 3 }, { qux: 4 })).toEqual({
      foo: 2,
      bar: 3,
      qux: 4,
    });
  });

  test('arrays', () => {
    expect(deepMerge([], [3, 4])).toEqual([3, 4]);
    expect(deepMerge([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  test('arrays within objects', () => {
    expect(
      deepMerge({ foo: 3, bar: [7, 5] }, { bar: [1, 2, 3], qux: 1 }),
    ).toEqual({
      foo: 3,
      bar: [7, 5, 1, 2, 3],
      qux: 1,
    });
  });
});
