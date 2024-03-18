import maxBy from './max-by';

describe('maxBy', () => {
  test('empty input array', () => {
    expect(maxBy([], 'n')).toEqual(undefined);
  });

  test('iteratee as a string', () => {
    expect(maxBy([{ n: 1 }, { n: 2 }, { n: 3 }], 'n')).toEqual({ n: 3 });
    expect(maxBy([{ age: 30 }, { age: 22 }, { age: 40 }], 'age')).toEqual({
      age: 40,
    });
  });

  test('iteratee as a function', () => {
    expect(maxBy([{ n: 1 }, { n: 2 }], (o: any) => o.n)).toEqual({ n: 2 });
    expect(
      maxBy(
        [{ data: { score: 10 } }, { data: { score: 20 } }],
        (o: any) => o.data.score,
      ),
    ).toEqual({ data: { score: 20 } });
  });

  test('strings comparison', () => {
    expect(
      maxBy(['apple', 'pear', 'banana'], (fruit: any) => fruit.length),
    ).toEqual('banana');
  });

  test('non-existent property', () => {
    expect(maxBy([{ n: 1 }, { n: 2 }], 'm')).toEqual(undefined);
  });

  test('mixed data types', () => {
    expect(maxBy([1, '2', 3], (item: any) => Number(item))).toEqual(3);
  });
});
