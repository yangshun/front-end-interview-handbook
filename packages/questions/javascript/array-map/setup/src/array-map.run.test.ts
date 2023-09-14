import './array-map';

const identity = <T>(element: T) => element;
const square = (element: number) => element * element;

describe('Array.prototype.myMap', () => {
  test('identity', () => {
    expect([10].myMap(identity)).toEqual([10]);
    expect([10, 20].myMap(identity)).toEqual([10, 20]);
  });

  test('square', () => {
    expect([-4].myMap(square)).toEqual([16]);
    expect([5].myMap(square)).toEqual([25]);
  });
});
