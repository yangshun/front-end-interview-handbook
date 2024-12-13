import disjointIntervals from './disjoint-intervals';
import submitTestCases from './submit.tests.json';

describe('disjointIntervals', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`intervals = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      expect(disjointIntervals(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
