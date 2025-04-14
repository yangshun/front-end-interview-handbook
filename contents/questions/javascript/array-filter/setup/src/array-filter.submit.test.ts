import './array-filter';

const isEven = (element: any, index: number) => element % 2 === 0;
const isOdd = (element: any, index: number) => element % 2 === 1;
const isEvenIndex = (_: any, index: number) => index % 2 === 0;
const isOddIndex = (_: any, index: number) => index % 2 === 1;
const isSquareEven = (_: any, index: number, array: Array<any>) =>
  (array[index] * array[index]) % 2 === 0;
const isSquareOdd = (_: any, index: number, array: Array<any>) =>
  (array[index] * array[index]) % 2 === 1;
const isThisProductEven = function (this: any, element: number) {
  return (element * this) % 2 === 0;
};
const isThisProductEvenArrowFn = (element: number) =>
  (element * this!) % 2 === 0;

describe('Array.prototype.myFilter', () => {
  test('empty array', () => {
    expect([].myFilter(isEven)).toStrictEqual([]);
    expect([].myFilter(isOdd)).toStrictEqual([]);
  });

  test('one value', () => {
    expect([1].myFilter(isEven)).toStrictEqual([]);
    expect([1].myFilter(isOdd)).toStrictEqual([1]);
  });

  test('two values', () => {
    expect([1, 10].myFilter(isEven)).toStrictEqual([10]);
    expect([1, 10].myFilter(isOdd)).toStrictEqual([1]);
  });

  test('multiple values', () => {
    expect([1, 2, 3, 5, 7, 8, 9].myFilter(isEven)).toStrictEqual([2, 8]);
    expect([1, 2, 3, 5, 7, 8, 9].myFilter(isOdd)).toStrictEqual([
      1, 3, 5, 7, 9,
    ]);
  });

  test('reducer uses index argument when provided', () => {
    expect([1, 2, 3].myFilter(isEvenIndex)).toStrictEqual([1, 3]);
    expect([-1, -3, 4, 99].myFilter(isOddIndex)).toStrictEqual([-3, 99]);
  });

  test('reducer uses array argument when provided', () => {
    expect([1, 2, 3, 4].myFilter(isSquareEven)).toStrictEqual([2, 4]);
    expect([-3, 4, 1, 5].myFilter(isSquareOdd)).toStrictEqual([-3, 1, 5]);
  });

  test('uses this argument', () => {
    expect([1, 2, 3, 4].myFilter(isThisProductEven)).toStrictEqual([]);
    expect([1, 2, 3, 4].myFilter(isThisProductEven, 10)).toStrictEqual([
      1, 2, 3, 4,
    ]);
    expect([1, 2, 3, 4].myFilter(isThisProductEven, 9)).toStrictEqual([2, 4]);
    expect([1, 2, 3, 4].myFilter(isThisProductEvenArrowFn)).toStrictEqual([]);
    expect([1, 2, 3, 4].myFilter(isThisProductEvenArrowFn, 10)).toStrictEqual(
      [],
    );
    expect([1, 2, 3, 4].myFilter(isThisProductEvenArrowFn, 9)).toStrictEqual(
      [],
    );
  });

  test('sparse arrays', () => {
    expect([, , ,].myFilter(isEven)).toStrictEqual([]);
    expect([1, 2, , 4].myFilter(isEven)).toStrictEqual([2, 4]);
    expect([1, , 2, , 4, 7, 9].myFilter(isOdd)).toStrictEqual([1, 7, 9]);
  });
});
