import jsonStringify from './json-stringify-ii';

describe('jsonStringify', () => {
  test('strings', () => {
    expect(jsonStringify('123')).toEqual('"123"');
  });

  test('array', () => {
    expect(jsonStringify([1, 2, 3])).toEqual('[1,2,3]');
  });

  test('object', () => {
    expect(jsonStringify({ name: 'John', age: 30 })).toEqual(
      '{"name":"John","age":30}',
    );
  });
});
