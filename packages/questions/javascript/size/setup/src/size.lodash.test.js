import { size } from 'lodash';

describe('size', () => {
  test('null', () => {
    expect(size(null)).toBe(0);
  });

  test('undefined', () => {
    expect(size(undefined)).toBe(0);
  });

  test('arrays', () => {
    expect(size([])).toBe(0);
    expect(size([1])).toBe(1);
    expect(size([1, 2])).toBe(2);
    expect(size([1, 2, 3])).toBe(3);
  });

  test('objects', () => {
    expect(size({})).toBe(0);
    expect(size({ a: 1 })).toBe(1);
    expect(size({ a: 1, b: 2 })).toBe(2);
    expect(size({ a: 1, b: 2, c: 3 })).toBe(3);
  });

  test('strings', () => {
    expect(size('')).toBe(0);
    expect(size('a')).toBe(1);
    expect(size('ab')).toBe(2);
    expect(size('hello')).toBe(5);
  });

  test('sets', () => {
    expect(size(new Set([]))).toBe(0);
    expect(size(new Set([1]))).toBe(1);
    expect(size(new Set([1, 2]))).toBe(2);
    expect(size(new Set([1, 2, 3]))).toBe(3);
  });

  test('maps', () => {
    expect(size(new Map([]))).toBe(0);
    expect(size(new Map([[1, 2]]))).toBe(1);
    expect(
      size(
        new Map([
          [1, 2],
          [3, 4],
        ]),
      ),
    ).toBe(2);
    expect(
      size(
        new Map([
          [1, 2],
          [3, 4],
          [5, 6],
        ]),
      ),
    ).toBe(3);
  });

  test('unsupported', () => {
    expect(size(new Date())).toBe(0);
    expect(size(/hello/)).toBe(0);
  });
});
