import objectMap from './object-map';

const double = (x: number) => x * 2;

describe('objectMap', () => {
  test('empty', () => {
    expect(objectMap({}, double)).toEqual({});
  });

  test('single key', () => {
    expect(objectMap({ foo: 2 }, double)).toEqual({ foo: 4 });
  });

  test('multiple keys', () => {
    expect(objectMap({ foo: 2, bar: 3 }, double)).toEqual({ foo: 4, bar: 6 });
  });
});
