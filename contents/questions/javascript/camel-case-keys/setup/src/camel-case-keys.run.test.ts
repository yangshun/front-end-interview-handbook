import camelCaseKeys from './camel-case-keys';

describe('camelCaseKeys', () => {
  test('simple object', () => {
    expect(camelCaseKeys({ foo_bar: true })).toStrictEqual({
      fooBar: true,
    });
  });

  test('simple object with multiple keys', () => {
    expect(camelCaseKeys({ foo_bar: true, baz: '1' })).toStrictEqual({
      baz: '1',
      fooBar: true,
    });
  });

  test('nested object', () => {
    expect(
      camelCaseKeys({ foo_bar: true, bar_baz: { baz_quz: '1' } }),
    ).toStrictEqual({
      barBaz: {
        bazQuz: '1',
      },
      fooBar: true,
    });
  });
});
