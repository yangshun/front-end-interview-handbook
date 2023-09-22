import flatten from './flatten';

describe('flatten array', () => {
  test('empty array', () => {
    expect(flatten([])).toEqual([]);
  });

  test('nested array', () => {
    expect(flatten([1, [2]])).toEqual([1, 2]);
  });

  test('multiple levels of nesting', () => {
    expect(flatten([1, [2, [3]]])).toEqual([1, 2, 3]);
  });
});
