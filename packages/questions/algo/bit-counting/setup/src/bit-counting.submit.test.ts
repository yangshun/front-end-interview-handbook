import bitCounting from './bit-counting';
import submitTestCases from './submit.tests.json';

describe('bitCounting', () => {
  submitTestCases.forEach((example: any) => {
    test(`n = ${example.input[0][1]}`, () => {
      expect(bitCounting(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
