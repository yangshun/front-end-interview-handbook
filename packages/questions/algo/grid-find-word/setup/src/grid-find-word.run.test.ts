import fn from './grid-find-word';
import runTestCases from './run.tests.json';

describe('findWordInGrid', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`grid = ${JSON.stringify(example.input[0][1], null, 2)} target = ${
      example.input[1][1]
    }`, () => {
      expect(fn(example.input[0][1], example.input[1][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
