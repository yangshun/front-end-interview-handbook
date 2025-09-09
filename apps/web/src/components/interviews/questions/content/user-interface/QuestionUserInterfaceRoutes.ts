import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

// TODO(interviews): see if still needed since there's questionHrefFrameworkSpecificAndListType
export function questionUserInterfacePath(
  metadata: QuestionMetadata,
  framework: QuestionFramework,
): string {
  return (
    `/questions/user-interface/${metadata.slug}/` +
    (framework === (metadata.frameworkDefault ?? 'vanilla') ? '' : framework)
  );
}
