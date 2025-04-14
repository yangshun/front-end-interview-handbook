import functionLength from './function-length';

describe('functionLength', () => {
  test('no arguments', () => {
    expect(functionLength(function foo() {})).toBe(0);
    expect(functionLength(() => {})).toBe(0);
  });

  test('one argument', () => {
    expect(functionLength(function foo(a: number) {})).toBe(1);
    expect(functionLength((a: number) => {})).toBe(1);
  });

  test('two arguments', () => {
    expect(functionLength(function foo(a: number, b: number) {})).toBe(2);
    expect(functionLength((a: number, b: number) => {})).toBe(2);
  });
});
