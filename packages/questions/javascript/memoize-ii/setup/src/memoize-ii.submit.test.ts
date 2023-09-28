import memoize from './memoize-ii';

describe('memoize', () => {
  test('returns a function', () => {
    const memoizedFn = memoize(() => {});
    expect(typeof memoizedFn).toBe('function');
  });

  test('no arguments', () => {
    let count = 0;
    function foo() {
      count++;
      return 'booya';
    }
    const memoizedFn = memoize(foo);
    expect(count).toBe(0);
    expect(memoizedFn()).toBe('booya');
    expect(count).toBe(1);
    expect(memoizedFn()).toBe('booya');
    expect(count).toBe(1);
    expect(memoizedFn()).toBe('booya');
    expect(count).toBe(1);
  });

  test('single argument', () => {
    let count = 0;
    function double(x: number): number {
      count++;
      return x * 2;
    }
    const memoizedFn = memoize(double);
    expect(count).toBe(0);
    expect(memoizedFn(1)).toBe(2);
    expect(count).toBe(1);
    expect(memoizedFn(1)).toBe(2);
    expect(count).toBe(1);
    expect(memoizedFn(3)).toBe(6);
    expect(count).toBe(2);
    expect(memoizedFn(3)).toBe(6);
    expect(count).toBe(2);
    expect(memoizedFn(1)).toBe(2);
    expect(count).toBe(2);
  });

  test('two arguments', () => {
    let count = 0;
    function mul(a: number, b: number) {
      count++;
      return a * b;
    }
    const memoizedFn = memoize(mul);
    expect(count).toBe(0);
    expect(memoizedFn(3, 4)).toBe(12);
    expect(count).toBe(1);
    expect(memoizedFn(3, 4)).toBe(12);
    expect(count).toBe(1);
    expect(memoizedFn(3, 7)).toBe(21);
    expect(count).toBe(2);
    expect(memoizedFn(3, 7)).toBe(21);
    expect(count).toBe(2);
    expect(memoizedFn(3, 4)).toBe(12);
    expect(count).toBe(2);
  });

  test('strings', () => {
    let count = 0;
    function repeat(x: string) {
      count++;
      return x + x;
    }
    const memoizedFn = memoize(repeat);
    expect(count).toBe(0);
    expect(memoizedFn('foo')).toBe('foofoo');
    expect(count).toBe(1);
    expect(memoizedFn('foo')).toBe('foofoo');
    expect(count).toBe(1);
    expect(memoizedFn('bar')).toBe('barbar');
    expect(count).toBe(2);
    expect(memoizedFn('bar')).toBe('barbar');
    expect(count).toBe(2);
    expect(memoizedFn('foo')).toBe('foofoo');
    expect(count).toBe(2);
  });

  test('differentiates strings and numbers', () => {
    let count = 0;
    function identity<T>(x: T): T {
      count++;
      return x;
    }
    const memoizedFn = memoize(identity);
    expect(count).toBe(0);
    expect(memoizedFn('1')).toBe('1');
    expect(count).toBe(1);
    expect(memoizedFn('1')).toBe('1');
    expect(count).toBe(1);
    expect(memoizedFn(1)).toBe(1);
    expect(count).toBe(2);
    expect(memoizedFn(1)).toBe(1);
    expect(count).toBe(2);
  });

  describe('variadic arguments', () => {
    test('arguments of same type', () => {
      let count = 0;
      function product(...args: Array<number>) {
        count++;
        return args.reduce((acc, num) => acc * num, 1);
      }
      const memoizedFn = memoize(product);
      expect(count).toBe(0);
      expect(memoizedFn(3, 4, 5)).toBe(60);
      expect(count).toBe(1);
      expect(memoizedFn(3, 4, 5)).toBe(60);
      expect(count).toBe(1);
      expect(memoizedFn(4, 5, 6, 7)).toBe(840);
      expect(count).toBe(2);
      expect(memoizedFn(4, 5, 6, 7)).toBe(840);
      expect(count).toBe(2);
      expect(memoizedFn(3, 4, 5)).toBe(60);
      expect(count).toBe(2);
    });

    test('arguments of different type', () => {
      let count = 0;
      function repeat(str: string, times: number) {
        count++;
        return Array(times).fill(str).join('');
      }
      const memoizedFn = memoize(repeat);
      expect(count).toBe(0);
      expect(memoizedFn('abc', 3)).toBe('abcabcabc');
      expect(count).toBe(1);
      expect(memoizedFn('abc', 3)).toBe('abcabcabc');
      expect(count).toBe(1);
      expect(memoizedFn('bar', 2)).toBe('barbar');
      expect(count).toBe(2);
      expect(memoizedFn('bar', 2)).toBe('barbar');
      expect(count).toBe(2);
      expect(memoizedFn('abc', 3)).toBe('abcabcabc');
      expect(count).toBe(2);
    });
  });

  test('can access `this`', () => {
    let count = 0;
    function mul(this: any, x: number) {
      count++;
      return this.age * x;
    }
    const person = {
      age: 42,
      mul: memoize(mul),
    };
    expect(count).toBe(0);
    expect(person.mul(2)).toBe(84);
    expect(count).toBe(1);
    expect(person.mul(2)).toBe(84);
    expect(count).toBe(1);
  });
});
