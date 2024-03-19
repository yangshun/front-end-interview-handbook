import meanBy from './mean-by';

describe('meanBy', () => {
  test('no matching value', () => {
    expect(meanBy([{ n: 1 }, { n: 2 }], 'm')).toEqual(NaN);
  });

  test('iteratee as a string', () => {
    expect(meanBy([{ n: 1 }, { n: 3 }], 'n')).toEqual(2);
  });

  test('iteratee as a function', () => {
    expect(meanBy([{ n: 1 }, { n: 3 }], (o: any) => o.n)).toEqual(2);
  });
});
