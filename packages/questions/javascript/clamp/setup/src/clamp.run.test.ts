import clamp from './clamp';

describe('clamp', () => {
  test('negative numbers', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
  });

  test('positive numbers', () => {
    expect(clamp(10, -5, 5)).toBe(5);
  });
});
