import maxBy from './max-by';

describe('maxBy', () => {
  test('empty input array', () => {
    expect(maxBy([], (o: any) => o.n)).toEqual(undefined);
  });

  test('nested arrays', () => {
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
      maxBy(['apple', 'pear', 'banana'], (fruit: string) => fruit.length),
    ).toEqual('banana');
  });

  test('non-existent property', () => {
    expect(maxBy([{ n: 1 }, { n: 2 }], (o: any) => o.m)).toEqual(undefined);
  });

  test('mixed data types', () => {
    expect(maxBy([1, '2', 3], (item: any) => Number(item))).toEqual(3);
  });

  test('null or undefined property values', () => {
    expect(
      maxBy([{ n: null }, { n: 10 }, { n: undefined }], (o: any) => o.n),
    ).toEqual({ n: 10 });
    expect(
      maxBy([{ n: undefined }, { n: undefined }], (o: any) => o.n),
    ).toEqual(undefined);
  });

  test('iterator function returns non-numeric values', () => {
    expect(
      maxBy(
        [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }],
        (o: any) => o.name,
      ),
    ).toEqual({ name: 'Charlie' });
    expect(
      maxBy([{ flag: true }, { flag: false }], (o: any) => o.flag),
    ).toEqual({
      flag: true,
    });
  });

  test('objects with nested arrays', () => {
    expect(
      maxBy([{ values: [1, 2, 3] }, { values: [4, 5, 6] }], (o: any) =>
        Math.max(...o.values),
      ),
    ).toEqual({ values: [4, 5, 6] });
  });

  test('date comparison', () => {
    const dates = [
      new Date(2020, 1, 1),
      new Date(2021, 1, 1),
      new Date(2019, 1, 1),
    ];
    expect(maxBy(dates, (date: Date) => date)).toEqual(new Date(2021, 1, 1));
  });

  test('mixed object types', () => {
    expect(
      maxBy(
        [{ n: 5 }, { m: 'string' }, { n: 10, m: 'string' }],
        (o: any) => o.n || 0,
      ),
    ).toEqual({ n: 10, m: 'string' });
  });

  test('large arrays', () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => ({ n: i }));
    expect(maxBy(largeArray, (o: any) => o.n)).toEqual({ n: 9999 });
  });

  test('iterator function with computation', () => {
    expect(
      maxBy(
        [{ values: [1, 2, 3] }, { values: [10, 20] }, { values: [5, 5, 5, 5] }],
        (o: any) => o.values.reduce((sum: any, v: any) => sum + v, 0),
      ),
    ).toEqual({ values: [10, 20] });
  });
});
