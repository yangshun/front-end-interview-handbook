import makeCounter from './make-counter';

describe('makeCounter', () => {
  test('returns a function', () => {
    const counter = makeCounter();

    expect(typeof counter === 'function').toBe(true);
  });

  describe('calling the function', () => {
    describe('returns initial value', () => {
      test('default', () => {
        const counter = makeCounter();

        expect(counter()).toBe(0);
      });

      test('custom', () => {
        const counter = makeCounter(4);

        expect(counter()).toBe(4);
      });
    });

    describe('can be repeatedly called', () => {
      test('default', () => {
        const counter = makeCounter();

        expect(counter()).toBe(0);
        expect(counter()).toBe(1);
        expect(counter()).toBe(2);
      });

      test('positive', () => {
        const counter = makeCounter(4);

        expect(counter()).toBe(4);
        expect(counter()).toBe(5);
        expect(counter()).toBe(6);
      });

      test('negative', () => {
        const counter = makeCounter(-4);

        expect(counter()).toBe(-4);
        expect(counter()).toBe(-3);
        expect(counter()).toBe(-2);
      });
    });
  });
});
