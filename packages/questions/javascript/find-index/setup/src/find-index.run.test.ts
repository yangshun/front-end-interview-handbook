import findIndex from './find-index';

describe('findIndex', () => {
  test('empty array', () => {
    expect(findIndex([], (num: number) => num % 2 === 0)).toBe(-1);
  });

  test('finds index of first even number', () => {
    expect(findIndex([4, 12, 8, 130, 44], (num: number) => num % 2 === 0)).toBe(
      0,
    );
    expect(findIndex([5, 12, 8, 130, 44], (num: number) => num % 2 === 0)).toBe(
      1,
    );
  });
});
