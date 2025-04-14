import fn from './string-palindrome';
import runTestCases from './run.tests.json';

describe('isStringPalindrome', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = ${example.input[0][1]}`, () => {
      expect(fn(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
