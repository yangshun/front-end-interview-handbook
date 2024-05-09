import conformsTo from './conforms-to';

describe('conformsTo', () => {
  test('basic functionality', () => {
    const source = { a: (value: number) => value > 0 };
    expect(conformsTo({ a: 1 }, source)).toEqual(true);
    expect(conformsTo({ a: 0 }, source)).toEqual(false);
  });

  test('multiple properties', () => {
    const source = {
      a: (value: number) => value > 0,
      b: (value: number) => value < 3,
    };
    expect(conformsTo({ a: 1, b: 2 }, source)).toEqual(true);
    expect(conformsTo({ a: 0, b: 2 }, source)).toEqual(false);
  });

  test('non-matching property names', () => {
    const source = { c: (value: any) => value > 0 };
    expect(conformsTo({ a: 1 }, source)).toEqual(false);
    expect(conformsTo({ b: -1 }, source)).toEqual(false);
  });

  test('source with no predicate functions', () => {
    expect(conformsTo({ a: 1 }, {})).toEqual(true);
    expect(conformsTo({ a: 0 }, {})).toEqual(true);
  });

  test('function in object', () => {
    const object = { a: () => {} };
    const source = { a: (value: any) => typeof value === 'function' };
    expect(conformsTo(object, source)).toEqual(true);
    expect(conformsTo({ a: 1 }, source)).toEqual(false);
  });

  test('undefined and null values', () => {
    const object = { a: undefined, b: null };
    const source = {
      a: (value: any) => value === undefined,
      b: (value: any) => value === null,
    };
    expect(conformsTo(object, source)).toEqual(true);
    expect(conformsTo({ a: null, b: undefined }, source)).toEqual(false);
  });

  test('complex predicates', () => {
    const object = { a: 10, b: 'hello' };
    const source = {
      a: (value: any) => value % 2 === 0,
      b: (value: any) => value.startsWith('h'),
    };
    expect(conformsTo(object, source)).toEqual(true);
    expect(conformsTo({ a: 11, b: 'goodbye' }, source)).toEqual(false);
  });

  test('ignores inherited source predicates', () => {
    const sourceProto = {
      inheritedPredicate: (value: number) => value > 2,
    };

    const source = Object.create(sourceProto);

    const object = {
      someProperty: 3,
    };

    expect(conformsTo(object, source)).toEqual(true);
  });
});
