import fn from './task-coordination';
import runTestCases from './run.tests.json';

describe('taskCoordinator', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`tasks = [${example.input[0][1]}] k = ${example.input[1][1]}`, () => {
      expect(fn(example.input[0][1], example.input[1][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
