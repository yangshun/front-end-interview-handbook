import mean from './mean';

describe('mean', () => {
  test('empty input array', () => {
    expect(mean([])).toBeNaN();
  });

  test('single value', () => {
    expect(mean([0])).toEqual(0);
    expect(mean([1])).toEqual(1);
  });

  test('two values', () => {
    expect(mean([0, 0])).toEqual(0);
    expect(mean([1, 3])).toEqual(2);
    expect(mean([0, 6])).toEqual(3);
  });

  test('positive values', () => {
    expect(mean([4, 2, 8, 6])).toEqual(5);
    expect(mean([0, 1, 2, 3, 4])).toEqual(2);
  });

  test('negative values', () => {
    expect(mean([-4, -2, -8, -6])).toEqual(-5);
    expect(mean([0, -1, -2, -3, -4])).toEqual(-2);
  });

  test('same values', () => {
    expect(mean([0, 0, 0])).toEqual(0);
    expect(mean([1, 1, 1, 1])).toEqual(1);
    expect(mean([-2, -2, -2, -2, -2])).toEqual(-2);
  });

  test('mean is not exact', () => {
    expect(mean([0, -1, -2, -3])).toBeCloseTo(-1.5);
    expect(mean([1, 2, 2])).toBeCloseTo(1.6666666666666667);
    expect(mean([1, 3, 5, 4, 2, 2, 6, 2])).toBeCloseTo(3.125);
  });

  test('decimal values', () => {
    expect(mean([-1.3, -2, 3])).toBeCloseTo(-0.1);
    expect(mean([-1, 2, 0.2])).toBeCloseTo(0.4);
    expect(mean([1, -2, -2])).toBeCloseTo(-1);
  });
});
