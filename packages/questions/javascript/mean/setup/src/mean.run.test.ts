import mean from './mean';

describe('mean', () => {
  test('empty input array', () => {
    expect(mean([])).toEqual(NaN);
  });

  test('single value', () => {
    expect(mean([0])).toEqual(0);
  });

  test('two values', () => {
    expect(mean([1, 3])).toEqual(2);
  });
});
