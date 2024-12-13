import fn from './longest-common-subsequence';
import runTestCases from './run.tests.json';

describe('longestCommonSubsequence', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}] ${example.input[1][0]} = [${example.input[1][1]}]`, () => {
      expect(fn(example.input[0][1], example.input[1][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
