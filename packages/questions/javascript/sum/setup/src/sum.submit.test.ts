import sum from './sum';

describe('sum', () => {
  test('one number', () => {
    expect(sum(1)()).toBe(1);
    expect(sum(-1)()).toBe(-1);
  });

  test('two numbers', () => {
    // @ts-ignore
    expect(sum(1)(2)()).toBe(3);
    // @ts-ignore
    expect(sum(89)(11)()).toBe(100);
    // @ts-ignore
    expect(sum(-1)(-2)()).toBe(-3);
  });

  test('zero works', () => {
    // @ts-ignore
    expect(sum(0)(0)(0)()).toBe(0);
    // @ts-ignore
    expect(sum(1)(2)(0)()).toBe(3);
    // @ts-ignore
    expect(sum(1)(0)(89)(10)()).toBe(100);
    // @ts-ignore
    expect(sum(-1)(0)(-2)()).toBe(-3);
  });

  test('negative numbers', () => {
    // @ts-ignore
    expect(sum(-1)(-2)()).toBe(-3);
    // @ts-ignore
    expect(sum(-89)(-2)()).toBe(-91);
    // @ts-ignore
    expect(sum(-42)(42)()).toBe(0);
  });

  test('returns function if not terminated', () => {
    expect(sum(1)).toBeInstanceOf(Function);
    // @ts-ignore
    expect(sum(1)(2)).toBeInstanceOf(Function);
    // @ts-ignore
    expect(sum(1)(2)(3)).toBeInstanceOf(Function);
  });

  test('can be reused', () => {
    const addTwo = sum(2);
    // @ts-ignore
    expect(addTwo(3)()).toBe(5);
    // @ts-ignore
    expect(addTwo(4)()).toBe(6);
    // @ts-ignore
    expect(addTwo(3)(4)()).toBe(9);
  });
});
