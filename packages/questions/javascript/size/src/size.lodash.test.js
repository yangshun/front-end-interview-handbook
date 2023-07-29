import { size } from 'lodash';

describe('size', () => {
  test('calculates the size of an array', () => {
    expect(size([1, 2, 3])).toEqual(3);
  });

  test('calculates the size of an object', () => {
    expect(size({ a: 1, b: 2, c: 3 })).toEqual(3);
  });

  test('calculates the size of a string', () => {
    expect(size('hello')).toEqual(5);
  });

  test('returns 0 for null and undefined inputs', () => {
    expect(size(null)).toEqual(0);
    expect(size(undefined)).toEqual(0);
  });
});
