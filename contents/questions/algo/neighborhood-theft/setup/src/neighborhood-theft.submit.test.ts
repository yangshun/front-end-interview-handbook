import neighborhoodTheft from './neighborhood-theft';
import submitTestCases from './submit.tests.json';

describe('neighborhoodTheft', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(neighborhoodTheft(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
