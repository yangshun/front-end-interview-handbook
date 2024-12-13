import arrayProductExcludingCurrent from './array-product-excluding-current';
import submitTestCases from './submit.tests.json';

describe('arrayProductExcludingCurrent', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(arrayProductExcludingCurrent(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
