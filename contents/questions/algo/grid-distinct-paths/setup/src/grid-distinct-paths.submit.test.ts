import gridDistinctPaths from './grid-distinct-paths';
import submitTestCases from './submit.tests.json';

describe('gridDistinctPaths', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`m = ${example.input[0][1]} n = ${example.input[1][1]}`, () => {
      expect(
        gridDistinctPaths(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
