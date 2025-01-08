import fn from './array-product-excluding-current';
import runTestCases from './run.tests.json';

describe('arrayProductExcludingCurrent', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}]`, () => {
      const actual = fn(example.input[0][1]).map((num) =>
        num === -0 ? 0 : num,
      );
      expect(actual).toStrictEqual(example.output);
    });
  });
});
