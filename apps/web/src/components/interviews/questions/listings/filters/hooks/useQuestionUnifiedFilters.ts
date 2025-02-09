import { questionListFilterNamespace } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionFormat,
  QuestionListTypeData,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';

import useQuestionCompanyFilter from './useQuestionCompanyFilter';
import useQuestionCompletionStatusFilter from './useQuestionCompletionStatusFilter';
import useQuestionDifficultyFilter from './useQuestionDifficultyFilter';
import useQuestionFormatFilter from './useQuestionFormatFilter';
import useQuestionFrameworkFilter from './useQuestionFrameworkFilter';
import useQuestionImportanceFilter from './useQuestionImportanceFilter';
import useQuestionLanguageFilter from './useQuestionLanguageFilter';
import useQuestionSearchFilter from './useQuestionSearchFilter';
import useQuestionTopicFilter from './useQuestionTopicFilter';
import questionMatchesTextQuery from '../questionMatchesTextQuery';

type Props = Readonly<{
  formatFiltersFilterPredicate?: (format: QuestionFormat) => boolean;
  formatFiltersOrderComparator?: (
    a: QuestionFormat,
    b: QuestionFormat,
  ) => number;
  initialFormat?: QuestionFormat | null;
  listType?: QuestionListTypeData;
}>;

export default function useQuestionUnifiedFilters({
  formatFiltersFilterPredicate,
  formatFiltersOrderComparator,
  listType,
  initialFormat,
}: Props) {
  const namespaceListLevel = questionListFilterNamespace(listType, 'list');
  const namespaceTabLevel = questionListFilterNamespace(listType, 'tab');

  // Filtering.
  const [query, setQuery] = useQuestionSearchFilter({
    namespace: namespaceListLevel,
  });
  const [difficultyFilters, difficultyFilterOptions] =
    useQuestionDifficultyFilter({ namespace: namespaceListLevel });
  const [importanceFilters, importanceFilterOptions] =
    useQuestionImportanceFilter({ namespace: namespaceListLevel });
  const [companyFilters, companyFilterOptions] = useQuestionCompanyFilter({
    namespace: namespaceListLevel,
  });
  const [languageFilters, languageFilterOptions] = useQuestionLanguageFilter({
    namespace: namespaceListLevel,
  });
  const [frameworkFilters, frameworkFilterOptions] = useQuestionFrameworkFilter(
    { namespace: namespaceListLevel },
  );
  const [topicFilters, topicFilterOptions] = useQuestionTopicFilter({
    namespace: namespaceListLevel,
  });
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({ namespace: namespaceListLevel });
  const [formatFilters, formatFilterOptions] = useQuestionFormatFilter({
    filter: formatFiltersFilterPredicate,
    initialValue: initialFormat == null ? [] : [initialFormat],
    // Tabs have different formats, so formats should be persisted on the tab level.
    namespace: namespaceTabLevel,
    order: formatFiltersOrderComparator,
  });

  function clearAllFilters() {
    setQuery('');
    difficultyFilterOptions.onClear();
    importanceFilterOptions.onClear();
    companyFilterOptions.onClear();
    languageFilterOptions.onClear();
    frameworkFilterOptions.onClear();
    topicFilterOptions.onClear();
    completionStatusFilterOptions.onClear();
    formatFilterOptions.onClear();
  }

  const filters: ReadonlyArray<
    [number, (question: QuestionMetadataWithCompletedStatus) => boolean]
  > = [
    // Query.
    [
      query.length > 0 ? 1 : 0,
      (question) => questionMatchesTextQuery(question, query),
    ],
    // Difficulty.
    [difficultyFilters.size, difficultyFilterOptions.matches],
    // Importance.
    [importanceFilters.size, importanceFilterOptions.matches],
    // Company.
    [companyFilters.size, companyFilterOptions.matches],
    // Language or Framework.
    [
      languageFilters.size + frameworkFilters.size,
      (question) => {
        if (languageFilters.size > 0 && frameworkFilters.size > 0) {
          return (
            languageFilterOptions.matches(question) ||
            frameworkFilterOptions.matches(question)
          );
        }
        if (languageFilters.size > 0) {
          return languageFilterOptions.matches(question);
        }

        return frameworkFilterOptions.matches(question);
      },
    ],
    // Format.
    [formatFilters.size, formatFilterOptions.matches],
    // Topics.
    [topicFilters.size, topicFilterOptions.matches],
    // Completion Status.
    [completionStatusFilters.size, completionStatusFilterOptions.matches],
  ];

  return {
    clearAllFilters,
    companyFilterOptions,
    companyFilters,
    completionStatusFilterOptions,
    completionStatusFilters,
    difficultyFilterOptions,
    difficultyFilters,
    filters,
    formatFilterOptions,
    formatFilters,
    frameworkFilterOptions,
    frameworkFilters,
    importanceFilterOptions,
    importanceFilters,
    languageFilterOptions,
    languageFilters,
    query,
    setQuery,
    topicFilterOptions,
    topicFilters,
  };
}
