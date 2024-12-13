import matrixRotation from './matrix-rotation';
import submitTestCases from './submit.tests.json';

describe('matrixRotation', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`matrix = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      // Call the function which mutates the matrix
      matrixRotation(example.input[0][1]);
      // After the mutation, check if the input matrix matches the expected output
      expect(example.input[0][1]).toStrictEqual(example.output);
    });
  });
});
