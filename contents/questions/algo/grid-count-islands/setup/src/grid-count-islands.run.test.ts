import fn from './grid-count-islands';
import runTestCases from './run.tests.json';

describe('countGridIslands', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`grid = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      expect(fn(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
