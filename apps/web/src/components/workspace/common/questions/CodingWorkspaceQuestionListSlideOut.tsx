import { useId, useState } from 'react';
import { RiListUnordered, RiSearchLine } from 'react-icons/ri';
import { useSessionStorage } from 'usehooks-ts';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingFilters';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import { QuestionsCodingFiltersNamespaceKey } from '~/components/interviews/questions/listings/filters/hooks/useQuestionsCodingFiltersNamespace';
import type { QuestionFilter } from '~/components/interviews/questions/listings/filters/QuestionFilterType';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsCodingListBrief from '~/components/interviews/questions/listings/items/QuestionsCodingListBrief';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import SlideOut from '~/components/ui/SlideOut';
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
        <Text size="body3" weight="bold">
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
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
}>) {
  const { userProfile } = useUserProfile();
  const [namespace] = useSessionStorage(
    QuestionsCodingFiltersNamespaceKey,
    'prepare-coding',
  );

  const questionFormatLists = useQuestionUserFacingFormatData();
  const { searchPlaceholder } = questionFormatLists.coding;

  // Filtering.
  const {
    query,
    setQuery,
    difficultyFilters,
    difficultyFilterOptions,
    companyFilters,
    companyFilterOptions,
    frameworkFilters,
    frameworkFilterOptions,
    completionStatusFilters,
    completionStatusFilterOptions,
    formatFilters,
    formatFilterOptions,
    filters,
  } = useQuestionCodingFilters({
    namespace,
  });

  // Sorting.
  const { defaultSortFields, premiumSortFields } = useQuestionCodingSorting();

  // Processing.
  const sortedQuestions = sortQuestionsMultiple(
    questions,
    userProfile?.isInterviewsPremium
      ? defaultSortFields
      : // Show free questions first if user is not a premium user.
        defaultSortFields.concat(premiumSortFields),
  );
  const processedQuestions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );

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
            filterOptions={formatFilterOptions}
            filters={formatFilters}
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
          {userProfile?.isInterviewsPremium && (
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
          type="search"
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </form>
      <QuestionsCodingListBrief
        checkIfCompletedQuestion={(question) => question.isCompleted}
        questions={processedQuestions}
      />
    </div>
  );
}

type Props = Readonly<{
  isDisabled: boolean;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
}>;

export default function CodingWorkspaceQuestionListSlideOut({
  isDisabled,
  questions,
}: Props) {
  // Have to be controlled because we don't want to
  // render the contents for nothing because it does a fetch.
  const [isShown, setIsShown] = useState(false);
  const questionFormatLists = useQuestionUserFacingFormatData();

  return (
    <SlideOut
      enterFrom="start"
      isShown={isShown}
      size="xl"
      title={questionFormatLists.coding.longName}
      trigger={
        <Button
          addonPosition="start"
          icon={RiListUnordered}
          isDisabled={isDisabled}
          label="Question list"
          size="xs"
          variant="secondary"
          onClick={() => setIsShown(true)}
        />
      }
      onClose={() => setIsShown(false)}>
      {isShown && <Contents questions={questions} />}
    </SlideOut>
  );
}
