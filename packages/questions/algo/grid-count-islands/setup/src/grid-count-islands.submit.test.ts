import countGridIslands from './grid-count-islands';
import submitTestCases from './submit.tests.json';

describe('countGridIslands', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`grid = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      expect(countGridIslands(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
