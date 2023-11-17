import useQuestionCodingFormatFilter from './useQuestionCodingFormatFilter';
import useQuestionCompanyFilter from './useQuestionCompanyFilter';
import useQuestionCompletionStatusFilter from './useQuestionCompletionStatusFilter';
import useQuestionDifficultyFilter from './useQuestionDifficultyFilter';
import useQuestionFrameworkFilter from './useQuestionFrameworkFilter';
import useQuestionLanguageFilter from './useQuestionLanguageFilter';
import useQuestionSearchFilter from './useQuestionSearchFilter';
import questionMatchesTextQuery from '../questionMatchesTextQuery';
import type {
  QuestionCodingFormat,
  QuestionMetadataWithCompletedStatus,
} from '../../../common/QuestionsTypes';

type Props = Readonly<{
  codingFormatFiltersFilterPredicate?: (
    format: QuestionCodingFormat,
  ) => boolean;
  codingFormatFiltersOrderComparator?: (
    a: QuestionCodingFormat,
    b: QuestionCodingFormat,
  ) => number;
  initialCodingFormat?: QuestionCodingFormat | null;
  namespace: string;
}>;

export default function useQuestionCodingFilters({
  codingFormatFiltersFilterPredicate,
  codingFormatFiltersOrderComparator,
  namespace,
  initialCodingFormat,
}: Props) {
  // Filtering.
  const [query, setQuery] = useQuestionSearchFilter({ namespace });
  const [difficultyFilters, difficultyFilterOptions] =
    useQuestionDifficultyFilter({ namespace });
  const [companyFilters, companyFilterOptions] = useQuestionCompanyFilter({
    namespace,
  });
  const [languageFilters, languageFilterOptions] = useQuestionLanguageFilter({
    namespace,
  });
  const [frameworkFilters, frameworkFilterOptions] = useQuestionFrameworkFilter(
    { namespace },
  );
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({ namespace });
  const [codingFormatFilters, codingFormatFilterOptions] =
    useQuestionCodingFormatFilter({
      filter: codingFormatFiltersFilterPredicate,
      initialValue: initialCodingFormat == null ? [] : [initialCodingFormat],
      namespace,
      order: codingFormatFiltersOrderComparator,
    });

  const filters: ReadonlyArray<
    [number, (question: QuestionMetadataWithCompletedStatus) => boolean]
  > = [
    // Query.
    [0, (question) => questionMatchesTextQuery(question, query)],
    // Difficulty.
    [difficultyFilters.size, difficultyFilterOptions.matches],
    // Company.
    [companyFilters.size, companyFilterOptions.matches],
    // Language.
    [languageFilters.size, languageFilterOptions.matches],
    // Coding Format.
    [codingFormatFilters.size, codingFormatFilterOptions.matches],
    // Framework.
    [frameworkFilters.size, frameworkFilterOptions.matches],
    // Completion Status.
    [completionStatusFilters.size, completionStatusFilterOptions.matches],
  ];

  return {
    codingFormatFilterOptions,
    codingFormatFilters,
    companyFilterOptions,
    companyFilters,
    completionStatusFilterOptions,
    completionStatusFilters,
    difficultyFilterOptions,
    difficultyFilters,
    filters,
    frameworkFilterOptions,
    frameworkFilters,
    languageFilterOptions,
    languageFilters,
    query,
    setQuery,
  };
}
