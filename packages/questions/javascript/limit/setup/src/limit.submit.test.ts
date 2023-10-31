import limit from './limit';

describe('limit', () => {
  test('returns function', () => {
    const limited = limit(() => {}, 1);
    expect(limited).toBeInstanceOf(Function);
  });

  describe('only run a limited number of times', () => {
    test('once', () => {
      let i = 0;
      const limited = limit(() => ++i, 1);

      limited();
      limited();
      expect(i).toBe(1);
    });

    test('twice', () => {
      let i = 0;
      const limited = limit(() => ++i, 2);

      limited();
      expect(i).toBe(1);
      limited();
      expect(i).toBe(2);
      limited();
      expect(i).toBe(2);
      limited();
      expect(i).toBe(2);
    });

    test('thrice', () => {
      let i = 0;
      const limited = limit(() => ++i, 3);

      limited();
      expect(i).toBe(1);
      limited();
      expect(i).toBe(2);
      limited();
      expect(i).toBe(3);
      limited();
      expect(i).toBe(3);
      limited();
      expect(i).toBe(3);
    });
  });

  describe('returns the value of the last real invocation', () => {
    test('once', () => {
      let i = 0;
      const limited = limit(() => ++i, 1);
      expect(limited()).toBe(1);
      expect(limited()).toBe(1);
      expect(i).toBe(1);

      i = 99;
      expect(limited()).toBe(1);
      expect(i).toBe(99);
    });

    test('twice', () => {
      let i = 0;
      const limited = limit(() => ++i, 2);
      expect(limited()).toBe(1);
      expect(limited()).toBe(2);
      expect(i).toBe(2);

      i = 99;
      expect(limited()).toBe(2);
      expect(i).toBe(99);
    });
  });

  describe('accepts arguments', () => {
    test('single arguments', () => {
      const limited = limit((a) => a * 2, 2);

      expect(limited(2)).toBe(4);
      expect(limited(6)).toBe(12);
      expect(limited(100)).toBe(12);
    });

    test('two arguments', () => {
      const limited = limit((a, b) => a + b, 3);

      expect(limited(2, 3)).toBe(5);
      expect(limited(6, 7)).toBe(13);
      expect(limited(13, 7)).toBe(20);
      expect(limited(15, 13)).toBe(20);
    });
  });

  test('can access this', () => {
    const limited = limit(function (this: any, val: number) {
      return this.multiplier * val;
    }, 3);

    const obj = { multiplier: 5, mul: limited };
    expect(obj.mul(7)).toBe(35);
    expect(obj.mul(10)).toBe(50);
    expect(obj.mul(13)).toBe(65);
    expect(obj.mul(0)).toBe(65);
  });
});
