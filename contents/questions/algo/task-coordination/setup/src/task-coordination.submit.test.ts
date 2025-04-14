import taskCoordinator from './task-coordination';
import submitTestCases from './submit.tests.json';

describe('taskCoordinator', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`tasks =  [${example.input[0][1]}] k = ${example.input[1][1]}`, () => {
      expect(
        taskCoordinator(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
