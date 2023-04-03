import jsonStringify from './json-stringify';

/* eslint-disable no-undef */
describe('jsonStringify', () => {
  test('single primitive value', () => {
    expect(jsonStringify()).toEqual(undefined);
    expect(jsonStringify(undefined)).toEqual(undefined);
    expect(jsonStringify(null)).toEqual('null');
    expect(jsonStringify(true)).toEqual('true');
    expect(jsonStringify(false)).toEqual('false');
    expect(jsonStringify(1)).toEqual('1');
    expect(jsonStringify('foo')).toEqual('"foo"');
    expect(jsonStringify('"foo"')).toEqual('"\\"foo\\""');
    expect(jsonStringify(Symbol('foo'))).toEqual(undefined);
    expect(jsonStringify(() => {})).toEqual(undefined);
    expect(jsonStringify(/foo/)).toEqual('{}');
    expect(jsonStringify(new Map())).toEqual('{}');
    expect(jsonStringify(new Set())).toEqual('{}');
  });

  test("NaN and Infinity returns 'null'", () => {
    expect(jsonStringify(NaN)).toEqual('null');
    expect(jsonStringify(Infinity)).toEqual('null');
  });

  test('date objects returns iso strings', () => {
    const date = new Date();
    expect(jsonStringify(date)).toEqual(`"${date.toISOString()}"`);
  });

  test('objects with only JSON-supported values', () => {
    expect(jsonStringify([1, 2, 3])).toEqual('[1,2,3]');
    expect(
      jsonStringify({
        name: 'foo',
        age: 18,
        attr: ['coding', 123],
      }),
    ).toEqual('{"name":"foo","age":18,"attr":["coding",123]}');
  });

  test('objects with JSON-incompatible values', () => {
    expect(jsonStringify([1, 2, 3])).toEqual('[1,2,3]');
    expect(
      jsonStringify({
        name: 'foo',
        age: 18,
        attr: ['coding', 123],
        uni: Symbol(2),
        sayHi: function () {
          console.log('hi');
        },
        info: {
          sister: 'lily',
          age: 16,
          intro: {
            money: undefined,
            job: null,
          },
        },
      }),
    ).toEqual(
      '{"name":"foo","age":18,"attr":["coding",123],"info":{"sister":"lily","age":16,"intro":{"job":null}}}',
    );
  });

  test('throws on BigInt values', () => {
    expect(() => jsonStringify(BigInt(1234567890))).toThrow();
  });

  test('throws on cyclic objects', () => {
    const foo = {};
    foo.a = foo;

    expect(() => jsonStringify(foo)).toThrow();
  });
});
