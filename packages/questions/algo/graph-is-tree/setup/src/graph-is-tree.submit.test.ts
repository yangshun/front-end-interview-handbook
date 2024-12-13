import graphIsTree from './graph-is-tree';
import submitTestCases from './submit.tests.json';

describe('graphIsTree', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`n = ${example.input[0][1]} edges = ${JSON.stringify(
      example.input[1][1],
      null,
      2,
    )}`, () => {
      expect(
        graphIsTree(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
