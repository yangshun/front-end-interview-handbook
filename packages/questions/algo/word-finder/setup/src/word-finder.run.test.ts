import WordFinder from './word-finder';
import runTestCases from './run.tests.json';

function processMethods(
  methods: string[],
  words: string[],
): (boolean | null)[] {
  const res: (boolean | null)[] = [];
  const obj = new WordFinder();

  for (let i = 0; i < methods.length; i++) {
    switch (methods[i]) {
      case 'addWord': {
        obj.addWord(words[i]);
        res.push(null);
        break;
      }
      case 'search': {
        res.push(obj.search(words[i]));
        break;
      }
    }
  }

  return res;
}

describe('WordFinder', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = [${example.input[0][1]}] ${example.input[1][0]} = [${example.input[1][1]}]`, () => {
      const result = processMethods(example.input[0][1], example.input[1][1]);

      expect(result).toStrictEqual(example.output);
    });
  });
});
