import type {
  InterviewsQuestionMetadata,
  QuestionFramework,
} from '../../common/QuestionsTypes';

// TODO(interviews): see if still needed since there's questionHrefFrameworkSpecificAndListType
export function questionUserInterfaceDescriptionPath(
  metadata: InterviewsQuestionMetadata,
  framework: QuestionFramework,
): string {
  return (
    `/questions/user-interface/${metadata.slug}/` +
    (framework === (metadata.frameworkDefault ?? 'vanilla') ? '' : framework)
  );
}

export function questionUserInterfaceSolutionPath(
  metadata: InterviewsQuestionMetadata,
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
