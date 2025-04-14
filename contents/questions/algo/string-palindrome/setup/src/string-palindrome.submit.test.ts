import isStringPalindrome from './string-palindrome';
import submitTestCases from './submit.tests.json';

describe('isStringPalindrome', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`str = ${example.input[0][1]}`, () => {
      expect(isStringPalindrome(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
