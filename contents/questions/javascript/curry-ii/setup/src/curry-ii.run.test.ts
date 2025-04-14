import curry from './curry-ii';

const empty = () => 0;
const square = (a: number) => a * a;
const mul = (a: number, b: number) => a * b;

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

  test('one arg at a time', () => {
    const curried = curry(mul);
    expect(curried()).toBeInstanceOf(Function);
    expect(curried(7)(3)).toBe(21);
  });

  test('both args at once', () => {
    const curried = curry(mul);
    expect(curried()).toBeInstanceOf(Function);
    expect(curried(7, 3)).toBe(21);
  });
});
