import mean from './mean';

describe('mean', () => {
  test('small input array', () => {
    expect(mean([])).toEqual(NaN);
    expect(mean([1])).toEqual(1);
    expect(mean([1, 3])).toEqual(2);
  });

  test('array contains negative values', () => {
    expect(mean([-1, -2, 3])).toEqual(0);
    expect(mean([-1, -2, -3])).toEqual(-2);
  });

  test('array contains decimal values', () => {
    expect(mean([1.3, 2, 3])).toBeCloseTo(2.1);
    expect(mean([2.4, 2.1])).toBeCloseTo(2.25);
  });
});
