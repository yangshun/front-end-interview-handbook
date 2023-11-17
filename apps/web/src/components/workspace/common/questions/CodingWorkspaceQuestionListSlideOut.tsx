import { useId, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingFormatFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingFormatFilter';
import useQuestionCompanyFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionCompanyFilter';
import useQuestionCompletionStatusFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionCompletionStatusFilter';
import useQuestionDifficultyFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionDifficultyFilter';
import useQuestionFrameworkFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionFrameworkFilter';
import useQuestionLanguageFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionLanguageFilter';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/filters/hooks/useQuestionsWithCompletionStatus';
import type { QuestionFilter } from '~/components/interviews/questions/listings/filters/QuestionFilterType';
import questionMatchesTextQuery from '~/components/interviews/questions/listings/filters/questionMatchesTextQuery';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsCodingListBrief from '~/components/interviews/questions/listings/items/QuestionsCodingListBrief';
import CheckboxInput from '~/components/ui/CheckboxInput';
import EmptyState from '~/components/ui/EmptyState';
import SlideOut from '~/components/ui/SlideOut';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

function FilterSection<T extends string, Q extends QuestionMetadata>({
  filters,
  filterOptions,
}: Readonly<{
  filterOptions: QuestionFilter<T, Q>;
  filters: Set<T>;
}>) {
  const sectionId = useId();

  return (
    <div className="flex flex-col gap-y-1">
      <label id={sectionId}>
        <Text size="body3" weight="medium">
          {filterOptions.name}
        </Text>
      </label>
      <div
        aria-labelledby={sectionId}
        className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {filterOptions.options.map((option) => (
          <CheckboxInput
            key={option.value}
            label={option.label as string}
            size="sm"
            value={filters.has(option.value)}
            onChange={() => {
              filterOptions.onChange(option.value);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Contents({
  questionsWithCompletionStatus,
}: Readonly<{
  questionsWithCompletionStatus: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
}>) {
  const { userProfile } = useUserProfile();

  const defaultSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [
    { field: 'ranking', isAscendingOrder: true },
    { field: 'difficulty', isAscendingOrder: true },
  ];
  const premiumSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [{ field: 'premium', isAscendingOrder: true }];

  const [query, setQuery] = useState('');
  const questionFormatLists = useQuestionFormatLists();
  const { searchPlaceholder } = questionFormatLists.coding;

  const [difficultyFilters, difficultyFilterOptions] =
    useQuestionDifficultyFilter({ namespace: 'coding' });
  const [companyFilters, companyFilterOptions] = useQuestionCompanyFilter({
    namespace: 'coding',
  });
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({
      namespace: 'coding',
    });
  const [languageFilters, languageFilterOptions] = useQuestionLanguageFilter({
    namespace: 'coding',
  });
  const [codingFormatFilters, codingFormatFilterOptions] =
    useQuestionCodingFormatFilter({ namespace: 'coding' });
  const [frameworkFilters, frameworkFilterOptions] = useQuestionFrameworkFilter(
    { namespace: 'coding' },
  );

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

  return (
    <div className="flex flex-col gap-y-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
        }}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <FilterSection
            filterOptions={difficultyFilterOptions}
            filters={difficultyFilters}
          />
          <FilterSection
            filterOptions={codingFormatFilterOptions}
            filters={codingFormatFilters}
          />
          <FilterSection
            filterOptions={frameworkFilterOptions}
            filters={frameworkFilters}
          />
          {userProfile != null && (
            <FilterSection
              filterOptions={completionStatusFilterOptions}
              filters={completionStatusFilters}
            />
          )}
          {userProfile?.isPremium && (
            <div className="col-span-2">
              <FilterSection
                filterOptions={companyFilterOptions}
                filters={companyFilters}
              />
            </div>
          )}
        </div>
        <TextInput
          autoComplete="off"
          isLabelHidden={true}
          label={searchPlaceholder}
          placeholder={searchPlaceholder}
          size="sm"
          startIcon={RiSearchLine}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </form>
      {(() => {
        const sortedQuestions = sortQuestionsMultiple(
          questionsWithCompletionStatus,
          userProfile?.isPremium
            ? defaultSortFields
            : // Show free questions first if user is not a premium user.
              defaultSortFields.concat(premiumSortFields),
        );
        const processedQuestions = filterQuestions(
          sortedQuestions,
          filters.map(([_, filterFn]) => filterFn),
        );

        return (
          <QuestionsCodingListBrief
            checkIfCompletedQuestion={(question) => question.isCompleted}
            questions={processedQuestions}
          />
        );
      })()}
    </div>
  );
}

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  questionsWithCompletionStatus: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
}>;

export default function CodingWorkspaceQuestionListSlideOut({
  isShown,
  onClose,
  questionsWithCompletionStatus,
}: Props) {
  const questionFormatLists = useQuestionFormatLists();

  return (
    <SlideOut
      enterFrom="start"
      isShown={isShown}
      size="xl"
      title={questionFormatLists.coding.longName}
      onClose={onClose}>
      {isShown && (
        <Contents
          questionsWithCompletionStatus={questionsWithCompletionStatus}
        />
      )}
    </SlideOut>
  );
}
