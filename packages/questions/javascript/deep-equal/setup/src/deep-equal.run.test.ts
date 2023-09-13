import deepEqual from './deep-equal';

describe('deepEqual', () => {
  test('primitive values', () => {
    expect(deepEqual(0, 0)).toEqual(true);
    expect(deepEqual('foo', 'foo')).toEqual(true);
    expect(deepEqual(true, 1)).toEqual(false);
    expect(deepEqual(true, true)).toEqual(true);
    expect(deepEqual(false, false)).toEqual(true);
    expect(deepEqual(null, null)).toEqual(true);
  });

  describe('arrays', () => {
    test('empty', () => {
      expect(deepEqual([], [])).toEqual(true);
      expect(deepEqual({}, [])).toEqual(false);
    });

    test('number and strings', () => {
      expect(deepEqual([1], [1])).toEqual(true);
      expect(deepEqual(['1'], ['1'])).toEqual(true);
      expect(deepEqual([1], ['1'])).toEqual(false);
      expect(deepEqual([1, 2], [1, 2])).toEqual(true);
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toEqual(true);
      expect(deepEqual([1, 2, 3], [1, 3, 2])).toEqual(false);
    });

    test('boolean', () => {
      expect(deepEqual([true], [true])).toEqual(true);
      expect(deepEqual([true], [1])).toEqual(false);
      expect(deepEqual([false], [false])).toEqual(true);
      expect(deepEqual([true], [false])).toEqual(false);
      expect(deepEqual([0], [false])).toEqual(false);
    });

    test('null-ish', () => {
      expect(deepEqual([null], [null])).toEqual(true);
    });

    test('objects', () => {
      expect(deepEqual([{ foo: 1 }], [{ foo: 1 }])).toEqual(true);
      expect(deepEqual([{ foo: 1 }], [{ foo: 2 }])).toEqual(false);
    });
  });

  describe('objects', () => {
    test('empty', () => {
      expect(deepEqual({}, {})).toEqual(true);
    });

    test('basic', () => {
      expect(deepEqual({}, {})).toEqual(true);
      expect(deepEqual({ foo: 'bar' }, { foo: 'bar' })).toEqual(true);
      expect(deepEqual({ foo: 'bar', id: 1 }, { foo: 'bar', id: 1 })).toEqual(
        true,
      );
      expect(deepEqual({ foo: 'bar', id: 1 }, { foo: 'bar', id: '1' })).toEqual(
        false,
      );
    });

    test('different keys', () => {
      expect(deepEqual({ foo: 'bar' }, { fob: 'bar' })).toEqual(false);
    });

    test('different values', () => {
      expect(deepEqual({ foo: 'bar' }, { foo: 'baz' })).toEqual(false);
    });

    test('same keys but different types', () => {
      expect(deepEqual({ 0: 'foo' }, ['foo'])).toEqual(false);
    });

    test('array', () => {
      expect(
        deepEqual(
          { foo: 'bar', item: [1, 2, { baz: 'baz' }] },
          { foo: 'bar', item: [1, 2, { baz: 'baz' }] },
        ),
      ).toEqual(true);
    });

    test('subset objects', () => {
      expect(
        deepEqual(
          { foo: 'bar', item: [1, 2, { baz: 'baz' }] },
          { foo: 'bar', item: [1, 2, { baz: 'baz' }], id: 1 },
        ),
      ).toEqual(false);
    });

    test('null-ish', () => {
      expect(
        deepEqual({ foo: null, baz: 'baz' }, { bar: 'bar', baz: 'baz' }),
      ).toEqual(false);
      expect(
        deepEqual({ foo: null, bar: 'baz' }, { foo: null, bar: 'baz' }),
      ).toEqual(true);
    });
  });
});
