import bitReversal from './bit-reversal';
import submitTestCases from './submit.tests.json';

describe('bitReversal', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`n = ${example.input[0][1]}`, () => {
      expect(bitReversal(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
