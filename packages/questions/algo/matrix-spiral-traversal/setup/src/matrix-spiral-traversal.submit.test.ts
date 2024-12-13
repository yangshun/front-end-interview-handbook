import matrixSpiralTraversal from './matrix-spiral-traversal';
import submitTestCases from './submit.tests.json';

describe('matrixSpiralTraversal', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`matrix = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      expect(matrixSpiralTraversal(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
