import maxBy from './max-by';

describe('maxBy', () => {
  test('no matching value', () => {
    expect(maxBy([{ n: 1 }, { n: 2 }], 'm')).toEqual(undefined);
  });

  test('iteratee as a string', () => {
    expect(maxBy([{ n: 1 }, { n: 2 }], 'n')).toEqual({ n: 2 });
  });

  test('iteratee as a function', () => {
    expect(
      maxBy([{ n: 1 }, { n: 2 }], function (o: any) {
        return o.n;
      }),
    ).toEqual({ n: 2 });
  });
});
