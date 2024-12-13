import neighborhoodTheftCircular from './neighborhood-theft-circular';
import submitTestCases from './submit.tests.json';

describe('neighborhoodTheftCircular', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(neighborhoodTheftCircular(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
