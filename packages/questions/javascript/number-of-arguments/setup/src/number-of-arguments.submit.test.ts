import numberOfArguments from './number-of-arguments';

describe('numberOfArguments', () => {
  test('no arguments', () => {
    expect(numberOfArguments()).toBe(0);
  });

  test('one argument', () => {
    expect(numberOfArguments(0)).toBe(1);
    expect(numberOfArguments(null)).toBe(1);
    expect(numberOfArguments(undefined)).toBe(1);
    expect(numberOfArguments(NaN)).toBe(1);
    expect(numberOfArguments(true)).toBe(1);
    expect(numberOfArguments(false)).toBe(1);
    expect(numberOfArguments([1, 2, 3])).toBe(1);
    expect(numberOfArguments({})).toBe(1);
  });

  test('two arguments', () => {
    expect(numberOfArguments(0, 1)).toBe(2);
    expect(numberOfArguments(true, false)).toBe(2);
    expect(numberOfArguments([1, 2, 3], [4, 5, 6])).toBe(2);
    expect(numberOfArguments({}, [])).toBe(2);
  });

  test('multiple arguments', () => {
    expect(numberOfArguments(0, 1, 2)).toBe(3);
    expect(numberOfArguments(true, false, null)).toBe(3);
    expect(numberOfArguments([1, 2, 3], [4, 5, 6], [7, 8, 9])).toBe(3);
    expect(numberOfArguments(...[1, 2, 3])).toBe(3);
    expect(numberOfArguments({}, [], new Set())).toBe(3);
  });
});
