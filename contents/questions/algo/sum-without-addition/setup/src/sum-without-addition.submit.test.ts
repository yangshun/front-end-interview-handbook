import sumWithoutAddition from './sum-without-addition';
import submitTestCases from './submit.tests.json';

describe('sumWithoutAddition', () => {
  submitTestCases.forEach((example: any) => {
    test(`a = ${example.input[0][1]} b = ${example.input[1][1]}`, () => {
      expect(
        sumWithoutAddition(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
