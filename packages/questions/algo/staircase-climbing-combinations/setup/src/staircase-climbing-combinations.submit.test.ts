import staircaseClimbingCombinations from './staircase-climbing-combinations';
import submitTestCases from './submit.tests.json';

describe('staircaseClimbingCombinations', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`steps = ${example.input[0][1]}`, () => {
      expect(staircaseClimbingCombinations(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
