import isMatch from './is-match';

describe('isMatch', () => {
  test('basic functionality', () => {
    const source = { a: 1 };
    expect(isMatch({ a: 1, b: 2 }, source)).toEqual(true);
    expect(isMatch({ a: 2 }, source)).toEqual(false);
  });

  test('matching with undefined and null values', () => {
    const source = { a: undefined, b: null };
    expect(isMatch({ a: undefined, b: null }, source)).toEqual(true);
    expect(isMatch({ a: null, b: undefined }, source)).toEqual(false);
  });

  test('handling primitive data types', () => {
    const source = { a: 'hello', b: 100 };
    expect(isMatch({ a: 'hello', b: 100, c: false }, source)).toEqual(true);
    expect(isMatch({ a: 'world', b: 100 }, source)).toEqual(false);
  });

  test('handling boolean values', () => {
    const source = { a: true, b: false };
    expect(isMatch({ a: true, b: false, c: 'extra' }, source)).toEqual(true);
    expect(isMatch({ a: false, b: true }, source)).toEqual(false);
  });

  test('strict equality checks', () => {
    const source = { a: 0, b: '0' };
    expect(isMatch({ a: 0, b: '0', c: null }, source)).toEqual(true);
    expect(isMatch({ a: '0', b: 0 }, source)).toEqual(false);
  });

  test('values with different types', () => {
    const source = { a: '5', b: 5 };
    expect(isMatch({ a: '5', b: 5 }, source)).toEqual(true);
    expect(isMatch({ a: 5, b: '5' }, source)).toEqual(false);
  });

  test('nested objects', () => {
    const source = { a: { b: { c: 1 } } };
    expect(isMatch({ a: { b: { c: 1, d: 2 } }, e: 3 }, source)).toEqual(true);
    expect(isMatch({ a: { b: { c: 2 } } }, source)).toEqual(false);
  });

  test('nested arrays', () => {
    const source = { a: [1, 2, [3, 4]] };
    expect(isMatch({ a: [1, 2, [3, 4]], b: 5 }, source)).toEqual(true);
    expect(isMatch({ a: [1, 2, [4, 3]] }, source)).toEqual(false);
  });

  test('complex nesting', () => {
    const source = { a: [{ b: { c: [1, { d: 2 }] } }] };
    expect(
      isMatch({ a: [{ b: { c: [1, { d: 2, e: 3 }] } }], f: 4 }, source),
    ).toEqual(true);
    expect(isMatch({ a: [{ b: { c: [1, { d: 3 }] } }] }, source)).toEqual(
      false,
    );
  });
});
