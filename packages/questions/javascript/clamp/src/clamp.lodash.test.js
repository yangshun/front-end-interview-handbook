import { clamp } from 'lodash';

describe('clamp', () => {
  test('should clamp positive numbers', () => {
    expect(clamp(10, -5, 5)).toBe(5);
    expect(clamp(10.6, -5.6, 5.4)).toBe(5.4);
    expect(clamp(Infinity, -5, 5)).toBe(5);
  });

  describe('in range', () => {
    test('negative numbers', () => {
      expect(clamp(-4, -5, 5)).toBe(-4);
      expect(clamp(-5, -5, 5)).toBe(-5);
      expect(clamp(-5.5, -5.6, 5.6)).toBe(-5.5);
    });

    test('positive numbers', () => {
      expect(clamp(4, -5, 5)).toBe(4);
      expect(clamp(5, -5, 5)).toBe(5);
      expect(clamp(4.5, -5.1, 5.2)).toBe(4.5);
    });

    test('should not alter `0` in range', () => {
      expect(1 / clamp(0, -5, 5)).toBe(Infinity);
    });
  });

  describe('out of range', () => {
    test('should clamp negative numbers', () => {
      expect(clamp(-10, -5, 5)).toBe(-5);
      expect(clamp(-10.2, -5.5, 5.5)).toBe(-5.5);
      expect(clamp(-Infinity, -5, 5)).toBe(-5);
    });

    test('should clamp to `0`', () => {
      expect(1 / clamp(-10, 0, 5)).toBe(Infinity);
    });
  });
});
