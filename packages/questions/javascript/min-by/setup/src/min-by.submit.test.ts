import minBy from './min-by';

describe('minBy', () => {
  test('empty input array', () => {
    expect(minBy([], 'n')).toEqual(undefined);
  });

  test('iteratee as a string', () => {
    expect(minBy([{ n: 1 }, { n: 2 }, { n: 3 }], 'n')).toEqual({ n: 1 });
    expect(minBy([{ age: 30 }, { age: 22 }, { age: 40 }], 'age')).toEqual({
      age: 22,
    });
  });

  test('iteratee as a function', () => {
    expect(minBy([{ n: 1 }, { n: 2 }], (o: any) => o.n)).toEqual({ n: 1 });
    expect(
      minBy(
        [{ data: { score: 10 } }, { data: { score: 20 } }],
        (o: any) => o.data.score,
      ),
    ).toEqual({ data: { score: 10 } });
  });

  test('strings comparison', () => {
    expect(
      minBy(['apple', 'pear', 'banana'], (fruit: any) => fruit.length),
    ).toEqual('pear');
  });

  test('non-existent property', () => {
    expect(minBy([{ n: 1 }, { n: 2 }], 'm')).toEqual(undefined);
  });

  test('mixed data types', () => {
    expect(minBy([1, '2', 3], (item: any) => Number(item))).toEqual(1);
  });
});
