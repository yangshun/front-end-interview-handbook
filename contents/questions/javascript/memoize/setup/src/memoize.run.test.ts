import memoize from './memoize';

describe('memoize', () => {
  test('returns a function', () => {
    const memoizedFn = memoize(() => {});
    expect(memoizedFn).toBeInstanceOf(Function);
  });

  test('numbers', () => {
    let count = 0;
    function double(x: number) {
      count++;
      return x * 2;
    }
    const memoizedFn = memoize(double);
    expect(count).toBe(0);
    expect(memoizedFn(1)).toBe(2);
    expect(count).toBe(1);
    expect(memoizedFn(1)).toBe(2);
    expect(count).toBe(1);
    expect(memoizedFn(1)).toBe(2);
    expect(count).toBe(1);
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
    expect(memoizedFn('foo')).toBe('foofoo');
    expect(count).toBe(1);
  });

  test('memoize different arguments', () => {
    let count = 0;
    function double(x: string) {
      count++;
      return x + x;
    }
    const memoizedFn = memoize(double);
    expect(count).toBe(0);
    expect(memoizedFn('foo')).toBe('foofoo');
    expect(count).toBe(1);
    expect(memoizedFn('foo')).toBe('foofoo');
    expect(count).toBe(1);
    expect(memoizedFn('bar')).toBe('barbar');
    expect(count).toBe(2);
    expect(memoizedFn('bar')).toBe('barbar');
    expect(count).toBe(2);
  });
});
