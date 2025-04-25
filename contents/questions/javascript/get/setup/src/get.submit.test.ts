import get from './get';

describe('get', () => {
  describe('when the object is empty', () => {
    test('should return undefined for a simple path', () => {
      expect(get({}, 'a')).toEqual(undefined);
    });

    test('should return undefined for a nested path', () => {
      expect(get({}, 'a.b')).toEqual(undefined);
    });
  });

  describe('when the path contains one segment', () => {
    test('should return the value if the path exists', () => {
      expect(get({ a: 1 }, 'a')).toEqual(1);
    });

    test('should return undefined if the path does not exist', () => {
      expect(get({ c: 2 }, 'b')).toEqual(undefined);
    });

    test('should return an object if the path leads to an object', () => {
      expect(get({ c: { foo: 1 } }, 'c')).toEqual({ foo: 1 });
    });
  });

  describe('when the path contains two segments', () => {
    test('should return the nested value if the path exists', () => {
      expect(get({ a: { b: 2 }, c: 1 }, 'a.b')).toEqual(2);
    });

    test('should return undefined if an intermediate path segment does not exist', () => {
      expect(get({ a: { b: 2 }, c: 1 }, 'a.c')).toEqual(undefined);
    });

    test('should return a nested object if the path leads to an object', () => {
      expect(get({ a: { b: 2, c: { foo: 2 } } }, 'a.c')).toEqual({
        foo: 2,
      });
    });
  });

  describe('when the path contains multiple segments', () => {
    test('should return the deeply nested value if the path exists', () => {
      expect(get({ a: { b: 2, c: { d: 0 } }, c: 1 }, 'a.c.d')).toEqual(0);
    });

    test('should return undefined if a later path segment does not exist', () => {
      expect(get({ a: { b: 2 }, c: 1 }, 'a.c.e.f')).toEqual(undefined);
    });

    test('should return a deeply nested object if the path leads to an object', () => {
      expect(
        get({ a: { b: 2, c: { d: { e: { foo: 3 } } } }, c: 1 }, 'a.c.d.e'),
      ).toEqual({ foo: 3 });
    });
  });

  describe('when accessing array values via path', () => {
    test('should return the value at the specified array index', () => {
      expect(get({ a: { b: [1, 2, 3], c: { d: 0 } }, c: 1 }, 'a.b.2')).toEqual(
        3,
      );
    });

    test('should return nested values within objects inside arrays', () => {
      expect(
        get(
          { a: { b: [1, 2, 3, { c: 'bar' }], c: { d: 0 } }, c: 1 },
          'a.b.3.c',
        ),
      ).toEqual('bar');
    });

    test('should return nested values within objects inside arrays using array as a path', () => {
      expect(
        get({ a: { b: [1, 2, 3, { c: 'bar' }], c: { d: 0 } }, c: 1 }, [
          'a',
          'b',
          3,
          'c',
        ]),
      ).toEqual('bar');
    });
  });

  describe('when a default value is provided', () => {
    test('should return the default value for an empty object and simple path', () => {
      expect(get({}, 'a', 1)).toEqual(1);
    });

    test('should return the default value for an empty object and nested path', () => {
      expect(get({}, 'a.b', 2)).toEqual(2);
    });

    test('should return the default value when the path does not exist in a non-empty object', () => {
      expect(get({ c: 2 }, 'b', 3)).toEqual(3);
    });
  });

  describe('when the path resolves to a null value', () => {
    test('should return null for a top-level null value', () => {
      expect(get({ b: null }, 'b')).toEqual(null);
    });

    test('should return null for a nested null value', () => {
      expect(get({ a: { b: 2, c: null }, c: 1 }, 'a.c')).toEqual(null);
    });

    test('should return null for a deeply nested null value', () => {
      expect(
        get({ a: { b: 2, c: { d: { e: null } } }, c: 1 }, 'a.c.d.e'),
      ).toEqual(null);
    });
  });

  describe('when the path is provided as an array', () => {
    test('should return the value for a single-element path array', () => {
      expect(get({ a: { b: 2 }, c: 1 }, ['c'])).toEqual(1);
    });

    test('should return undefined if an intermediate path segment does not exist', () => {
      expect(get({ a: { b: 2 }, c: 1 }, ['a', 'c'])).toEqual(undefined);
    });

    test('should return a nested object if the path leads to an object', () => {
      expect(get({ a: { b: 2, c: { foo: 2 } } }, ['a', 'c'])).toEqual({
        foo: 2,
      });
    });

    test('should handle array indices within the path array correctly', () => {
      expect(
        get({ a: { b: [1, 2, 3, { c: 'bar' }], c: { d: 0 } }, c: 1 }, [
          'a',
          'b',
          '3',
          'c',
        ]),
      ).toEqual('bar');
    });
  });

  describe('when attempting to access properties on non-object/array values', () => {
    test('should return undefined when accessing property on boolean', () => {
      expect(get({ a: { b: true } }, 'a.b.c')).toEqual(undefined);
    });

    test('should return undefined when accessing property on null', () => {
      expect(get({ a: { b: null } }, 'a.b.c')).toEqual(undefined);
    });

    test('should return undefined when accessing property on undefined', () => {
      expect(get({ a: { b: undefined } }, 'a.b.c')).toEqual(undefined);
    });

    test('should return undefined when accessing property on number', () => {
      expect(get({ a: { b: 2 } }, 'a.b.c')).toEqual(undefined);
    });

    test('should return undefined when accessing property on string', () => {
      expect(get({ a: { b: 'foo' } }, 'a.b.c')).toEqual(undefined);
    });
  });
});
