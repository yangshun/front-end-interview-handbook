import fn from './matrix-rotation';
import runTestCases from './run.tests.json';

describe('matrixRotation', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`matrix = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      // Call the function which mutates the matrix
      fn(example.input[0][1]);
      // After the mutation, check if the input matrix matches the expected output
      expect(example.input[0][1]).toStrictEqual(example.output);
    });
  });
});
