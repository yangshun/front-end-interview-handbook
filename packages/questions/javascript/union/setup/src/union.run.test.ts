import union from './union';

describe('mean', () => {
  test('empty input array', () => {
    expect(union([])).toEqual([]);
  });

  test('single value', () => {
    expect(union([0])).toEqual([0]);
  });

  test('two values', () => {
    expect(union([1, 2, 2])).toEqual([1, 2]);
  });
});
