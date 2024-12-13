import countOnesInBinary from './count-ones-in-binary';
import submitTestCases from './submit.tests.json';

describe('countOnesInBinary', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`n = ${example.input[0][1]}`, () => {
      expect(countOnesInBinary(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
