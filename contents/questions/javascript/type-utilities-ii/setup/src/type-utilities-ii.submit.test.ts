import {
  isArray,
  isFunction,
  isObject,
  isPlainObject,
} from './type-utilities-ii';

describe('type-utilities-ii', () => {
  describe('isArray', () => {
    test('array', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2])).toBe(true);
      expect(isArray([1])).toBe(true);
      expect(isArray(new Array(3))).toBe(true);
      expect(isArray(Array(3))).toBe(true);
      expect(isArray(Array.from({ length: 10 }, (_, i) => i))).toBe(true);
    });

    test('non-array', () => {
      expect(isArray(true)).toBe(false);
      expect(isArray(false)).toBe(false);
      expect(isArray('true')).toBe(false);
      expect(isArray(new Date())).toBe(false);
      expect(isArray(new Error())).toBe(false);
      expect(isArray({ a: 1 })).toBe(false);
      expect(isArray(/x/)).toBe(false);
      expect(isArray('a')).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
      expect(isArray(1)).toBe(false);
      expect(isArray(NaN)).toBe(false);
      expect(isArray(Symbol('symbol'))).toBe(false);
      expect(isArray(new Uint8Array(32))).toBe(false);
    });
  });

  describe('isFunction', () => {
    test('function declarations', () => {
      function identity<T>(x: T): T {
        return x;
      }
      expect(isFunction(identity)).toBe(true);
    });

    test('arrow functions', () => {
      const identity = <T>(x: T) => {
        return x;
      };
      expect(isFunction(identity)).toBe(true);
    });

    test('non-function', () => {
      expect(isFunction(true)).toBe(false);
      expect(isFunction(false)).toBe(false);
      expect(isFunction('true')).toBe(false);
      expect(isFunction([1, 2, 3])).toBe(false);
      expect(isFunction(new Date())).toBe(false);
      expect(isFunction(new Error())).toBe(false);
      expect(isFunction({ a: 1 })).toBe(false);
      expect(isFunction(/x/)).toBe(false);
      expect(isFunction('a')).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
      expect(isFunction(1)).toBe(false);
      expect(isFunction(NaN)).toBe(false);
      expect(isFunction(Symbol('symbol'))).toBe(false);
    });
  });

  describe('isObject', () => {
    test('object', () => {
      expect(isObject([1, 2, 3])).toBe(true);
      expect(isObject(Object(false))).toBe(true);
      expect(isObject(new Date())).toBe(true);
      expect(isObject(new Error())).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
      expect(isObject(Object(0))).toBe(true);
      expect(isObject(/x/)).toBe(true);
      expect(isObject(Object('a'))).toBe(true);
      expect(isObject(new Set())).toBe(true);
      expect(isObject(new Map())).toBe(true);
      expect(isObject(() => {})).toBe(true);
    });

    test('class instance', () => {
      class Foo {
        value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      expect(isObject(new Foo(1))).toBe(true);
    });

    test('function instance', () => {
      function Foo(this: any, value: number) {
        this.value = value;
      }

      expect(isObject(new (Foo as any)(1))).toBe(true);
    });

    test('non-object', () => {
      expect(isObject(true)).toBe(false);
      expect(isObject(false)).toBe(false);
      expect(isObject('true')).toBe(false);
      expect(isObject('a')).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject(1)).toBe(false);
      expect(isObject(NaN)).toBe(false);
      expect(isObject(Symbol('symbol'))).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    test('object literals', () => {
      function Foo(this: any, value: any) {
        this.value = value;
      }

      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
      expect(isPlainObject({ constructor: Foo })).toBe(true);
    });

    test('object without prototype', () => {
      expect(isPlainObject(Object.create(null))).toBe(true);
    });

    test('class instance', () => {
      class Foo {
        value: number;

        constructor(value: number) {
          this.value = value;
        }
      }

      expect(isPlainObject(new Foo(1))).toBe(false);
    });

    test('function instance', () => {
      function Foo(this: any, value: any) {
        this.value = value;
      }

      expect(isPlainObject(new (Foo as any)(1))).toBe(false);
    });

    test('non-plain objects', () => {
      expect(isPlainObject(true)).toBe(false);
      expect(isPlainObject(false)).toBe(false);
      expect(isPlainObject('true')).toBe(false);
      expect(isPlainObject([1, 2, 3])).toBe(false);
      expect(isPlainObject(new Date())).toBe(false);
      expect(isPlainObject(new Error())).toBe(false);
      expect(isPlainObject(/x/)).toBe(false);
      expect(isPlainObject('a')).toBe(false);
      expect(isPlainObject(null)).toBe(false);
      expect(isPlainObject(undefined)).toBe(false);
      expect(isPlainObject(1)).toBe(false);
      expect(isPlainObject(NaN)).toBe(false);
      expect(isPlainObject(Symbol('symbol'))).toBe(false);
      expect(isPlainObject(new Set())).toBe(false);
      expect(isPlainObject(new Map())).toBe(false);
    });
  });
});
