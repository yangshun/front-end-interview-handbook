import curry from './curry-iii';

function multiply(...numbers: Array<number>) {
  return numbers.reduce((a, b) => a * b, 1);
}
function sum(...numbers: Array<number>) {
  return numbers.reduce((a, b) => a + b, 0);
}

describe('curry', () => {
  test('returns function', () => {
    const curried = curry(multiply);
    expect(curried).toBeInstanceOf(Function);
  });

  test('empty function', () => {
    const curried = curry(multiply);
    expect(+curried()).toBe(1);
  });

  test('single argument', () => {
    const curried = curry(sum);
    expect(+curried(3)).toBe(3);
  });

  describe('two arguments', () => {
    test('one arg at a time', () => {
      const curried = curry(multiply);
      expect(+curried(7)(3)).toBe(21);
    });

    test('both args at once', () => {
      const curried = curry(multiply);
      expect(+curried(7, 3)).toBe(21);
    });
  });

  describe('multiple arguments', () => {
    test('one arg at a time', () => {
      const curried = curry(multiply);
      expect(+curried(7)(3)(2)).toBe(42);
    });

    test('multiple args at once', () => {
      const curried = curry(multiply);
      expect(+curried(7, 3, 2)).toBe(42);
      expect(+curried(7, 3, 2)).toBe(42);
      expect(+curried(7, 3)(2)).toBe(42);
      expect(+curried(7)(3, 2)).toBe(42);
    });
  });

  test('can be reused', () => {
    const curriedMultiply = curry(multiply);
    const multiplyByThree = curriedMultiply(3);
    expect(+multiplyByThree).toBe(3);
    expect(+multiplyByThree(4)).toBe(12);

    const multiplyByFifteen = multiplyByThree(5);
    expect(+multiplyByFifteen).toBe(15);
    expect(+multiplyByFifteen(2)).toBe(30);
  });

  test('ignores empty args', () => {
    const curried = curry(multiply);
    expect(+curried()(4)()(3)()(2)).toBe(24);
    expect(+curried()()()()(4)(2)(3)).toBe(24);
  });

  describe('can access this', () => {
    test('single parameter', () => {
      const curried = curry(function (this: any, val: number) {
        return this.multiplier * val;
      });

      const obj = { multiplier: 5, mul: curried };
      expect(obj.mul()).toBeInstanceOf(Function);
      expect(+obj.mul(7)).toBe(35);
    });

    test('two arguments', () => {
      const curried = curry(function (this: any, foo: number, bar: number) {
        return this.base * foo + bar;
      });

      const obj = { base: 5, mul: curried };
      expect(obj.mul()).toBeInstanceOf(Function);
      expect(+obj.mul(3)(2)).toBe(17);
      expect(+obj.mul(3, 2)).toBe(17);
      expect(+obj.mul(3)()(2)).toBe(17);
      expect(+obj.mul()(3)()(2)).toBe(17);
    });

    test('variadic arguments', () => {
      const curried = curry(function (this: any, ...numbers: Array<number>) {
        return this.multiplier * numbers.reduce((a, b) => a * b, 1);
      });

      const obj = { multiplier: 5, mul: curried };
      expect(+obj.mul(7, 2)).toBe(70);
    });
  });
});
