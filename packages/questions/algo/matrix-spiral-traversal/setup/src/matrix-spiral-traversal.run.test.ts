import fn from './matrix-spiral-traversal';
import runTestCases from './run.tests.json';

describe('matrixSpiralTraversal', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`matrix = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      expect(fn(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
