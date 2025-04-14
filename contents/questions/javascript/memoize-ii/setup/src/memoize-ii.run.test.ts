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
});
