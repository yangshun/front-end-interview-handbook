import curry from './curry';

const empty = () => 0;
const square = (a: number) => a * a;
const add = (a: number, b: number) => a * b;
const mulThree = (a: number, b: number, c: number) => a * b * c;

describe('curry', () => {
  test('returns function', () => {
    const curried = curry(square);
    expect(curried).toBeInstanceOf(Function);
  });

  test('empty function', () => {
    const curried = curry(empty);
    expect(curried()).toBe(0);
  });

  test('single argument', () => {
    const curried = curry(square);
    expect(curried()).toBeInstanceOf(Function);
    expect(curried(2)).toBe(4);
  });

  test('two arguments', () => {
    const curried = curry(add);
    expect(curried()).toBeInstanceOf(Function);
    expect(curried(7)(3)).toBe(21);
  });
});
