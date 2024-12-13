import combinationTargetSum from './combinations-target-sum';
import submitTestCases from './submit.tests.json';

describe('combinationTargetSum', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}] target = ${example.input[1][1]}`, () => {
      expect(
        combinationTargetSum(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
