import rangeRight from './range-right';

describe('rangeRight', () => {
  test('start equals to end', () => {
    expect(rangeRight(0)).toEqual([]);
  });

  test('start specified', () => {
    expect(rangeRight(2, 5)).toEqual([4, 3, 2]);
  });

  test('start and step specified', () => {
    expect(rangeRight(1, 7, 2)).toEqual([5, 3, 1]);
  });
});
