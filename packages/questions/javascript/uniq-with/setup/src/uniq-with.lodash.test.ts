import { uniqWith } from 'lodash';

describe('uniqWith', () => {
  test('empty array', () => {
    expect(uniqWith([])).toEqual([]);
  });

  test('duplicate values', () => {
    expect(uniqWith([2, 1, 2])).toEqual([2, 1]);
    expect(uniqWith([2, 2, 1])).toEqual([2, 1]);
    expect(uniqWith([2, 1, 2, 3])).toEqual([2, 1, 3]);
  });

  test('iteratee as a string', () => {
    expect(
      uniqWith([{ n: 1 }, { n: 2 }, { n: 1 }], (a, b) => a.n === b.n),
    ).toEqual([{ n: 1 }, { n: 2 }]);
    expect(
      uniqWith(
        [{ age: 30 }, { age: 22 }, { age: 22 }],
        (a, b) => a['age'] === b['age'],
      ),
    ).toEqual([{ age: 30 }, { age: 22 }]);
  });

  test('iteratee as a function', () => {
    expect(
      uniqWith(
        [{ data: { score: 10 } }, { data: { score: 10 } }],
        (a: any, b: any) => a.data.score === b.data.score,
      ),
    ).toEqual([{ data: { score: 10 } }]);
  });

  test('strings comparison', () => {
    expect(
      uniqWith(
        ['apple', 'pear', 'mango'],
        (a: any, b: any) => a.length === b.length,
      ),
    ).toEqual(['apple', 'pear']);
  });

  test('mixed data types', () => {
    expect(
      uniqWith([1, '2', 3], (a: any, b: any) => Number(a) === Number(b)),
    ).toEqual([1, '2', 3]);
  });
});
