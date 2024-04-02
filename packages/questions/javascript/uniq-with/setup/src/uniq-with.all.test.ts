import { uniqWith as uniqWithLodash } from 'lodash';
import uniqWithGFE from './uniq-with';

describe('uniqWith', () => {
  [uniqWithLodash, uniqWithGFE].forEach((uniqWith) => {
    test('empty array', () => {
      expect(uniqWith([], (a, b) => a === b)).toEqual([]);
    });

    test('duplicate values', () => {
      expect(uniqWith([2, 1, 2], (a, b) => a === b)).toEqual([2, 1]);
      expect(uniqWith([2, 2, 1], (a, b) => a === b)).toEqual([2, 1]);
      expect(uniqWith([2, 1, 2, 3], (a, b) => a === b)).toEqual([2, 1, 3]);
    });

    test('nested arrays', () => {
      expect(
        uniqWith([{ n: 1 }, { n: 2 }, { n: 1 }], (a, b) => a.n === b.n),
      ).toEqual([{ n: 1 }, { n: 2 }]);
      expect(
        uniqWith(
          [{ age: 30 }, { age: 22 }, { age: 22 }],
          (a, b) => a['age'] === b['age'],
        ),
      ).toEqual([{ age: 30 }, { age: 22 }]);
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

    test('non-existent value', () => {
      expect(uniqWith([{ n: 1 }, { m: 2 }], (a, b) => a.m === b.m)).toEqual([
        { n: 1 },
        { m: 2 },
      ]);
    });

    test('falsey values', () => {
      expect(
        uniqWith([false, null, undefined, null], (a, b) => a === b),
      ).toEqual([false, null, undefined]);
    });
  });
});
