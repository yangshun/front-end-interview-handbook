import arrayProductExcludingCurrent from './array-product-excluding-current';
import submitTestCases from './submit.tests.json';

describe('arrayProductExcludingCurrent', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      const actual = arrayProductExcludingCurrent(example.input[0][1]).map(
        (num) => (num === -0 ? 0 : num),
      );
      expect(actual).toStrictEqual(example.output);
    });
  });
});
