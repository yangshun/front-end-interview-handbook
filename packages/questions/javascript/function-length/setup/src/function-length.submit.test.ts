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

  test('multiple arguments', () => {
    expect(
      functionLength(function foo(a: number, b: number, c: number) {}),
    ).toBe(3);
    expect(functionLength((a: number, b: number, c: number) => {})).toBe(3);
  });

  // TODO: Transpilation output makes the default parameters non-default, thus
  // the results are different in the browser. Commented out for now.
  // test('default arguments', () => {
  //   expect(functionLength(function foo(a, b = 2) {})).toBe(1);
  //   expect(functionLength(function foo(a = 1, b = 2) {})).toBe(0);
  // });

  // test('rest arguments', () => {
  //   expect(functionLength(function foo(...args) {})).toBe(0);
  //   expect(functionLength(function foo(a, ...args) {})).toBe(1);
  //   expect(functionLength(function foo(a, b, ...args) {})).toBe(2);
  //   expect(functionLength(function foo(a, b = 1, ...args) {})).toBe(1);
  // });
});
