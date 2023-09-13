import once from './once';

describe('once', () => {
  test('returns function', () => {
    const onced = once(() => {});
    expect(onced).toBeInstanceOf(Function);
  });

  test('only run once', () => {
    let i = 0;
    const onced = once(() => ++i);

    onced();
    onced();
    expect(i).toBe(1);
  });

  test('returns the value of the first invocation', () => {
    let i = 0;
    const onced = once(() => ++i);
    expect(onced()).toBe(1);
    expect(onced()).toBe(1);
    expect(i).toBe(1);

    i = 99;
    expect(onced()).toBe(1);
    expect(i).toBe(99);
  });

  describe('accepts arguments', () => {
    test('single arguments', () => {
      const onced = once((a) => a * 2);

      expect(onced(2)).toBe(4);
      expect(onced(6)).toBe(4);
      expect(onced(100)).toBe(4);
    });

    test('two arguments', () => {
      const onced = once((a, b) => a + b);

      expect(onced(2, 3)).toBe(5);
      expect(onced(6, 7)).toBe(5);
    });
  });

  test('can access this', () => {
    const onced = once(function (val) {
      return this.multiplier * val;
    });

    const obj = { multiplier: 5, mul: onced };
    expect(obj.mul(7)).toBe(35);
    expect(obj.mul(10)).toBe(35);
  });
});
