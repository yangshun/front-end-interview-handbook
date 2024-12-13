import optimalStockTrading from './optimal-stock-trading';
import submitTestCases from './submit.tests.json';

describe('optimalStockTrading', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}]`, () => {
      expect(optimalStockTrading(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
