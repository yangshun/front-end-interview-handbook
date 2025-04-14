import NumberStream from './number-stream-median';
import submitTestCases from './submit.tests.json';

function processMethods(
  methods: string[],
  numbers: number[],
): (number | null)[] {
  const res: (number | null)[] = [];
  const obj = new NumberStream();

  for (let i = 0; i < methods.length; i++) {
    switch (methods[i]) {
      case 'add': {
        obj.add(numbers[i]);
        res.push(null);
        break;
      }
      case 'getMedian': {
        res.push(obj.getMedian());
        break;
      }
    }
  }

  return res;
}

describe('numberStreamMedian', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`methods = [${example.input[0][1]}] nums = ${example.input[1][1]}`, () => {
      const result = processMethods(example.input[0][1], example.input[1][1]);

      expect(result).toStrictEqual(example.output);
    });
  });
});
