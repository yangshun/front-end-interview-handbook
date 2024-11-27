import { useSearchParams } from 'next/navigation';

import { trpc } from '~/hooks/trpc';

import type { QuestionListTypeData } from './questionHref';
import type {
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
} from './QuestionsTypes';

/**
 * Please remember to wrap usage of these components in <Suspense>
 */
export function useQuestionsListTypeCurrent(
  studyListKey?: string,
): QuestionListTypeData | null {
  const searchParams = useSearchParams();

  if (studyListKey) {
    return { type: 'study-list', value: studyListKey };
  }

  if (searchParams?.get('format')) {
    return {
      type: 'format',
      value: searchParams?.get('format') as QuestionFormat,
    };
  }

  if (searchParams?.get('framework')) {
    return {
      type: 'framework',
      value: searchParams?.get('framework') as QuestionFramework,
    };
  }

  if (searchParams?.get('language')) {
    return {
      type: 'language',
      value: searchParams?.get('language') as QuestionLanguage,
    };
  }

  return null;
}

export function useQuestionsListDataForType(
  listType: QuestionListTypeData | null,
) {
  const { isLoading, data } = trpc.questionLists.getQuestions.useQuery(
    (() => {
      switch (listType?.type) {
        case 'study-list':
          return { studyList: listType.value };
        case 'framework':
          return { framework: listType.value };
        case 'format':
          return { format: listType.value };
        case 'language':
          return { language: listType.value };

        default:
          return {};
      }
    })(),
  );

  if (isLoading) {
    return { data: undefined, isLoading };
  }

  return { data, isLoading };
}
