import type {
  QuestionFramework,
  QuestionMetadata,
} from '../../common/QuestionsTypes';

export function questionUserInterfaceDescriptionPath(
  metadata: QuestionMetadata,
  framework: QuestionFramework,
): string {
  return (
    `/questions/user-interface/${metadata.slug}/` +
    (framework === (metadata.frameworkDefault ?? 'vanilla') ? '' : framework)
  );
}

export function questionUserInterfaceSolutionPath(
  metadata: QuestionMetadata,
  framework: QuestionFramework,
): string {
  return (
    `/questions/user-interface/${metadata.slug}/` +
    (framework === (metadata.frameworkDefault ?? 'vanilla')
      ? ['solution']
      : [framework, 'solution']
    ).join('/')
  );
}
