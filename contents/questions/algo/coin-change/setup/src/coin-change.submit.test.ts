import minimumCoinsForChange from './coin-change';
import submitTestCases from './submit.tests.json';

describe('minimumCoinsForChange', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`coins = [${example.input[0][1]}] target = ${example.input[1][1]}`, () => {
      expect(
        minimumCoinsForChange(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
