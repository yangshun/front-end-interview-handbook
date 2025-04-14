import mergeNewInterval from './intervals-merge-new';
import submitTestCases from './submit.tests.json';

describe('mergeNewInterval', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`intervals = ${JSON.stringify(
      example.input[0][1],
      null,
      2,
    )} newInterval = [${example.input[1][1]}]`, () => {
      expect(
        mergeNewInterval(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
