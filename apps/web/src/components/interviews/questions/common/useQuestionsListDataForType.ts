import { useSearchParams } from 'next/navigation';

import { trpc } from '~/hooks/trpc';

import { QuestionListTypeDefault } from './QuestionHrefUtils';
import type {
  QuestionFormatForList,
  QuestionFramework,
  QuestionLanguage,
  QuestionListTypeData,
  QuestionPracticeFormat,
} from './QuestionsTypes';

/**
 * Please remember to wrap usage of these components in <Suspense>
 */
export function useQuestionsListTypeCurrent(
  studyListKey?: string,
  framework?: QuestionFramework,
): QuestionListTypeData | null {
  const searchParams = useSearchParams();

  if (studyListKey) {
    return { type: 'study-list', value: studyListKey };
  }

  if (searchParams?.get('format')) {
    return {
      type: 'format',
      value: searchParams.get('format') as QuestionFormatForList,
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

  if (searchParams?.get('practice')) {
    return {
      type: 'practice',
      value: searchParams.get('practice') as QuestionPracticeFormat,
    };
  }

  // Used by framework-specific UI qns (e.g. /questions/user-interface/counter/vue)
  // But lower priority than the searchParams
  if (framework) {
    return {
      type: 'framework',
      value: framework,
    };
  }

  return QuestionListTypeDefault;
}

export function useQuestionsListDataForType(
  listType: QuestionListTypeData | null,
) {
  const { isLoading, data } = trpc.questionLists.getQuestions.useQuery(
    (() => {
      switch (listType?.type) {
        case 'practice':
          return { practice: listType.value };
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
