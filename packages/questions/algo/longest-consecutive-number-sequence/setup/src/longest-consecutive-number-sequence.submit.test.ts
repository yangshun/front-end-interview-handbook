import longestConsecutiveNumberSequence from './longest-consecutive-number-sequence';
import submitTestCases from './submit.tests.json';

describe('longestConsecutiveNumberSequence', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(
        longestConsecutiveNumberSequence(example.input[0][1]),
      ).toStrictEqual(example.output);
    });
  });
});
