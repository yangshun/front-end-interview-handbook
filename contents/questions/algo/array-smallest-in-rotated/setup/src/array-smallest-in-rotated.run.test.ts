import fn from './array-smallest-in-rotated';
import runTestCases from './run.tests.json';

describe('smallestInRotatedArray', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}]`, () => {
      expect(fn(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
