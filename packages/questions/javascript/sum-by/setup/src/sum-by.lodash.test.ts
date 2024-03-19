import { sumBy } from 'lodash';

describe('sumBy', () => {
  test('empty input array', () => {
    expect(sumBy([], 'n')).toEqual(0);
  });

  test('iteratee as a string', () => {
    expect(sumBy([{ n: 1 }, { n: 2 }, { n: 3 }], 'n')).toEqual(6);
    expect(sumBy([{ age: 30 }, { age: 22 }, { age: 40 }], 'age')).toEqual(92);
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
    expect(sumBy([{ n: 1 }, { n: 2 }], 'm')).toEqual(undefined);
    expect(sumBy([{ n: 1 }, { m: 2 }], 'm')).toEqual(2);
  });

  test('mixed data types', () => {
    expect(sumBy([1, '2', 3], (item: any) => Number(item))).toEqual(6);
  });
});
