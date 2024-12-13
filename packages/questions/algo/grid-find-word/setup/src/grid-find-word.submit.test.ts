import findWordInGrid from './grid-find-word';
import submitTestCases from './submit.tests.json';

describe('findWordInGrid', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`grid = ${JSON.stringify(example.input[0][1], null, 2)} target = ${
      example.input[1][1]
    }`, () => {
      expect(
        findWordInGrid(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
