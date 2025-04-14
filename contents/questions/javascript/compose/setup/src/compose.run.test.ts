import compose from './compose';

const identity = <T>(x: T): T => x;
const double = (x: number) => x * 2;
const square = (x: number) => x * x;

describe('compose', () => {
  test('returns a function', () => {
    const composed = compose(identity);
    expect(typeof composed).toBe('function');
  });

  test('identity', () => {
    const composed = compose(identity);
    expect(composed(42)).toBe(42);
  });

  test('square then double', () => {
    const composed = compose(square, double);
    expect(composed(4)).toBe(64);
  });
});
