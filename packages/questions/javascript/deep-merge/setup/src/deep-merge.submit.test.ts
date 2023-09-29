import deepMerge from './deep-merge';

describe('deepMerge', () => {
  test('empty', () => {
    expect(deepMerge({}, {})).toEqual({});
  });

  test('single key', () => {
    expect(deepMerge({ foo: 2 }, {})).toEqual({ foo: 2 });
    expect(deepMerge({}, { foo: 2 })).toEqual({ foo: 2 });
  });

  test('multiple keys', () => {
    expect(deepMerge({ foo: 2, bar: 3 }, { qux: 4 })).toEqual({
      foo: 2,
      bar: 3,
      qux: 4,
    });
    expect(deepMerge({ foo: 2 }, { bar: 3, qux: 4 })).toEqual({
      foo: 2,
      bar: 3,
      qux: 4,
    });
  });

  test('overlapping keys', () => {
    expect(deepMerge({ foo: 2, bar: 3 }, { bar: 4 })).toEqual({
      foo: 2,
      bar: 4,
    });
    expect(deepMerge({ bar: 3 }, { foo: 2, bar: 4 })).toEqual({
      foo: 2,
      bar: 4,
    });
  });

  test('null values', () => {
    expect(deepMerge({ foo: {} }, { foo: null })).toEqual({ foo: null });
    expect(deepMerge({ foo: null }, { foo: {} })).toEqual({ foo: {} });
    expect(deepMerge({ foo: null }, { bar: {} })).toEqual({
      foo: null,
      bar: {},
    });
  });

  test('nested objects', () => {
    expect(
      deepMerge(
        { foo: 3, bar: { baz: 5, qux: 6, boo: 5 } },
        { foo: 30, blah: 0, bar: { baz: 10, qux: 20 } },
      ),
    ).toEqual({
      foo: 30,
      blah: 0,
      bar: {
        baz: 10,
        qux: 20,
        boo: 5,
      },
    });
    expect(
      deepMerge(
        { foo: 3, bar: { baz: 5, qux: 6 } },
        { foo: 30, blah: 0, bar: { baz: 10, qux: 20, boo: 5 } },
      ),
    ).toEqual({
      foo: 30,
      blah: 0,
      bar: {
        baz: 10,
        qux: 20,
        boo: 5,
      },
    });
  });

  describe('arrays', () => {
    test('array values', () => {
      expect(deepMerge([], [3, 4])).toEqual([3, 4]);
      expect(deepMerge([1, 2], [])).toEqual([1, 2]);
      expect(deepMerge([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    });

    test('array within objects', () => {
      expect(deepMerge({ foo: 3, bar: null }, { bar: [1, 2, 3] })).toEqual({
        foo: 3,
        bar: [1, 2, 3],
      });
      expect(deepMerge({ foo: 3, bar: { 1: 2 } }, { bar: [1, 2, 3] })).toEqual({
        foo: 3,
        bar: [1, 2, 3],
      });
      expect(deepMerge({ foo: 3, qux: null }, { bar: [1, 2, 3] })).toEqual({
        foo: 3,
        bar: [1, 2, 3],
        qux: null,
      });
    });

    test('merge arrays', () => {
      expect(deepMerge({ foo: 3, bar: [7, 5] }, { bar: [1, 2, 3] })).toEqual({
        foo: 3,
        bar: [7, 5, 1, 2, 3],
      });
      expect(
        deepMerge({ foo: 3, bar: [7, 5] }, { bar: [{}, null, []] }),
      ).toEqual({
        foo: 3,
        bar: [7, 5, {}, null, []],
      });
    });

    test('within nested objects', () => {
      expect(
        deepMerge(
          { foo: 3, bar: { baz: [5, 4], qux: 6, boo: 5 } },
          { foo: 30, blah: 0, bar: { baz: [10], qux: 20 } },
        ),
      ).toEqual({
        foo: 30,
        blah: 0,
        bar: {
          baz: [5, 4, 10],
          qux: 20,
          boo: 5,
        },
      });
      expect(
        deepMerge(
          { foo: 3, bar: { baz: 5, qux: [6, 7] } },
          { foo: 30, blah: 0, bar: { baz: 10, qux: 20, boo: 5 } },
        ),
      ).toEqual({
        foo: 30,
        blah: 0,
        bar: {
          baz: 10,
          qux: 20,
          boo: 5,
        },
      });
      expect(
        deepMerge(
          { foo: 3, bar: { baz: 5, qux: 20 } },
          { foo: 30, blah: 0, bar: { baz: 10, qux: [6, 7], boo: 5 } },
        ),
      ).toEqual({
        foo: 30,
        blah: 0,
        bar: {
          baz: 10,
          qux: [6, 7],
          boo: 5,
        },
      });
    });
  });

  describe('does not mutate the input', () => {
    test('primitives', () => {
      const objA = { a: 3, foo: 2, qux: 6 };
      const objB = { bar: 6, b: 4, qux: 8 };
      expect(deepMerge(objA, objB)).toEqual({
        a: 3,
        foo: 2,
        bar: 6,
        b: 4,
        qux: 8,
      });
      expect(objA).toEqual({ a: 3, foo: 2, qux: 6 });
      expect(objB).toEqual({ bar: 6, b: 4, qux: 8 });
    });

    test('arrays', () => {
      const objA = { a: 3, c: [1, 2] };
      const objB = { b: 4, c: [3, 4] };
      expect(deepMerge(objA, objB)).toEqual({
        a: 3,
        b: 4,
        c: [1, 2, 3, 4],
      });
      expect(objA).toEqual({ a: 3, c: [1, 2] });
      expect(objB).toEqual({ b: 4, c: [3, 4] });
    });
  });
});
