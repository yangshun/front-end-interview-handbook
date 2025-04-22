import { describe, expect, test } from 'vitest';

import { determineFrameworkAndMode } from './QuestionUserInterfacePath';

describe('QuestionUserInterfacePath', () => {
  describe.each([
    [null, { framework: null, mode: 'practice' }],
    [[], { framework: null, mode: 'practice' }],
    [['solution'], { framework: null, mode: 'solution' }],
    [['react'], { framework: 'react', mode: 'practice' }],
    [['react', 'solution'], { framework: 'react', mode: 'solution' }],
    [
      ['solution', 'alt'],
      { codeId: 'solution-alt', framework: null, mode: 'solution' },
    ],
    [
      ['react', 'solution', 'alt'],
      { codeId: 'solution-alt', framework: 'react', mode: 'solution' },
    ],
  ])(
    'determineFrameworkAndMode(%s gets parsed correctly)',
    (rest: ReadonlyArray<string> | null, expected) => {
      test(String(rest), () => {
        expect(determineFrameworkAndMode(rest)).toEqual(expected);
      });
    },
  );
});
