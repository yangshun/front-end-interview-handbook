import squashObject from './squash-object';

describe('squashObject', () => {
  test('empty', () => {
    expect(squashObject({})).toEqual({});
  });

  test('no nesting', () => {
    expect(squashObject({ a: '1', b: 'b' })).toEqual({ a: '1', b: 'b' });
  });

  test('one level of nesting', () => {
    expect(
      squashObject({
        a: 5,
        c: {
          f: 9,
        },
      }),
    ).toEqual({ a: 5, 'c.f': 9 });
  });
});
