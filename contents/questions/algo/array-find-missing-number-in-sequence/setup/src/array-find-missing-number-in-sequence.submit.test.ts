import findMissingNumberInSequence from './array-find-missing-number-in-sequence';
import submitTestCases from './submit.tests.json';

describe('findMissingNumberInSequence', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(findMissingNumberInSequence(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
