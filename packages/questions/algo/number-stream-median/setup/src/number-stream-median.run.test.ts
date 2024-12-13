import NumberStream from './number-stream-median';
import runTestCases from './run.tests.json';

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
  (runTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}] ${example.input[1][0]} = ${example.input[1][1]}`, () => {
      const result = processMethods(example.input[0][1], example.input[1][1]);

      expect(result).toStrictEqual(example.output);
    });
  });
});
