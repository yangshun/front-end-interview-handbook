import meanBy from './mean-by';

describe('meanBy', () => {
  test('empty array', () => {
    expect(meanBy([], (o) => o)).toEqual(NaN);
  });

  test('iteratee as a string', () => {
    expect(meanBy([{ n: 1 }, { n: 3 }], (o) => o.n)).toEqual(2);
  });

  test('iteratee as a function', () => {
    expect(meanBy([{ n: 1 }, { n: 3 }], (o: any) => o.n)).toEqual(2);
  });
});
