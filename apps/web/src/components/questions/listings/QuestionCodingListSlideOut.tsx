import { useId, useState } from 'react';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import CheckboxInput from '~/components/ui/CheckboxInput';
import EmptyState from '~/components/ui/EmptyState';
import SlideOut from '~/components/ui/SlideOut';
import Spinner from '~/components/ui/Spinner';
import TextInput from '~/components/ui/TextInput';

import type { QuestionFilter } from './QuestionFilterType';
import questionMatchesTextQuery from './questionMatchesTextQuery';
import QuestionsCodingListBrief from './QuestionsCodingListBrief';
import useQuestionCodingFormatFilter from './useQuestionCodingFormatFilter';
import useQuestionCompanyFilter from './useQuestionCompanyFilter';
import useQuestionCompletionStatusFilter from './useQuestionCompletionStatusFilter';
import useQuestionDifficultyFilter from './useQuestionDifficultyFilter';
import useQuestionFrameworkFilter from './useQuestionFrameworkFilter';
import useQuestionLanguageFilter from './useQuestionLanguageFilter';
import useQuestionsWithCompletionStatus from './useQuestionsWithCompletionStatus';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '../common/QuestionsProcessor';
import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
} from '../common/QuestionsTypes';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
}>;

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
      <label className="text-xs font-medium text-neutral-500" id={sectionId}>
        {filterOptions.name}
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

function Contents() {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const {
    isLoading,
    data: codingQuestions,
    isSuccess,
  } = trpc.questions.coding.useQuery();
  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    codingQuestions ?? [],
  );
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
    useQuestionDifficultyFilter({ userFacingFormat: 'coding' });
  const [companyFilters, companyFilterOptions] = useQuestionCompanyFilter({
    userFacingFormat: 'coding',
  });
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({
      userFacingFormat: 'coding',
    });
  const [languageFilters, languageFilterOptions] = useQuestionLanguageFilter({
    userFacingFormat: 'coding',
  });
  const [codingFormatFilters, codingFormatFilterOptions] =
    useQuestionCodingFormatFilter({ userFacingFormat: 'coding' });
  const [frameworkFilters, frameworkFilterOptions] = useQuestionFrameworkFilter(
    { userFacingFormat: 'coding' },
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
          startIcon={MagnifyingGlassIcon}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </form>
      {(() => {
        if (isLoading) {
          return (
            <div className="py-8">
              <Spinner display="block" size="md" />
            </div>
          );
        }

        if (!isSuccess) {
          return (
            <EmptyState
              title={intl.formatMessage({
                defaultMessage: 'Failed to load coding questions',
                description: 'Error message when the questions failed to load',
                id: 'HHJYxM',
              })}
              variant="error"
            />
          );
        }

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

export default function QuestionCodingListSlideOut({
  isShown,
  onClose,
}: Props) {
  const questionFormatLists = useQuestionFormatLists();

  return (
    <SlideOut
      enterFrom="start"
      isShown={isShown}
      size="xl"
      title={questionFormatLists.coding.longName}
      onClose={onClose}>
      {isShown && <Contents />}
    </SlideOut>
  );
}
