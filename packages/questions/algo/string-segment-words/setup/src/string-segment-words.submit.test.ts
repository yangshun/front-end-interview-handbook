import segmentWords from './string-segment-words';
import submitTestCases from './submit.tests.json';

describe('segmentWords', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`str = [${example.input[0][1]}] dict = ${example.input[1][1]}`, () => {
      expect(
        segmentWords(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
