import Trie from './trie-prefix-tree';
import submitTestCases from './submit.tests.json';

function processMethods(methods: string[], words: string[]): (number | null)[] {
  const res: (number | null)[] = [];
  const obj = new Trie();

  for (let i = 0; i < methods.length; i++) {
    switch (methods[i]) {
      case 'insert': {
        obj.insert(words[i]);
        res.push(null);
        break;
      }
      case 'search': {
        res.push(+obj.search(words[i]));
        break;
      }
      case 'startsWith': {
        res.push(+obj.startsWith(words[i]));
        break;
      }
    }
  }

  return res;
}

describe('trie', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`methods = [${example.input[0][1]}] words = [${example.input[1][1]}]`, () => {
      const result = processMethods(example.input[0][1], example.input[1][1]);

      expect(result).toStrictEqual(example.output);
    });
  });
});
