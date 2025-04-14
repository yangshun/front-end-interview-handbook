import findWordsInGrid from './grid-find-words';
import submitTestCases from './submit.tests.json';

describe('findWordsInGrid', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`grid = ${JSON.stringify(example.input[0][1], null, 2)} words = [${
      example.input[1][1]
    }]`, () => {
      // Call the function with the current input
      const actualOutput = findWordsInGrid(
        example.input[0][1],
        example.input[1][1],
      );

      // Sort the actual output and the expected output
      const sortedActualOutput = (actualOutput as string[]).sort();
      const sortedExpectedOutput = (example.output as string[]).sort();

      // Compare the sorted arrays
      expect(sortedActualOutput).toStrictEqual(sortedExpectedOutput);
    });
  });
});
