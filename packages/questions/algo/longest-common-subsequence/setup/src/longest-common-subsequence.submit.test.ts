import longestCommonSubsequence from './longest-common-subsequence';
import submitTestCases from './submit.tests.json';

describe('longestCommonSubsequence', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`str1 = [${example.input[0][1]}] str2 = [${example.input[1][1]}]`, () => {
      expect(
        longestCommonSubsequence(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
