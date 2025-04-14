import fn from './grid-find-words';
import runTestCases from './run.tests.json';

describe('findWordsInGrid', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`target = ${JSON.stringify(example.input[0][1], null, 2)} words = [${
      example.input[1][1]
    }]`, () => {
      // Call the function with the current input
      const actualOutput = fn(example.input[0][1], example.input[1][1]);

      // Sort the actual output and the expected output
      const sortedActualOutput = (actualOutput as string[]).sort();
      const sortedExpectedOutput = (example.output as string[]).sort();

      // Compare the sorted arrays
      expect(sortedActualOutput).toStrictEqual(sortedExpectedOutput);
    });
  });
});
