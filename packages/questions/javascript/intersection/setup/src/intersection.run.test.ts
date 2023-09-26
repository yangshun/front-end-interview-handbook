import intersection from './intersection';

describe('intersection', () => {
  test('empty array', () => {
    expect(intersection()).toEqual([]);
  });

  test('multiple arrays', () => {
    expect(intersection([1, 2, 3], [3, 4, 5], [3, 6, 7])).toEqual([3]);
  });

  test('common elements in the arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });
});
