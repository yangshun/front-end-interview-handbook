import fn from './string-anagram-groups';
import runTestCases from './run.tests.json';

describe('anagramGroups', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = ${JSON.stringify(
      example.input[0][1],
      null,
      2,
    )}`, () => {
      // Get the result from the function
      const result = fn(example.input[0][1]);

      // Sort each group of anagrams alphabetically
      const sortedResult = result.map((group) => group.slice().sort());

      // Sort the list of groups based on the first string in each group
      sortedResult.sort((a, b) => a[0].localeCompare(b[0]));

      // Compare the sorted result with the expected output
      expect(sortedResult).toStrictEqual(example.output);
    });
  });
});
