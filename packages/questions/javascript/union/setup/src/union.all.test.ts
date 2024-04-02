import { union as unionLodash } from 'lodash';
import unionGFE from './union';
import unionSet from './union-set';

describe('union', () => {
  [unionGFE, unionLodash, unionSet].forEach((union) => {
    test('empty input array', () => {
      expect(union([])).toEqual([]);
    });

    test('single value', () => {
      expect(union([0])).toEqual([0]);
      expect(union(['a'])).toEqual(['a']);
    });

    test('numbers', () => {
      expect(union([4, 2, 8, 2])).toEqual([4, 2, 8]);
      expect(union([1, 1, 1, 2, 2])).toEqual([1, 2]);
    });

    test('mixed data type', () => {
      expect(union([-4, 'a', -4])).toEqual([-4, 'a']);
      expect(union([true, 2, 3, 2, 'b'])).toEqual([true, 2, 3, 'b']);
    });

    test('more than one array', () => {
      expect(union(['a', 'b'], ['a', 'c'])).toEqual(['a', 'b', 'c']);
      expect(union([-2, -2], [-2, -2, -2])).toEqual([-2]);
    });

    test('objects as elements', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      expect(union([obj1], [obj1, obj2])).toEqual([obj1, obj2]);
    });

    test('false values', () => {
      expect(union([null], [null, undefined])).toStrictEqual([null, undefined]);
      expect(union([false, null, 0], [NaN, undefined])).toStrictEqual([
        false,
        null,
        0,
        NaN,
        undefined,
      ]);
    });

    test('large arrays', () => {
      const largeArray1 = Array.from({ length: 1000 }, (_, i) => i);
      const largeArray2 = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(union(largeArray1, largeArray2).length).toBeLessThanOrEqual(1500);
    });

    test('complex elements', () => {
      const date1 = new Date(2020, 1, 1);
      const date2 = new Date(2021, 1, 1);
      expect(union([date1], [date2])).toEqual([date1, date2]);
    });
  });
});
