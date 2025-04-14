import makeCounter from './make-counter-ii';

describe('makeCounter', () => {
  test('returns an object', () => {
    const counter = makeCounter();

    expect(typeof counter).toBe('object');
  });

  describe('get', () => {
    test('default', () => {
      const counter = makeCounter();
      expect(counter.get()).toBe(0);
    });

    test('custom', () => {
      const counter = makeCounter(-4);
      expect(counter.get()).toBe(-4);
    });
  });

  describe('increment', () => {
    test('default', () => {
      const counter = makeCounter();
      expect(counter.increment()).toBe(1);
      expect(counter.increment()).toBe(2);
    });

    test('custom', () => {
      const counter = makeCounter(-4);
      expect(counter.increment()).toBe(-3);
      expect(counter.increment()).toBe(-2);
    });
  });

  describe('decrement', () => {
    test('default', () => {
      const counter = makeCounter();
      expect(counter.decrement()).toBe(-1);
      expect(counter.decrement()).toBe(-2);
    });

    test('custom', () => {
      const counter = makeCounter(-4);
      expect(counter.decrement()).toBe(-5);
      expect(counter.decrement()).toBe(-6);
    });
  });

  describe('reset', () => {
    test('default', () => {
      const counter = makeCounter();
      expect(counter.decrement()).toBe(-1);
      expect(counter.decrement()).toBe(-2);
      expect(counter.reset()).toBe(0);
    });

    test('custom', () => {
      const counter = makeCounter(-4);
      expect(counter.decrement()).toBe(-5);
      expect(counter.decrement()).toBe(-6);
      expect(counter.reset()).toBe(-4);
    });
  });

  describe('integration', () => {
    test('default', () => {
      const counter = makeCounter();
      expect(counter.get()).toBe(0);
      expect(counter.increment()).toBe(1);
      expect(counter.increment()).toBe(2);
      expect(counter.get()).toBe(2);
      expect(counter.reset()).toBe(0);
      expect(counter.decrement()).toBe(-1);
    });

    test('custom', () => {
      const counter = makeCounter(5);
      expect(counter.get()).toBe(5);
      expect(counter.decrement()).toBe(4);
      expect(counter.decrement()).toBe(3);
      expect(counter.get()).toBe(3);
      expect(counter.reset()).toBe(5);
      expect(counter.increment()).toBe(6);
    });
  });

  test('isolated instances', () => {
    const counterA = makeCounter(5);
    const counterB = makeCounter(10);

    expect(counterA.get()).toBe(5);
    expect(counterB.get()).toBe(10);

    expect(counterA.decrement()).toBe(4);
    expect(counterA.decrement()).toBe(3);
    expect(counterA.get()).toBe(3);

    expect(counterB.get()).toBe(10);
    expect(counterB.increment()).toBe(11);
  });
});
