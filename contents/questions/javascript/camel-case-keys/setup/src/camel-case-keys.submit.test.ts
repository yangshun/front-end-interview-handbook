import camelCaseKeys from './camel-case-keys';

describe('camelCaseKeys', () => {
  test('simple object', () => {
    expect(camelCaseKeys({ foo_bar: true })).toStrictEqual({
      fooBar: true,
    });
  });

  test('simple object with multiple keys', () => {
    expect(camelCaseKeys({ foo_bar: true, baz: '1', quz: '2' })).toStrictEqual({
      baz: '1',
      fooBar: true,
      quz: '2',
    });
  });

  test('nested object', () => {
    expect(
      camelCaseKeys({ foo_bar: true, bar_baz: { baz_quz: '1', quz: '2' } }),
    ).toStrictEqual({
      barBaz: {
        bazQuz: '1',
        quz: '2',
      },
      fooBar: true,
    });
  });

  test('arrays', () => {
    expect(camelCaseKeys([{ baz_qux: true }, { foo: true }])).toStrictEqual([
      {
        bazQux: true,
      },
      {
        foo: true,
      },
    ]);
  });

  test('objects containing arrays', () => {
    expect(
      camelCaseKeys({
        foo_bar: true,
        Boo_Bar: false,
        bar_baz: [{ baz_qux: true }, { foo: true }],
      }),
    ).toStrictEqual({
      barBaz: [
        {
          bazQux: true,
        },
        {
          foo: true,
        },
      ],
      booBar: false,
      fooBar: true,
    });
  });
});
