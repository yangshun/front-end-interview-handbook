import negate from './negate';

describe('negate function', () => {
  test('negate a function returning true', () => {
    const alwaysTrue = () => true;
    const negated = negate(alwaysTrue);
    expect(negated()).toEqual(false);
  });

  test('negate a function returning false', () => {
    const alwaysFalse = () => false;
    const negated = negate(alwaysFalse);
    expect(negated()).toEqual(true);
  });

  test('negate a function with a single numeric argument', () => {
    const isEven = (n: number) => n % 2 === 0;
    const isOdd = negate(isEven);
    expect(isOdd(3)).toEqual(true);
    expect(isOdd(4)).toEqual(false);
  });
});
