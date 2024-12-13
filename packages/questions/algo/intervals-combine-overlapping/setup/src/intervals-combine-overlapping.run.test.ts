import fn from './intervals-combine-overlapping';
import runTestCases from './run.tests.json';

describe('mergeOverlappingIntervals', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = ${JSON.stringify(
      example.input[0][1],
      null,
      2,
    )}`, () => {
      expect(fn(example.input[0][1]).sort((a, b) => a[0] - b[0])).toStrictEqual(
        example.output,
      );
    });
  });
});
