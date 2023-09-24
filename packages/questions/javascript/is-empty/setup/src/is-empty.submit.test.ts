import isEmpty from './is-empty';

describe('isEmpty', () => {
  test('empty values', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(1)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty(/x/)).toBe(true);
    expect(isEmpty(Symbol('x'))).toBe(true);
  });

  describe('strings', () => {
    test('empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    test('non-empty string', () => {
      expect(isEmpty('a')).toBe(false);
    });
  });

  describe('objects', () => {
    test('empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    test('non-empty object', () => {
      expect(isEmpty({ a: 0 })).toBe(false);
    });

    test('object that has a `length` property', () => {
      expect(isEmpty({ length: 0 })).toBe(false);
    });

    test('objects with negative lengths', function () {
      function Foo() {}
      Foo.prototype.length = -1;

      expect(isEmpty(new (Foo as any)())).toBe(true);
    });

    test('non-number lengths', function () {
      expect(isEmpty({ length: '0' })).toBe(false);
    });
  });

  describe('maps', function () {
    test('empty map', () => {
      const map = new Map();
      expect(isEmpty(map)).toBe(true);
    });

    test('non-empty map', () => {
      const map = new Map([['a', 1]]);
      expect(isEmpty(map)).toBe(false);
    });
  });

  describe('sets', function () {
    test('empty set', () => {
      const set = new Set();
      expect(isEmpty(set)).toBe(true);
    });

    test('non-empty set', () => {
      const set = new Set([1]);
      expect(isEmpty(set)).toBe(false);
    });
  });

  describe('arrays', () => {
    test('empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    test('non-empty array', () => {
      expect(isEmpty([1])).toBe(false);
    });
  });
});
