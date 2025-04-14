import fn from './array-most-common-elements';
import runTestCases from './run.tests.json';

describe('mostCommonElements', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}] ${example.input[1][0]} = ${example.input[1][1]}`, () => {
      const result = fn(example.input[0][1], example.input[1][1]);
      const expected = example.output;

      // Sort both result and expected arrays before comparison
      result.sort((a: number, b: number) => a - b);
      expected.sort((a: number, b: number) => a - b);

      expect(result).toStrictEqual(expected);
    });
  });
});
