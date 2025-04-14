import './array-map';

const identity = <T>(element: T) => element;
const square = (element: any) => element * element;
const multiplyByIndex = (element: number, index: number) => element * index;
const squareAlt = (element: number, index: number, array: Array<number>) =>
  element * array[index];
const usesThis = function (this: any, element: number) {
  return element * this;
};
const usesThisArrowFn = (element: number) => element * this!;

describe('Array.prototype.myMap', () => {
  test('empty array', () => {
    expect([].myMap(identity)).toEqual([]);
    expect([].myMap(square)).toEqual([]);
  });

  test('one value', () => {
    expect([10].myMap(identity)).toEqual([10]);
    expect([10].myMap(square)).toEqual([100]);
  });

  test('two values', () => {
    expect([-4, 10].myMap(identity)).toEqual([-4, 10]);
    expect([-4, 10].myMap(square)).toEqual([16, 100]);
  });

  test('multiple values', () => {
    expect([1, 2, 3, 4].myMap(identity)).toEqual([1, 2, 3, 4]);
    expect([1, 2, 3, 4, 5].myMap(square)).toEqual([1, 4, 9, 16, 25]);
  });

  test('reducer uses index argument when provided', () => {
    expect([1, 2, 3].myMap(multiplyByIndex)).toEqual([0, 2, 6]);
    expect([-1, -3, 4].myMap(multiplyByIndex)).toEqual([-0, -3, 8]);
  });

  test('reducer uses array argument when provided', () => {
    expect([1, 2, 3, 4].myMap(squareAlt)).toEqual([1, 4, 9, 16]);
    expect([-1, -3, 4].myMap(squareAlt)).toEqual([1, 9, 16]);
  });

  test('uses this argument', () => {
    expect([1, 2, 3, 4].myMap(usesThis)).toEqual([NaN, NaN, NaN, NaN]);
    expect([1, 2, 3, 4].myMap(usesThis, 10)).toEqual([10, 20, 30, 40]);
    expect([1, 2, 3, 4].myMap(usesThisArrowFn)).toEqual([NaN, NaN, NaN, NaN]);
    expect([1, 2, 3, 4].myMap(usesThisArrowFn, 10)).toEqual([
      NaN,
      NaN,
      NaN,
      NaN,
    ]);
  });

  test('sparse arrays', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect([1, 2, , 4].myMap(identity)).toEqual([1, 2, , 4]);
    // eslint-disable-next-line no-sparse-arrays
    expect([1, 2, , 4].myMap(square)).toEqual([1, 4, , 16]);
  });
});
