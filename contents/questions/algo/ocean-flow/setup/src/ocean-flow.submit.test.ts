import oceanFlow from './ocean-flow';
import submitTestCases from './submit.tests.json';

describe('oceanFlow', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`matrix = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      expect(oceanFlow(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
