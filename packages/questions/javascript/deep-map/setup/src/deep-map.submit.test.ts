import deepMap from './deep-map';

const identity = <T>(x: T) => x;
const dummy = () => 'dummy';
const square = (x: number) => x * x;
const negate = (x: boolean) => !x;
const length = (x: { length: number }) => x.length;
const double = (x: number) => x * 2;

describe('deepMap', () => {
  describe('primitives', () => {
    test('numbers', () => {
      expect(deepMap(3, square)).toBe(9);
      expect(deepMap(3, double)).toBe(6);
    });

    test('boolean', () => {
      expect(deepMap(true, negate)).toBe(false);
      expect(deepMap(false, negate)).toBe(true);
    });

    test('strings', () => {
      expect(deepMap('hello', length)).toBe(5);
      expect(deepMap('byebye', length)).toBe(6);
    });

    test('null', () => {
      expect(deepMap(null, identity)).toBe(null);
    });
  });

  describe('non-primitives', () => {
    test('regexp', () => {
      expect(deepMap(/hello/, dummy)).toBe('dummy');
    });

    test('functions', () => {
      expect(deepMap(() => {}, dummy)).toBe('dummy');
    });
  });

  describe('arrays', () => {
    test('empty array', () => {
      expect(deepMap([], identity)).toEqual([]);
      expect(deepMap([], square)).toEqual([]);
    });

    test('one value', () => {
      expect(deepMap([10], identity)).toEqual([10]);
      expect(deepMap([10], square)).toEqual([100]);
    });

    test('two values', () => {
      expect(deepMap([-4, 10], identity)).toEqual([-4, 10]);
      expect(deepMap([-4, 10], square)).toEqual([16, 100]);
    });

    test('multiple values', () => {
      expect(deepMap([1, 2, 3, 4], identity)).toEqual([1, 2, 3, 4]);
      expect(deepMap([1, 2, 3, 4, 5], square)).toEqual([1, 4, 9, 16, 25]);
    });

    test('nested objects', () => {
      expect(deepMap([2, { foo: 3 }], double)).toEqual([4, { foo: 6 }]);
      expect(deepMap([2, { foo: 3 }], square)).toEqual([4, { foo: 9 }]);
    });

    test('nested arrays', () => {
      expect(deepMap([2, [3, [4]]], double)).toEqual([4, [6, [8]]]);
      expect(deepMap([2, [3, [4]]], square)).toEqual([4, [9, [16]]]);
    });

    test('does not mutate the input', () => {
      const obj = [3, 2];
      expect(deepMap(obj, double)).toEqual([6, 4]);
      expect(obj).toEqual([3, 2]);
    });
  });

  describe('objects', () => {
    test('empty', () => {
      expect(deepMap({}, double)).toEqual({});
    });

    test('single key', () => {
      expect(deepMap({ foo: 2 }, double)).toEqual({ foo: 4 });
    });

    test('multiple keys', () => {
      expect(deepMap({ foo: 2, bar: 3 }, double)).toEqual({ foo: 4, bar: 6 });
    });

    test('nested objects', () => {
      expect(deepMap({ foo: 3, bar: { baz: 5, qux: 6 } }, identity)).toEqual({
        foo: 3,
        bar: {
          baz: 5,
          qux: 6,
        },
      });
      expect(deepMap({ foo: 3, bar: { baz: 5, qux: 6 } }, double)).toEqual({
        foo: 6,
        bar: {
          baz: 10,
          qux: 12,
        },
      });
    });

    test('nested arrays', () => {
      expect(deepMap({ foo: 3, bar: [7, 5] }, identity)).toEqual({
        foo: 3,
        bar: [7, 5],
      });
      expect(deepMap({ foo: 3, bar: [7, 5] }, double)).toEqual({
        foo: 6,
        bar: [14, 10],
      });
    });

    test('does not mutate the input', () => {
      const obj = { bar: 3, foo: 2 };
      expect(deepMap(obj, double)).toEqual({
        foo: 4,
        bar: 6,
      });
      expect(obj).toEqual({
        foo: 2,
        bar: 3,
      });
    });
  });

  test('can access `this`', () => {
    expect(
      deepMap({ bar: 3, foo: 2 }, function (this: any, x: number) {
        return this.foo * x;
      }),
    ).toEqual({
      foo: 4,
      bar: 6,
    });
  });
});
