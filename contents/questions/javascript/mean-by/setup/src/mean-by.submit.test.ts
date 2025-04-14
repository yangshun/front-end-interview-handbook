import meanBy from './mean-by';

describe('meanBy', () => {
  test('empty input array', () => {
    expect(meanBy([], (o) => o)).toEqual(NaN);
  });

  test('iteratee as a function', () => {
    expect(meanBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n)).toEqual(2);
    expect(
      meanBy([{ age: 30 }, { age: 22 }, { age: 40 }], (o) => o.age),
    ).toBeCloseTo(30.666666667);
    expect(
      meanBy(
        [{ data: { score: 10 } }, { data: { score: 20 } }],
        (o: any) => o.data.score,
      ),
    ).toEqual(15);
  });

  test('strings comparison', () => {
    expect(
      meanBy(['apple', 'pear', 'banana'], (fruit: any) => fruit.length),
    ).toEqual(5);
  });

  test('non-existent property', () => {
    expect(meanBy([{ n: 1 }, { m: 2 }], (o) => o.n)).toEqual(1 / 2);
  });

  test('mixed data types', () => {
    expect(meanBy([1, '2', 3], (item: any) => Number(item))).toEqual(2);
  });

  test('iteratee as property name string', () => {
    expect(meanBy([{ a: 2 }, { a: 4 }], (o) => o.a)).toEqual(3);
    expect(meanBy([{ a: 1 }, { b: 2 }], (o) => o.a)).toEqual(1 / 2);
  });

  test('complex objects and arrays', () => {
    expect(
      meanBy(
        [{ data: { value: 2 } }, { data: { value: 4 } }],
        (o) => o.data.value,
      ),
    ).toEqual(3);
    expect(
      meanBy([{ values: [1, 2] }, { values: [3, 4] }], (o) =>
        o.values.reduce((sum, n) => sum + n, 0),
      ),
    ).toEqual(5);
  });

  test('special numeric values', () => {
    expect(meanBy([1, Infinity, 3], (n) => n)).toBe(Infinity);
    expect(meanBy([1, NaN, 3], (n) => n)).toBeNaN();
  });

  test('sparse arrays', () => {
    const sparseArray = [1, , 3];
    expect(meanBy(sparseArray, (n) => n)).toEqual(4 / 3);
  });

  test('boolean and null values', () => {
    expect(meanBy([true, false, true], (b) => (b ? 1 : 0))).toEqual(2 / 3);
    expect(meanBy([1, null, 3], (n) => (n === null ? 0 : n))).toEqual(4 / 3);
  });
});
