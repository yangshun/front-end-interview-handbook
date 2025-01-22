import { useSearchParams } from 'next/navigation';

import { trpc } from '~/hooks/trpc';

import { QuestionListTypeDefault } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionFormatForList,
  QuestionFramework,
  QuestionLanguage,
  QuestionListTypeData,
  QuestionListTypeDataFilters,
  QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';

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

  const tab = searchParams?.get('tab')
    ? (searchParams?.get('tab') as QuestionPracticeFormat)
    : undefined;
  const filters = searchParams?.get('filters')
    ? (JSON.parse(searchParams!.get('filters')!) as QuestionListTypeDataFilters)
    : undefined;

  if (searchParams?.get('format')) {
    return {
      tab,
      type: 'format',
      value: searchParams.get('format') as QuestionFormatForList,
    };
  }

  if (searchParams?.get('framework')) {
    return {
      filters,
      tab,
      title: searchParams?.get('title') ?? undefined,
      type: 'framework',
      value: searchParams?.get('framework') as QuestionFramework,
    };
  }

  if (searchParams?.get('language')) {
    return {
      filters,
      tab,
      title: searchParams?.get('title') ?? undefined,
      type: 'language',
      value: searchParams?.get('language') as QuestionLanguage,
    };
  }

  if (searchParams?.get('practice')) {
    return {
      tab,
      type: 'practice',
      value: 'practice',
    };
  }

  // Used by framework-specific UI qns (e.g. /questions/user-interface/counter/vue)
  // But lower priority than the searchParams
  if (framework) {
    return {
      tab,
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
          return { practice: listType.value, tab: listType?.tab };
        case 'study-list':
          return { studyList: listType.value, tab: listType?.tab };
        case 'framework':
          return {
            filters: listType?.filters,
            framework: listType.value,
            tab: listType?.tab,
            title: listType?.title,
          };
        case 'format':
          return { format: listType.value, tab: listType?.tab };
        case 'language':
          return {
            filters: listType?.filters,
            language: listType.value,
            tab: listType?.tab,
            title: listType?.title,
          };

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
