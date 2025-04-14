import graphCountConnectedComponents from './graph-count-connected-components';
import submitTestCases from './submit.tests.json';

describe('graphCountConnectedComponents', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`n = ${example.input[0][1]} edges = ${JSON.stringify(
      example.input[1][1],
      null,
      2,
    )}`, () => {
      expect(
        graphCountConnectedComponents(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
