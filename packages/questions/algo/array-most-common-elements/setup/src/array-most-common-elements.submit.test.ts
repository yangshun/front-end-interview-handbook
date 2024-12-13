import mostCommonElements from './array-most-common-elements';
import submitTestCases from './submit.tests.json';

describe('mostCommonElements', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}] k = ${example.input[1][1]}`, () => {
      const result = mostCommonElements(
        example.input[0][1],
        example.input[1][1],
      );
      const expected = example.output;

      // Sort both result and expected arrays before comparison
      result.sort((a: number, b: number) => a - b);
      expected.sort((a: number, b: number) => a - b);

      expect(result).toStrictEqual(expected);
    });
  });
});
