import { determineFramework } from './QuestionUserInterfacePath';

describe('QuestionUserInterfacePath', () => {
  describe.each([
    [null, { framework: null }],
    [[], { framework: null }],
    [['react'], { framework: 'react' }],
    [['solution', 'alt'], { codeId: 'solution-alt', framework: null }],
    [
      ['react', 'solution', 'alt'],
      { codeId: 'solution-alt', framework: 'react' },
    ],
  ])(
    'determineFrameworkAndMode(%s gets parsed correctly)',
    (rest: ReadonlyArray<string> | null, expected) => {
      test(String(rest), () => {
        expect(determineFramework(rest)).toEqual(expected);
      });
    },
  );
});
