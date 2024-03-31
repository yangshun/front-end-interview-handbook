import { fill as fillLodash } from 'lodash';
import fillGFE from './fill';

describe('fill', () => {
  [fillLodash, fillGFE].forEach((fill) => {
    test('empty array', () => {
      expect(fill([], '*')).toEqual([]);
      expect(fill([], '*', 2, 3)).toEqual([]);
    });

    test('single element', () => {
      expect(fill([1], '*')).toEqual(['*']);
      expect(fill([1], '*', 0, 1)).toEqual(['*']);
      expect(fill([1], '*', 2, 3)).toEqual([1]);
    });

    test('two elements', () => {
      expect(fill([1, 2], '*')).toEqual(['*', '*']);
      expect(fill([1, 2], '*', 1)).toEqual([1, '*']);
      expect(fill([1, 2], '*', 2, 3)).toEqual([1, 2]);
    });

    describe('multiple elements', () => {
      test('use default start to end', () => {
        expect(fill([1, 2, 3], '*')).toEqual(['*', '*', '*']);
      });

      test('only start specified', () => {
        expect(fill([1, 2, 3, 4, 5], '*', 2)).toEqual([1, 2, '*', '*', '*']);
      });

      test('start to end specified', () => {
        expect(fill([1, 2, 3, 4, 5], '*', 2, 4)).toEqual([1, 2, '*', '*', 5]);
      });

      describe('negative indices', () => {
        test('negative start', () => {
          expect(fill([1, 2, 3], '*', -2)).toEqual([1, '*', '*']);
        });

        test('negative start and positive end', () => {
          expect(fill([1, 2, 3, 4, 5], '*', -4, 3)).toEqual([
            1,
            '*',
            '*',
            4,
            5,
          ]);
        });

        test('negative end', () => {
          expect(fill([1, 2, 3, 4, 5], '*', 1, -1)).toEqual([
            1,
            '*',
            '*',
            '*',
            5,
          ]);
        });

        test('negative start and end', () => {
          expect(fill([1, 2, 3, 4, 5], '*', -4, -1)).toEqual([
            1,
            '*',
            '*',
            '*',
            5,
          ]);
        });

        test('out of bound indices are provided', () => {
          expect(fill([1, 2, 3], '*', 1, 10)).toEqual([1, '*', '*']);
        });
      });
    });

    test('end smaller than start', () => {
      expect(fill([1], '*', 4, 1)).toEqual([1]);
      expect(fill([1, 2, 3, 4, 5], '*', 4, 1)).toEqual([1, 2, 3, 4, 5]);
      expect(fill([1, 2, 3, 4, 5], '*', -1, -4)).toEqual([1, 2, 3, 4, 5]);
    });

    test('returns original array', () => {
      const arr = [1, 2, 3];
      expect(fill(arr, '*', 1)).toBe(arr);
    });

    test('mutates original array', () => {
      const arr = [1, 2, 3];
      fill(arr, '*', 1);
      expect(arr).toEqual([1, '*', '*']);
    });
  });
});
