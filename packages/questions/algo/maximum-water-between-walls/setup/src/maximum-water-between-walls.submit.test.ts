import maximumWaterBetweenWalls from './maximum-water-between-walls';
import submitTestCases from './submit.tests.json';

describe('maximumWaterBetweenWalls', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`walls = [${example.input[0][1]}]`, () => {
      expect(maximumWaterBetweenWalls(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
