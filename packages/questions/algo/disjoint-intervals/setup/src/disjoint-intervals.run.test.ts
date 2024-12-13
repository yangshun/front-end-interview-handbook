import fn from './disjoint-intervals';
import runTestCases from './run.tests.json';

describe('disjointIntervals', () => {
  runTestCases.forEach((example: any) => {
    test(`${example.input[0][0]} = ${JSON.stringify(
      example.input[0][1],
      null,
      2,
    )}`, () => {
      expect(fn(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
