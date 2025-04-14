import fn from './longest-palindromic-substring';
import runTestCases from './run.tests.json';

describe('longestPalindromicSubstring', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = ${example.input[0][1]}`, () => {
      const result = fn(example.input[0][1]);

      // Ensure the result is a substring of the input
      expect(example.input[0][1]).toContain(result);

      // Ensure the result is a palindrome
      expect(result).toEqual(result.split('').reverse().join(''));

      // Ensure the result has the same length as the expected output
      expect(result.length).toBe(example.output.length);
    });
  });
});
