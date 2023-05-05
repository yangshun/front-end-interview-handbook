import deepEqual from './deep-equal';

describe('deepEqual', () => {
  test('primitive values', () => {
    expect(deepEqual(0, 0)).toEqual(true);
    expect(deepEqual(-0, +0)).toEqual(false);
    expect(deepEqual('foo', 'foo')).toEqual(true);
    expect(deepEqual(true, 1)).toEqual(false);
    expect(deepEqual(true, true)).toEqual(true);
    expect(deepEqual(false, false)).toEqual(true);
    expect(deepEqual(undefined, null)).toEqual(false);
    expect(deepEqual(null, null)).toEqual(true);
    expect(deepEqual(undefined, undefined)).toEqual(true);
    expect(deepEqual(NaN, NaN)).toEqual(true);
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
    });

    test('boolean', () => {
      expect(deepEqual([true], [true])).toEqual(true);
      expect(deepEqual([false], [false])).toEqual(true);
      expect(deepEqual([true], [false])).toEqual(false);
    });

    test('null-ish', () => {
      expect(deepEqual([null], [null])).toEqual(true);
      expect(deepEqual([undefined], [undefined])).toEqual(true);
      expect(deepEqual([null], [undefined])).toEqual(false);
    });

    test('NaN', () => {
      expect(deepEqual([NaN], [NaN])).toEqual(true);
    });
  });

  describe('objects', () => {
    test('empty', () => {
      expect(deepEqual({}, {})).toEqual(true);
    });

    test('basic', () => {
      expect(deepEqual({}, {})).toEqual(true);

      expect(deepEqual({ foo: 'bar', id: 1 }, { foo: 'bar', id: 1 })).toEqual(
        true,
      );
      expect(deepEqual({ foo: 'bar', id: 1 }, { foo: 'bar', id: '1' })).toEqual(
        false,
      );
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
        deepEqual({ foo: undefined, baz: 'baz' }, { bar: 'bar', baz: 'baz' }),
      ).toEqual(false);

      expect(
        deepEqual({ foo: undefined, baz: 'baz' }, { foo: null, baz: 'baz' }),
      ).toEqual(false);

      expect(
        deepEqual(
          { foo: undefined, bar: 'baz' },
          { foo: undefined, bar: 'baz' },
        ),
      ).toEqual(true);

      expect(
        deepEqual({ foo: null, bar: 'baz' }, { foo: null, bar: 'baz' }),
      ).toEqual(true);
    });

    test('NaN', () => {
      expect(deepEqual({ foo: NaN }, { foo: NaN })).toEqual(true);
      expect(deepEqual({ foo: NaN }, { foo: null })).toEqual(false);
    });
  });
});
