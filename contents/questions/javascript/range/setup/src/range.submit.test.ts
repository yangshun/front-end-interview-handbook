import range from './range';

describe('range', () => {
  test('start equals to end', () => {
    expect(range(0)).toEqual([]);
    expect(range(-3, -3)).toEqual([]);
    expect(range(5, 5)).toEqual([]);
  });

  test('start specified', () => {
    expect(range(2, 5)).toEqual([2, 3, 4]);
    expect(range(-2, 1)).toEqual([-2, -1, 0]);
    expect(range(-8, -4)).toEqual([-8, -7, -6, -5]);
  });

  test('start and step specified', () => {
    expect(range(1, 7, 2)).toEqual([1, 3, 5]);
    expect(range(-3, 6, 3)).toEqual([-3, 0, 3]);
    expect(range(1, 8, 9)).toEqual([1]);
  });

  test('negative end value', () => {
    expect(range(-4)).toEqual([0, -1, -2, -3]);
    expect(range(-9, -4, 1)).toEqual([-9, -8, -7, -6, -5]);
    expect(range(8, -2, -3)).toEqual([8, 5, 2, -1]);
  });

  test('negative step value', () => {
    expect(range(8, -2, -3)).toEqual([8, 5, 2, -1]);
    expect(range(7, 4, -1)).toEqual([7, 6, 5]);
  });

  test('step value = 0', () => {
    expect(range(1, 5, 0)).toEqual([1, 1, 1, 1]);
    expect(range(-4, -2, 0)).toEqual([-4, -4]);
    expect(range(-2, -4, 0)).toEqual([]);
  });
});
