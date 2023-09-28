import jsonStringify from './json-stringify-ii';

describe('jsonStringify', () => {
  describe('primitives', () => {
    test('undefined', () => {
      expect(jsonStringify(undefined)).toEqual(undefined);
    });

    test('null', () => {
      expect(jsonStringify(null)).toEqual('null');
    });

    test('boolean', () => {
      expect(jsonStringify(true)).toEqual('true');
      expect(jsonStringify(false)).toEqual('false');
    });

    test('numbers', () => {
      expect(jsonStringify(1)).toEqual('1');
      expect(jsonStringify(-1)).toEqual('-1');
    });

    test('strings', () => {
      expect(jsonStringify('123')).toEqual('"123"');
      expect(jsonStringify('foo')).toEqual('"foo"');
      expect(jsonStringify('"foo"')).toEqual('"\\"foo\\""');
    });
  });

  describe('special values', () => {
    test('NaN', () => {
      expect(jsonStringify(NaN)).toEqual('null');
    });

    test('infinity', () => {
      expect(jsonStringify(Infinity)).toEqual('null');
    });

    test('symbol', () => {
      expect(jsonStringify(Symbol('foo'))).toEqual(undefined);
    });

    test('functions', () => {
      expect(jsonStringify(() => {})).toEqual(undefined);
      expect(jsonStringify(function () {})).toEqual(undefined);
    });

    test('regexp', () => {
      expect(jsonStringify(/foo/)).toEqual('{}');
    });

    test('map', () => {
      expect(jsonStringify(new Map())).toEqual('{}');
    });

    test('set', () => {
      expect(jsonStringify(new Set())).toEqual('{}');
    });

    test('date', () => {
      const date = new Date();
      expect(jsonStringify(date)).toEqual(`"${date.toISOString()}"`);
    });

    test('BigInt throws', () => {
      expect(() => jsonStringify(BigInt(1234567890))).toThrow();
    });
  });

  describe('arrays', () => {
    test('empty', () => {
      expect(jsonStringify([])).toEqual('[]');
    });

    test('non-nested', () => {
      expect(jsonStringify([1, 2, 3])).toEqual('[1,2,3]');
      expect(jsonStringify([true, false])).toEqual('[true,false]');
      expect(jsonStringify(['1', '2', '3'])).toEqual('["1","2","3"]');
      expect(jsonStringify([{}, {}])).toEqual('[{},{}]');
      expect(jsonStringify([null, null])).toEqual('[null,null]');
    });

    test('nested', () => {
      expect(jsonStringify([[]])).toEqual('[[]]');
      expect(jsonStringify([[[]]])).toEqual('[[[]]]');
      expect(jsonStringify([[], []])).toEqual('[[],[]]');
      expect(jsonStringify([[1], [2]])).toEqual('[[1],[2]]');
      expect(jsonStringify([1, [2, [3, [4, []]]]])).toEqual(
        '[1,[2,[3,[4,[]]]]]',
      );
      expect(jsonStringify([1, 2, [3, 4, [5, 6], 7, 8]])).toEqual(
        '[1,2,[3,4,[5,6],7,8]]',
      );
    });

    test('mixed', () => {
      expect(
        jsonStringify([
          42,
          'Hello, World!',
          true,
          null,
          { name: 'John', age: 30 },
          [1, 2, 3],
        ]),
      ).toEqual(
        '[42,"Hello, World!",true,null,{"name":"John","age":30},[1,2,3]]',
      );
    });
  });

  describe('objects', () => {
    test('empty', () => {
      expect(jsonStringify({})).toEqual('{}');
    });

    test('non-nested', () => {
      expect(jsonStringify({ foo: 1 })).toEqual('{"foo":1}');
      expect(jsonStringify({ foo: true })).toEqual('{"foo":true}');
      expect(jsonStringify({ foo: false })).toEqual('{"foo":false}');
      expect(jsonStringify({ foo: 'bar' })).toEqual('{"foo":"bar"}');
      expect(jsonStringify({ foo: [] })).toEqual('{"foo":[]}');
      expect(jsonStringify({ foo: null })).toEqual('{"foo":null}');
    });

    test('nested', () => {
      expect(jsonStringify({ foo: { foo: true } })).toEqual(
        '{"foo":{"foo":true}}',
      );
      expect(jsonStringify({ foo: true, bar: { foo: 2 } })).toEqual(
        '{"foo":true,"bar":{"foo":2}}',
      );
    });

    test('mixed', () => {
      expect(
        jsonStringify({
          name: 'foo',
          age: 18,
          attr: ['coding', 123],
        }),
      ).toEqual('{"name":"foo","age":18,"attr":["coding",123]}');
    });

    test('JSON-incompatible values', () => {
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
  });

  test('cyclic objects', () => {
    const foo: any = {};
    foo.a = foo;

    expect(() => {
      jsonStringify(foo);
    }).toThrow('Converting circular structure to JSON');
  });
});
