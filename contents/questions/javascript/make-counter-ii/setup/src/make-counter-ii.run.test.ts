import makeCounter from './make-counter-ii';

describe('makeCounter', () => {
  test('returns an object', () => {
    const counter = makeCounter();
    expect(counter).toBeInstanceOf(Object);
  });

  test('default value', () => {
    const counter = makeCounter();
    expect(counter.get()).toBe(0);
  });

  test('increment', () => {
    const counter = makeCounter(-4);
    expect(counter.increment()).toBe(-3);
    expect(counter.increment()).toBe(-2);
  });

  test('decrement', () => {
    const counter = makeCounter();
    expect(counter.decrement()).toBe(-1);
    expect(counter.decrement()).toBe(-2);
  });
});
