import decodeMessage from './string-decode-message';
import submitTestCases from './submit.tests.json';

describe('decodeMessage', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`str = [${example.input[0][1]}]`, () => {
      expect(decodeMessage(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
