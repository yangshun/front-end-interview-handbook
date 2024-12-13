import tripletSum from './triplet-sum';
import submitTestCases from './submit.tests.json';

describe('tripletSum', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(tripletSum(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
