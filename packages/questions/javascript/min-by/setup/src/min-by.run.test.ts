import minBy from './min-by';

describe('minBy', () => {
  test('no matching value', () => {
    expect(minBy([{ n: 1 }, { n: 2 }], 'm')).toEqual(undefined);
  });

  test('iteratee as a string', () => {
    expect(minBy([{ n: 1 }, { n: 2 }], 'n')).toEqual({ n: 1 });
  });

  test('iteratee as a function', () => {
    expect(
      minBy([{ n: 1 }, { n: 2 }], function (o: any) {
        return o.n;
      }),
    ).toEqual({ n: 1 });
  });
});
