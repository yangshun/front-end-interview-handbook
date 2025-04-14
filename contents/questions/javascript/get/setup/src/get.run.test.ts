import get from './get';

describe('get', () => {
  test('empty object', () => {
    expect(get({}, 'a')).toEqual(undefined);
  });

  test('simple object', () => {
    expect(get({ a: 1 }, 'a')).toEqual(1);
  });

  test('nested object', () => {
    expect(get({ a: { b: 2 }, c: 1 }, 'a.b')).toEqual(2);
  });
});
