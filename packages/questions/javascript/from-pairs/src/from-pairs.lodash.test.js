import { fromPairs } from 'lodash';

describe('fromPairs', () => {
  describe('when given an empty array', () => {
    test('should return an empty object', () => {
      expect(fromPairs([])).toEqual({});
    });
  });

  describe('when given a single-element array', () => {
    test('should return an object with the single key-value pair', () => {
      expect(fromPairs([['a', 1]])).toEqual({ a: 1 });
    });
  });

  describe('when given a two-element array', () => {
    test('should return an object with the two key-value pairs', () => {
      expect(
        fromPairs([
          ['a', 1],
          ['b', 2],
        ]),
      ).toEqual({ a: 1, b: 2 });
    });
  });

  describe('when given a multiple-element array', () => {
    test('should return an object with all the key-value pairs', () => {
      expect(
        fromPairs([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ]),
      ).toEqual({ a: 1, b: 2, c: 3 });
    });
  });

  describe('when given an array as value', () => {
    test('should return an object with the value to be an array', () => {
      expect(
        fromPairs([
          ['a', ['b', 2]],
          ['c', 3],
          ['d', 4],
        ]),
      ).toEqual({ a: ['b', 2], c: 3, d: 4 });
    });
  });
});
