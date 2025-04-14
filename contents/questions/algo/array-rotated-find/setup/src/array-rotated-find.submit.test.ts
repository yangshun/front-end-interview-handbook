import findInRotatedArray from './array-rotated-find';
import submitTestCases from './submit.tests.json';

describe('findInRotatedArray', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}] target = ${example.input[1][1]}`, () => {
      expect(
        findInRotatedArray(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
