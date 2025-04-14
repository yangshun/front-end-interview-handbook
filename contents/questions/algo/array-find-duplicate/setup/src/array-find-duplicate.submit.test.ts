import findDuplicates from './array-find-duplicate';
import submitTestCases from './submit.tests.json';

describe('findDuplicates', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}]`, () => {
      expect(findDuplicates(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
