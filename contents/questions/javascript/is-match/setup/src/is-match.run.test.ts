import isMatch from './is-match';

describe('isMatch', () => {
  test('empty source object', () => {
    expect(isMatch({}, {})).toEqual(true);
  });

  test('single property match', () => {
    expect(isMatch({ b: 2 }, { b: 2 })).toEqual(true);
    expect(isMatch({ b: 2 }, { b: 3 })).toEqual(false);
  });

  test('multiple properties with partial match', () => {
    expect(isMatch({ a: 1, b: 2 }, { b: 2 })).toEqual(true);
    expect(isMatch({ a: 1, b: 2 }, { b: 3 })).toEqual(false);
  });
});
