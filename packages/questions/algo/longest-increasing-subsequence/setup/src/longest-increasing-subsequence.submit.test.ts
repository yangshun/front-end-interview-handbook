import longestIncreasingSubsequence from './longest-increasing-subsequence';
import submitTestCases from './submit.tests.json';

describe('longestIncreasingSubsequence', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(longestIncreasingSubsequence(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
