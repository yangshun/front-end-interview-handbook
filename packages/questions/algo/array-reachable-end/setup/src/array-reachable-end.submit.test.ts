import endOfArrayReachable from './array-reachable-end';
import submitTestCases from './submit.tests.json';

describe('endOfArrayReachable', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(endOfArrayReachable(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
