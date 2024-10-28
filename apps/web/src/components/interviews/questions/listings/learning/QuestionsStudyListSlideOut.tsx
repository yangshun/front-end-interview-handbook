import { useId, useState } from 'react';
import { RiFilterLine, RiSearchLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useMediaQuery, useSessionStorage } from 'usehooks-ts';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import { QuestionsCodingFiltersNamespaceKey } from '~/components/interviews/questions/listings/filters/hooks/useQuestionsCodingFiltersNamespace';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import type { QuestionFilter } from '~/components/interviews/questions/listings/filters/QuestionFilterType';
import {
  filterQuestions,
  sortQuestionsMultiple,
  tabulateQuestionsAttributesUnion,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsCodingListBrief from '~/components/interviews/questions/listings/items/QuestionsCodingListBrief';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

function FilterSection<T extends string, Q extends QuestionMetadata>({
  coveredValues,
  filters,
  filterOptions,
}: Readonly<{
  coveredValues?: Set<T>;
  filterOptions: QuestionFilter<T, Q>;
  filters: Set<T>;
}>) {
  const sectionId = useId();

  // No need filter if there's only a single option.
  if (coveredValues != null && coveredValues.size <= 1) {
    return null;
  }

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
        {filterOptions.options
          .filter((option) =>
            coveredValues == null ? true : coveredValues?.has(option.value),
          )
          .map((option) => (
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
  listKey,
  questions,
}: Readonly<{
  listKey?: string | undefined;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
}>) {
  const { userProfile } = useUserProfile();
  const [namespace] = useSessionStorage(
    QuestionsCodingFiltersNamespaceKey,
    'prepare-coding',
  );

  const questionFormatLists = useQuestionUserFacingFormatData();
  const { searchPlaceholder } = questionFormatLists.coding;

  // Tabulating.
  const attributesUnion = tabulateQuestionsAttributesUnion(questions);

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
  } = useQuestionUnifiedFilters({
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
            coveredValues={attributesUnion.difficulty}
            filterOptions={difficultyFilterOptions}
            filters={difficultyFilters}
          />
          <FilterSection
            coveredValues={attributesUnion.formats}
            filterOptions={formatFilterOptions}
            filters={formatFilters}
          />
          <FilterSection
            coveredValues={attributesUnion.frameworks}
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
        listKey={listKey}
        questions={processedQuestions}
      />
    </div>
  );
}

type Props = Readonly<{
  isDisabled: boolean;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  studyList?: Readonly<{ listKey: string; name: string }>;
}>;

export default function QuestionsStudyListSlideOut({
  isDisabled,
  questions,
  studyList,
}: Props) {
  const intl = useIntl();
  // Have to be controlled because we don't want to
  // render the contents for nothing because it does a fetch.
  const [isShown, setIsShown] = useState(false);
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <SlideOut
      enterFrom="start"
      isShown={isShown}
      size="xl"
      title={
        studyList != null
          ? studyList.name
          : intl.formatMessage({
              defaultMessage: 'Questions',
              description: 'Questions list',
              id: 'Lo9TQS',
            })
      }
      trigger={
        <Button
          addonPosition="start"
          icon={RiFilterLine}
          isDisabled={isDisabled}
          isLabelHidden={isMobile}
          label={studyList != null ? studyList.name : 'Question list'}
          size="xs"
          variant="secondary"
          onClick={() => setIsShown(true)}
        />
      }
      onClose={() => setIsShown(false)}>
      {isShown && (
        <Contents listKey={studyList?.listKey} questions={questions} />
      )}
    </SlideOut>
  );
}
