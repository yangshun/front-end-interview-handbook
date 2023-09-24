import isEmpty from './is-empty';

describe('isEmpty', () => {
  test('primitives', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(1)).toBe(true);
  });

  test('strings', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('foo')).toBe(false);
  });

  test('objects', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ foo: 1 })).toBe(false);
  });
});
