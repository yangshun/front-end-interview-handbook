import fn from './array-product-excluding-current';
import runTestCases from './run.tests.json';

describe('arrayProductExcludingCurrent', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}]`, () => {
      expect(fn(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
