import deepOmit from './deep-omit';

const data = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};

describe('deepOmit', () => {
  test('empty object', () => {
    expect(deepOmit({}, [])).toEqual({});
  });

  test('single key', () => {
    const keysToOmit = ['b'];
    const result = deepOmit(
      {
        a: 1,
        b: 2,
        c: 3,
      },
      keysToOmit,
    );
    expect(result).toEqual({
      a: 1,
      c: 3,
    });
  });

  test('multiple keys', () => {
    const keysToOmit = ['b', 'c', 'e'];
    const result = deepOmit(data, keysToOmit);
    expect(result).toEqual({
      a: 1,
      f: [5, 6],
    });
  });
});
