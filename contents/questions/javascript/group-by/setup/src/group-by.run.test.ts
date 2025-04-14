import groupBy from './group-by';

describe('groupBy', () => {
  test('empty array', () => {
    expect(groupBy([], (o: any) => o)).toEqual({});
  });

  test('function iteratees', () => {
    expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
      4: [4.2],
      6: [6.1, 6.3],
    });
  });

  test('multiple element arrays', () => {
    expect(groupBy(['one', 'two', 'three'], (o: string) => o.length)).toEqual({
      3: ['one', 'two'],
      5: ['three'],
    });
  });
});
