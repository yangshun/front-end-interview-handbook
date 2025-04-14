import fn from './array-maximum-sum-contiguous';
import runTestCases from './run.tests.json';

describe('maxSumSubArray', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}]`, () => {
      expect(fn(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
