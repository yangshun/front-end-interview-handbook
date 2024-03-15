import rangeRight from './range-right';

describe('rangeRight', () => {
  test('start equals to end', () => {
    expect(rangeRight(0)).toEqual([]);
    expect(rangeRight(-3, -3)).toEqual([]);
    expect(rangeRight(5, 5)).toEqual([]);
  });

  test('start specified', () => {
    expect(rangeRight(2, 5)).toEqual([4, 3, 2]);
    expect(rangeRight(-2, 1)).toEqual([0, -1, -2]);
    expect(rangeRight(-8, -4)).toEqual([-5, -6, -7, -8]);
  });

  test('start and step specified', () => {
    expect(rangeRight(1, 7, 2)).toEqual([5, 3, 1]);
    expect(rangeRight(-3, 6, 3)).toEqual([3, 0, -3]);
    expect(rangeRight(1, 8, 9)).toEqual([1]);
  });

  test('negative end value', () => {
    expect(rangeRight(-4)).toEqual([-3, -2, -1, 0]);
    expect(rangeRight(-9, -4)).toEqual([-5, -6, -7, -8, -9]);
  });

  test('negative step value', () => {
    expect(rangeRight(8, -2, -3)).toEqual([-1, 2, 5, 8]);
    expect(rangeRight(7, 4, -1)).toEqual([5, 6, 7]);
  });

  test('step value = 0', () => {
    expect(rangeRight(1, 5, 0)).toEqual([1, 1, 1, 1]);
    expect(rangeRight(-4, -2, 0)).toEqual([-4, -4]);
    expect(rangeRight(-2, -4, 0)).toEqual([]);
  });
});
