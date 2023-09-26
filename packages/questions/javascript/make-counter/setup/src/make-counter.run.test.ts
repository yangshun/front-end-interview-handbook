import makeCounter from './make-counter';

describe('makeCounter', () => {
  test('returns a function', () => {
    const counter = makeCounter();
    expect(counter).toBeInstanceOf(Function);
  });

  test('return default value', () => {
    const counter = makeCounter();
    expect(counter()).toBe(0);
  });

  test('increments', () => {
    const counter = makeCounter();
    expect(counter()).toBe(0);
    expect(counter()).toBe(1);
    expect(counter()).toBe(2);
  });
});
