import smallestInRotatedArray from './array-smallest-in-rotated';
import submitTestCases from './submit.tests.json';

describe('smallestInRotatedArray', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(smallestInRotatedArray(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
