import uniqBy from './uniq-by';

describe('uniqBy', () => {
  test('empty array', () => {
    expect(uniqBy([], (o: any) => o.m)).toEqual([]);
  });

  test('one value', () => {
    expect(uniqBy([0])).toEqual([0]);
  });

  test('different values', () => {
    expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });

  test('duplicate values', () => {
    expect(uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], (o: any) => o.x)).toEqual([
      { x: 1 },
      { x: 2 },
    ]);
  });
});
