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

  test('one arg at a time', () => {
    const curried = curry(multiply);
    expect(+curried(7)(3)).toBe(21);
  });

  test('both args at once', () => {
    const curried = curry(multiply);
    expect(+curried(7, 3)).toBe(21);
  });
});
