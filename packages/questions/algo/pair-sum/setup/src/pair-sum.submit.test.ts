import pairSum from './pair-sum';
import submitTestCases from './submit.tests.json';

describe('pairSum', () => {
  submitTestCases.forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}] target = ${example.input[1][1]}`, () => {
      expect(pairSum(example.input[0][1], example.input[1][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
