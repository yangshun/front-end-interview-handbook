import fn from './array-reachable-end';
import runTestCases from './run.tests.json';

describe('endOfArrayReachable', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}]`, () => {
      expect(fn(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
