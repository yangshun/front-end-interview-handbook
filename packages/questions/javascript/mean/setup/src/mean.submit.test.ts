import mean from './mean';

describe('mean', () => {
  test('empty input array', () => {
    expect(mean([])).toEqual(NaN);
  });

  test('all values in array are positive integers', () => {
    expect(mean([4, 2, 8, 6])).toEqual(5);
    expect(mean([0, 1, 2, 3, 4])).toEqual(2);
  });

  test('array contains negative and/or decimal values', () => {
    expect(mean([-1.3, -2, 3])).toBeCloseTo(-0.1);
    expect(mean([-1, 2, 0.2])).toBeCloseTo(0.4);
    expect(mean([1, -2, -2])).toBeCloseTo(-1);
  });

  test('mean is not exact', () => {
    expect(mean([0, -1, -2, -3])).toBeCloseTo(-1.5)
    expect(mean([1, 2, 2])).toBeCloseTo(1.6666666666666667);
    expect(mean([1, 3, 5, 4, 2, 2, 6, 2])).toBeCloseTo(3.125);
  });
});
