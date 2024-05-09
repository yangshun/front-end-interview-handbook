import conformsTo from './conforms-to';

describe('conformsTo', () => {
  test('empty array', () => {
    expect(conformsTo({}, { b: (n: number) => n > 1 })).toEqual(false);
  });

  test('single-element arrays', () => {
    expect(conformsTo({ b: 2 }, { b: (n) => n > 1 })).toEqual(true);
  });

  test('two-element arrays', () => {
    expect(conformsTo({ a: 1, b: 2 }, { b: (n) => n > 2 })).toEqual(false);
  });
});
