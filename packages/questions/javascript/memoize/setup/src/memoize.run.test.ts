import memoize from './memoize';

describe('memoize', () => {
  test('returns a function', () => {
    const memoizedFn = memoize(() => {});
    expect(typeof memoizedFn).toBe('function');
  });

  test('numbers', () => {
    let count = 0;
    function double(x) {
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
    function repeat(x) {
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
    function double(x) {
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

  test('differentiates strings and numbers', () => {
    let count = 0;
    function identity(x) {
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

  test('can access `this`', () => {
    let count = 0;
    function mul(x) {
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
