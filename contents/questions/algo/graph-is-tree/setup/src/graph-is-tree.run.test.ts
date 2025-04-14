import fn from './graph-is-tree';
import runTestCases from './run.tests.json';

describe('graphIsTree', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = ${example.input[0][1]} ${
      example.input[1][0]
    } = ${JSON.stringify(example.input[1][1], null, 2)}`, () => {
      expect(fn(example.input[0][1], example.input[1][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
