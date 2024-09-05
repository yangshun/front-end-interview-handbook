import type {
  QuestionFormat,
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
  namespace: string;
}>;

export default function useQuestionUnifiedFilters({
  formatFiltersFilterPredicate,
  formatFiltersOrderComparator,
  namespace,
  initialFormat,
}: Props) {
  // Filtering.
  const [query, setQuery] = useQuestionSearchFilter({ namespace });
  const [difficultyFilters, difficultyFilterOptions] =
    useQuestionDifficultyFilter({ namespace });
  const [importanceFilters, importanceFilterOptions] =
    useQuestionImportanceFilter({ namespace });
  const [companyFilters, companyFilterOptions] = useQuestionCompanyFilter({
    namespace,
  });
  const [languageFilters, languageFilterOptions] = useQuestionLanguageFilter({
    namespace,
  });
  const [frameworkFilters, frameworkFilterOptions] = useQuestionFrameworkFilter(
    { namespace },
  );
  const [topicFilters, topicFilterOptions] = useQuestionTopicFilter({
    namespace,
  });
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({ namespace });
  const [formatFilters, formatFilterOptions] = useQuestionFormatFilter({
    filter: formatFiltersFilterPredicate,
    initialValue: initialFormat == null ? [] : [initialFormat],
    namespace,
    order: formatFiltersOrderComparator,
  });

  const filters: ReadonlyArray<
    [number, (question: QuestionMetadataWithCompletedStatus) => boolean]
  > = [
    // Query.
    [0, (question) => questionMatchesTextQuery(question, query)],
    // Difficulty.
    [difficultyFilters.size, difficultyFilterOptions.matches],
    // Importance.
    [importanceFilters.size, importanceFilterOptions.matches],
    // Company.
    [companyFilters.size, companyFilterOptions.matches],
    // Language.
    [languageFilters.size, languageFilterOptions.matches],
    // Format.
    [formatFilters.size, formatFilterOptions.matches],
    // Framework.
    [frameworkFilters.size, frameworkFilterOptions.matches],
    // Topics.
    [topicFilters.size, topicFilterOptions.matches],
    // Completion Status.
    [completionStatusFilters.size, completionStatusFilterOptions.matches],
  ];

  return {
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
