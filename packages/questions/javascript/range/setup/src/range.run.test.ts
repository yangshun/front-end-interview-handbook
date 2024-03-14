import range from './range';

describe('range', () => {
  test('start equals to end', () => {
    expect(range(0)).toEqual([]);
  });

  test('start specified', () => {
    expect(range(2, 5)).toEqual([2, 3, 4]);
  });

  test('start and step specified', () => {
    expect(range(1, 7, 2)).toEqual([1, 3, 5]);
  });
});
