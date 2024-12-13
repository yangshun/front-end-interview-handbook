import longestSubstringReplacement from './longest-repeating-substring-after-replacements';
import submitTestCases from './submit.tests.json';

describe('longestSubstringReplacement', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`str = ${example.input[0][1]} k = ${example.input[1][1]}`, () => {
      expect(
        longestSubstringReplacement(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
