import compose from './compose';

const identity = <T>(x: T): T => x;
const double = (x: number) => x * 2;
const square = (x: number) => x * x;

describe('compose', () => {
  test('returns a function', () => {
    const composed = compose(identity);
    expect(typeof composed).toBe('function');
  });

  test('no functions', () => {
    const composed = compose();
    expect(composed(42)).toBe(42);
  });

  describe('only one function', () => {
    test('identity', () => {
      const composed = compose(identity);
      expect(composed(42)).toBe(42);
    });

    test('double', () => {
      const composed = compose(double);
      expect(composed(42)).toBe(84);
    });
  });

  describe('two functions', () => {
    test('identity', () => {
      const composed = compose(identity, identity);
      expect(composed(42)).toBe(42);
    });

    test('mixture', () => {
      const composed = compose(square, double);
      expect(composed(4)).toBe(64);
    });
  });

  describe('multiple functions', () => {
    test('identity', () => {
      const composed = compose(identity, identity, identity);
      expect(composed(42)).toBe(42);
    });

    test('mixture', () => {
      const composed = compose(square, identity, square, double, identity);
      expect(composed(3)).toBe(1296);
    });
  });
});
