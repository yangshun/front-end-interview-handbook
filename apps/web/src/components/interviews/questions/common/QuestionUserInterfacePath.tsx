import type { QuestionFramework } from './QuestionsTypes';

export function determineFramework(
  rest: ReadonlyArray<string> | null | undefined,
): Readonly<{
  codeId?: string;
  framework: QuestionFramework | null;
}> {
  if (rest == null || rest.length === 0) {
    return { framework: null };
  }
  if (rest.length === 1) {
    return { framework: rest[0] as QuestionFramework };
  }
  if (rest.length === 2) {
    if (rest[0] === 'solution') {
      return { codeId: rest.join('-'), framework: null };
    }

    return {
      framework: rest[0] as QuestionFramework,
    };
  }

  return {
    codeId: rest.slice(1).join('-'),
    framework: rest[0] as QuestionFramework,
  };
}
