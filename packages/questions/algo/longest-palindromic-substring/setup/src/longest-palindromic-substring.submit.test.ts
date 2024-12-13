import longestPalindromicSubstring from './longest-palindromic-substring';
import submitTestCases from './submit.tests.json';

describe('longestPalindromicSubstring', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`result = ${example.input[0][1]}`, () => {
      const result = longestPalindromicSubstring(example.input[0][1]);

      // Ensure the result is a substring of the input
      expect(example.input[0][1]).toContain(result);

      // Ensure the result is a palindrome
      expect(result).toEqual(result.split('').reverse().join(''));

      // Ensure the result has the same length as the expected output
      expect(result.length).toBe(example.output.length);
    });
  });
});
