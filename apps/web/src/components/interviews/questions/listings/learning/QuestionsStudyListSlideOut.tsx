import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFilterLine,
  RiSearchLine,
  RiSortDesc,
} from 'react-icons/ri';
import { useMediaQuery, useSessionStorage } from 'usehooks-ts';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
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
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Popover from '~/components/ui/Popover';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeBorderColor } from '~/components/ui/theme';

function FilterSection<T extends string, Q extends QuestionMetadata>({
  coveredValues,
  filters,
  filterOptions,
}: Readonly<{
  coveredValues?: Set<T>;
  filterOptions: QuestionFilter<T, Q>;
  filters: Set<T>;
}>) {
  // No need filter if there's only a single option.
  if (coveredValues != null && coveredValues.size <= 1) {
    return null;
  }

  return (
    <Popover
      trigger={
        <FilterButton
          addonPosition="end"
          icon={RiArrowDownSLine}
          label={filterOptions.name}
          selected={filters.size > 0}
          size="sm"
        />
      }>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {filterOptions.options.map((option) => (
          <div key={option.value} className="flex items-center">
            <CheckboxInput
              label={option.label}
              size="sm"
              value={filters.has(option.value)}
              onChange={() => filterOptions.onChange(option.value)}
            />
          </div>
        ))}
      </div>
    </Popover>
  );
}

