import deepMap from './deep-map';

const identity = <T>(x: T) => x;
const square = (x: number) => x * x;
const double = (x: number) => x * 2;

describe('deepMap', () => {
  test('numbers', () => {
    expect(deepMap(3, square)).toBe(9);
    expect(deepMap(3, double)).toBe(6);
  });

  test('arrays', () => {
    expect(deepMap([-4, 10], identity)).toEqual([-4, 10]);
    expect(deepMap([-4, 10], square)).toEqual([16, 100]);
  });

  test('objects', () => {
    expect(deepMap({ foo: 3, bar: [7, 5] }, double)).toEqual({
      foo: 6,
      bar: [14, 10],
    });
  });
});
