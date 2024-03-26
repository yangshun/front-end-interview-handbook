import maxBy from './max-by';

describe('maxBy', () => {
  test('empty array', () => {
    expect(maxBy([], (o: any) => o.m)).toEqual(undefined);
  });

  test('no matching value', () => {
    expect(maxBy([{ n: 1 }, { n: 2 }], (o: any) => o.m)).toEqual(undefined);
  });

  test('regular test case', () => {
    expect(
      maxBy([{ n: 1 }, { n: 2 }], function (o: any) {
        return o.n;
      }),
    ).toEqual({ n: 2 });
  });
});
