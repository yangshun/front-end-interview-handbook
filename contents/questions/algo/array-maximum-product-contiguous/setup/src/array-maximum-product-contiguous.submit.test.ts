import submitTestCases from './sumbit.tests.json';
import maxProductSubArray from './array-maximum-product-contiguous';

describe('maxProductSubArray', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`numbers = [${example.input[0][1]}]`, () => {
      expect(maxProductSubArray(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
