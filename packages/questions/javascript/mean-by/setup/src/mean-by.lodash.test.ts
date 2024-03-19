import { meanBy } from 'lodash';

describe('meanBy', () => {
  test('empty input array', () => {
    expect(meanBy([], 'n')).toEqual(NaN);
  });

  test('iteratee as a string', () => {
    expect(meanBy([{ n: 1 }, { n: 2 }, { n: 3 }], 'n')).toEqual(2);
    expect(meanBy([{ age: 30 }, { age: 22 }, { age: 40 }], 'age')).toBeCloseTo(
      30.666666667,
    );
  });

  test('iteratee as a function', () => {
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
    expect(meanBy([{ n: 1 }, { n: 2 }], 'm')).toEqual(NaN);
    expect(meanBy([{ n: 1 }, { m: 2 }], 'm')).toEqual(1);
  });

  test('mixed data types', () => {
    expect(meanBy([1, '2', 3], (item: any) => Number(item))).toEqual(2);
  });
});
