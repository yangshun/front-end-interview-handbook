import mergeIntervals from './intervals-combine-overlapping';
import submitTestCases from './submit.tests.json';

describe('mergeOverlappingIntervals', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`intervals = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      expect(
        mergeIntervals(example.input[0][1]).sort((a, b) => a[0] - b[0]),
      ).toStrictEqual(example.output);
    });
  });
});
