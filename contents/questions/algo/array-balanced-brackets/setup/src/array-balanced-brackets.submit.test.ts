import balancedBrackets from './array-balanced-brackets';
import submitTestCases from './submit.tests.json';

describe('balancedBrackets', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`str = ${example.input[0][1]}`, () => {
      expect(balancedBrackets(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