function FrameworkAndLanguageFilterSection<Q extends QuestionMetadata>({
  languageCoveredValues,
  frameworkCoveredValues,
  frameworkFilters,
  frameworkFilterOptions,
  languageFilters,
  languageFilterOptions,
}: Readonly<{
  frameworkCoveredValues?: Set<QuestionFramework>;
  frameworkFilterOptions: QuestionFilter<QuestionFramework, Q>;
  frameworkFilters: Set<QuestionFramework>;
  languageCoveredValues?: Set<QuestionLanguage>;
  languageFilterOptions: QuestionFilter<QuestionLanguage, Q>;
  languageFilters: Set<QuestionLanguage>;
}>) {
  // No need filter if there's only a single option.
  if (
    languageCoveredValues != null &&
    languageCoveredValues.size <= 1 &&
    frameworkCoveredValues != null &&
    frameworkCoveredValues.size <= 1
  ) {
    return null;
  }

  return (
    <Popover
      trigger={
        <FilterButton
          addonPosition="end"
          icon={RiArrowDownSLine}
          label="Framework / Language"
          selected={frameworkFilters.size > 0 || languageFilters.size > 0}
          size="sm"
        />
      }>
      <div className={clsx('flex flex-col')}>
        <div className="flex flex-col gap-2">
          <Text className="block" size="body3" weight="medium">
            {frameworkFilterOptions.name}
          </Text>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {frameworkFilterOptions.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <CheckboxInput
                  label={option.label}
                  size="sm"
                  value={frameworkFilters.has(option.value)}
                  onChange={() => frameworkFilterOptions.onChange(option.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex flex-col gap-2">
          <Text className="block" size="body3" weight="medium">
            {languageFilterOptions.name}
          </Text>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {languageFilterOptions.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <CheckboxInput
                  label={option.label}
                  size="sm"
                  value={languageFilters.has(option.value)}
                  onChange={() => languageFilterOptions.onChange(option.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Popover>
  );
}

function Contents({
  listKey,
  questions,
}: Readonly<{
  listKey?: string | undefined;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
}>) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const [namespace] = useSessionStorage(
    QuestionsCodingFiltersNamespaceKey,
    'prepare-coding',
  );

  const questionFormatLists = useQuestionUserFacingFormatData();
  const { searchPlaceholder } = questionFormatLists.coding;
  const [showFilters, setShowFilters] = useState(false);

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
    languageFilters,
    languageFilterOptions,
    completionStatusFilters,
    completionStatusFilterOptions,
    importanceFilters,
    importanceFilterOptions,
    formatFilters,
    formatFilterOptions,
    topicFilterOptions,
    topicFilters,
    filters,
    clearAllFilters,
  } = useQuestionUnifiedFilters({
    namespace,
  });

  // Sorting.
  const {
    isAscendingOrder,
    setIsAscendingOrder,
    sortField,
    setSortField,
    defaultSortFields,
    premiumSortFields,
  } = useQuestionCodingSorting();

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

  const numberOfFilters = filters.filter(([size]) => size > 0).length;

  function makeDropdownItemProps(
    label: string,
    itemField: QuestionSortField,
    isItemAscendingOrder: boolean,
  ) {
    return {
      isSelected:
        sortField === itemField && isAscendingOrder === isItemAscendingOrder,
      label,
      onClick: () => {
        setSortField(itemField), setIsAscendingOrder(isItemAscendingOrder);
      },
    };
  }

  const sortFilter = (
    <DropdownMenu
      align="end"
      icon={RiSortDesc}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Sort by',
        description: 'Label for sorting button',
        id: 'vegaR1',
      })}
      showChevron={false}
      size="sm">
      {[
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Title: A to Z',
            description:
              'Sorting option for question list - sort titles from A to Z',
            id: 'tsVEh8',
          }),
          'title',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Title: Z to A',
            description:
              'Sorting option for question list - sort titles from Z to A',
            id: 'jblvez',
          }),
          'title',
          false,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Difficulty: Easy to Hard',
            description:
              'Sorting option for question list - sort by difficulty from easy to hard',
            id: 'oNMAi3',
          }),
          'difficulty',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Difficulty: Hard to Easy',
            description:
              'Sorting option for question list - sort by difficulty from hard to easy',
            id: 'tDJ0XN',
          }),
          'difficulty',
          false,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Importance: High to Low',
            description:
              'Sorting option for question list - sort by importance from high to low',
            id: 'Tt86gs',
          }),
          'importance',
          false,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Importance: Low to High',
            description:
              'Sorting option for question list - sort by importance from low to high',
            id: 'MYNtBs',
          }),
          'importance',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Duration: Low to High',
            description:
              'Sorting option for question list - sort by duration from low to high',
            id: 'JJ0V4Y',
          }),
          'duration',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Duration: High to Low',
            description:
              'Sorting option for question list - sort by duration from high to low',
            id: 'KjD2cI',
          }),
          'duration',
          false,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Created: Newest to Oldest',
            description:
              'Sorting option on question list page to sort by creation time, from newest to oldest',
            id: 'A+qESm',
          }),
          'created',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Created: Oldest to Newest',
            description:
              'Sorting option on question list page to sort by creation time, from oldest to newest',
            id: 'HEQbsp',
          }),
          'created',
          false,
        ),
      ].map((props) => (
        <DropdownMenu.Item key={props.label} {...props} />
      ))}
    </DropdownMenu>
  );

  const embedFilters = (
    <div>
      <div className="flex flex-wrap gap-2 py-2">
        <FilterSection
          coveredValues={attributesUnion.topics}
          filterOptions={topicFilterOptions}
          filters={topicFilters}
        />
        {userProfile?.isInterviewsPremium && (
          <div className="col-span-2">
            <FilterSection
              filterOptions={companyFilterOptions}
              filters={companyFilters}
            />
          </div>
        )}
        <FilterSection
          coveredValues={attributesUnion.difficulty}
          filterOptions={difficultyFilterOptions}
          filters={difficultyFilters}
        />
        <FilterSection
          coveredValues={attributesUnion.importance}
          filterOptions={importanceFilterOptions}
          filters={importanceFilters}
        />
        {userProfile != null && (
          <FilterSection
            filterOptions={completionStatusFilterOptions}
            filters={completionStatusFilters}
          />
        )}
        <FrameworkAndLanguageFilterSection
          frameworkCoveredValues={attributesUnion.frameworks}
          frameworkFilterOptions={frameworkFilterOptions}
          frameworkFilters={frameworkFilters}
          languageCoveredValues={attributesUnion.languages}
          languageFilterOptions={languageFilterOptions}
          languageFilters={languageFilters}
        />
        <FilterSection
          coveredValues={attributesUnion.formats}
          filterOptions={formatFilterOptions}
          filters={formatFilters}
        />
      </div>
      <div
        className={clsx('flex items-center justify-between gap-2', 'py-2', [
          'border-t',
          themeBorderColor,
        ])}>
        <Button
          icon={RiArrowUpSLine}
          label={intl.formatMessage({
            defaultMessage: 'Hide',
            description: 'Label for hide filter button',
            id: 'rfSyqp',
          })}
          size="xs"
          variant="tertiary"
          onClick={() => setShowFilters(false)}
        />
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Reset filter',
            description: 'Label for reset filter button',
            id: 'Oxdmlq',
          })}
          size="xs"
          variant="tertiary"
          onClick={clearAllFilters}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-4">
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
        }}>
        <div className="flex w-full items-center gap-3">
          <div className="flex-1">
            <TextInput
              autoComplete="off"
              isLabelHidden={true}
              label={
                listKey
                  ? intl.formatMessage({
                      defaultMessage: 'Search in the list',
                      description: 'Search placeholder for study list',
                      id: 'y6DqsF',
                    })
                  : searchPlaceholder
              }
              placeholder={searchPlaceholder}
              size="sm"
              startIcon={RiSearchLine}
              type="search"
              value={query}
              onChange={(value) => setQuery(value)}
            />
          </div>
          <FilterButton
            icon={RiFilterLine}
            isLabelHidden={true}
            label={
              intl.formatMessage({
                defaultMessage: 'Filters',
                description: 'Label for filters button',
                id: 'k2Oi+j',
              }) + (numberOfFilters > 0 ? ` (${numberOfFilters})` : '')
            }
            selected={numberOfFilters > 0}
            size="sm"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          />
          {sortFilter}
        </div>
        {showFilters && embedFilters}
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
