import sumBy from './sum-by';

describe('sumBy', () => {
  test('empty input array', () => {
    expect(sumBy([], (o: any) => o.n)).toEqual(0);
  });

  test('iteratee as a function', () => {
    expect(
      sumBy(
        [{ data: { score: 10 } }, { data: { score: 20 } }],
        (o: any) => o.data.score,
      ),
    ).toEqual(30);
  });

  test('strings comparison', () => {
    expect(
      sumBy(['apple', 'pear', 'banana'], (fruit: any) => fruit.length),
    ).toEqual(15);
  });

  test('non-existent property', () => {
    expect(sumBy([{ n: 1 }, { n: 2 }], (o: any) => o.m)).toEqual(undefined);
    expect(sumBy([{ n: 1 }, { m: 2 }], (o: any) => o.m)).toEqual(2);
  });

  test('mixed data types', () => {
    expect(sumBy([1, '2', 3], (item: any) => Number(item))).toEqual(6);
  });

  test('missing property in some objects', () => {
    expect(sumBy([{ a: 1 }, { b: 2 }, { c: 3 }], (obj: any) => obj.d)).toEqual(
      undefined,
    );
    expect(
      sumBy([{ a: 1, b: 2 }, { b: 3 }, { c: 4 }], (obj: any) => obj.b),
    ).toEqual(5);
  });

  test('nested property', () => {
    expect(
      sumBy(
        [
          { data: { nested: { value: 5 } } },
          { data: { nested: { value: 10 } } },
        ],
        (obj: any) => obj.data.nested.value,
      ),
    ).toEqual(15);
  });

  test('null or undefined values', () => {
    expect(
      sumBy([{ a: null }, { a: undefined }, { a: 3 }], (obj: any) => obj.a),
    ).toEqual(3);
  });

  test('negative values', () => {
    expect(sumBy([{ a: 1 }, { a: -3 }, { a: 5 }], (obj: any) => obj.a)).toEqual(
      3,
    );
    expect(
      sumBy([{ a: -2 }, { a: -4 }, { a: -6 }], (obj: any) => obj.a),
    ).toEqual(-12);
  });
});
