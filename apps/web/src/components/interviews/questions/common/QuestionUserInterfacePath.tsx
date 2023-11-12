import type { QuestionFramework } from './QuestionsTypes';

export type QuestionUserInterfaceMode = 'practice' | 'solution';

export function determineFrameworkAndMode(
  rest: ReadonlyArray<string> | null | undefined,
): Readonly<{
  codeId?: string;
  framework: QuestionFramework | null;
  mode: QuestionUserInterfaceMode;
}> {
  if (rest == null || rest.length === 0) {
    return { framework: null, mode: 'practice' };
  }

  if (rest.length === 1) {
    if (rest[0] === 'solution') {
      return { framework: null, mode: 'solution' };
    }

    return { framework: rest[0] as QuestionFramework, mode: 'practice' };
  }

  if (rest.length === 2) {
    if (rest[0] === 'solution') {
      return { codeId: rest.join('-'), framework: null, mode: 'solution' };
    }

    return {
      framework: rest[0] as QuestionFramework,
      mode: rest[1] === 'solution' ? 'solution' : 'practice',
    };
  }

  return {
    codeId: rest.slice(1).join('-'),
    framework: rest[0] as QuestionFramework,
    mode: 'solution',
  };
}
