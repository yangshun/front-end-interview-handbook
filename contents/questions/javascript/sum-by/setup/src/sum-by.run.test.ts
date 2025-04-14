import sumBy from './sum-by';

describe('sumBy', () => {
  test('no matching value', () => {
    expect(sumBy([{ n: 1 }, { n: 2 }], (o: any) => o.m)).toEqual(undefined);
  });

  test('iteratee as a string', () => {
    expect(sumBy([{ n: 1 }, { n: 3 }], (o: any) => o.n)).toEqual(4);
  });

  test('iteratee as a function', () => {
    expect(sumBy([{ n: 1 }, { n: 3 }], (o: any) => o.n)).toEqual(4);
  });
});
