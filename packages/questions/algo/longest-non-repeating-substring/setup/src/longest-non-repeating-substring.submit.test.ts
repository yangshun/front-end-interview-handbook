import longestUniqueSubstring from './longest-non-repeating-substring';
import submitTestCases from './submit.tests.json';

describe('longestUniqueSubstring', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`str = ${example.input[0][1]}`, () => {
      expect(longestUniqueSubstring(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
