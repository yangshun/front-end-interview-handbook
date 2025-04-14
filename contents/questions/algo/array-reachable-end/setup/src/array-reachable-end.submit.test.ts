import arrayReachableEnd from './array-reachable-end';
import submitTestCases from './submit.tests.json';

describe('arrayReachableEnd', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(arrayReachableEnd(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
