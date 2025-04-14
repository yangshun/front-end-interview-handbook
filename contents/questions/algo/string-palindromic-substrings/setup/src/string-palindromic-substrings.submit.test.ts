import palindromicSubstrings from './string-palindromic-substrings';
import submitTestCases from './submit.tests.json';

describe('countPalindromicSubstrings', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`str = ${example.input[0][1]}`, () => {
      expect(palindromicSubstrings(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
