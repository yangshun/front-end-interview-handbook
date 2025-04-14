import numberOfArguments from './number-of-arguments';

describe('numberOfArguments', () => {
  test('no arguments', () => {
    expect(numberOfArguments()).toBe(0);
  });

  test('one argument', () => {
    expect(numberOfArguments(0)).toBe(1);
  });

  test('two arguments', () => {
    expect(numberOfArguments(0, 1)).toBe(2);
  });
});
