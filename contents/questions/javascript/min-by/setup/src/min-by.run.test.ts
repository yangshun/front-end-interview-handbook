import minBy from './min-by';

describe('minBy', () => {
  test('empty input array', () => {
    expect(minBy([], () => {})).toEqual(undefined);
  });

  test('one element', () => {
    expect(minBy([{ n: 1 }], (o) => o.n)).toEqual({ n: 1 });
  });

  test('two elements', () => {
    expect(minBy([{ n: 1 }, { n: 2 }], (o) => o.n)).toEqual({ n: 1 });
    expect(
      minBy(
        [{ data: { score: 20 } }, { data: { score: 10 } }],
        (o) => o.data.score,
      ),
    ).toEqual({ data: { score: 10 } });
  });
});
