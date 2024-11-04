import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiArrowDownSLine, RiSearchLine, RiSortDesc } from 'react-icons/ri';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { GuideCardMetadataWithCompletedStatus } from '~/components/guides/types';
import InterviewsGuideCard from '~/components/interviews/guides/InterviewsGuideCard';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  countQuestionsByDifficulty,
  countQuestionsByPremium,
  countQuestionsTotalDurationMins,
  filterQuestions,
  sortQuestionsMultiple,
  tabulateQuestionsAttributesUnion,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import { FormattedMessage, useIntl } from '~/components/intl';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Popover from '~/components/ui/Popover';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeDivideEmphasizeColor } from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import useQuestionCodingSorting from '../filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '../filters/hooks/useQuestionUnifiedFilters';
import QuestionListingUnifiedFilters from '../filters/QuestionListingUnifiedFilters';
import QuestionsListingFilterSlideOut from '../filters/QuestionsListingFilterSlideout';
import QuestionListingSummarySection from '../stats/QuestionListingSummarySection';
import type { QuestionFramework } from '../../common/QuestionsTypes';
import QuestionCountLabel from '../../metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '../../metadata/QuestionTotalTimeLabel';

export type Props = Readonly<{
  checkIfCompletedQuestionBefore?: (question: QuestionMetadata) => boolean;
  filterNamespace: string;
  formatFiltersFilterPredicate?: (format: QuestionFormat) => boolean;
  formatFiltersOrderComparator?: (
    a: QuestionFormat,
    b: QuestionFormat,
  ) => number;
  framework?: QuestionFramework;
  guides?: {
    description: string;
    items: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
    title: string;
  };
  initialFormat?: QuestionFormat | null;
  layout?: 'embedded' | 'full';
  listKey?: string;
  listMode?: 'default' | 'learning-list';
  mode?: 'default' | 'framework';
  onMarkAsCompleted?: (question: QuestionMetadata) => void;
  onMarkAsNotCompleted?: (question: QuestionMetadata) => void;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  showSummarySection?: boolean;
  sideColumnAddOn?: ReactNode;
}>;

export default function QuestionsUnifiedListWithFilters({
  checkIfCompletedQuestionBefore,
  initialFormat = null,
  framework,
  layout = 'full',
  listKey,
  listMode,
  mode = 'default',
  filterNamespace,
  questions,
  questionCompletionCount,
  formatFiltersFilterPredicate,
  formatFiltersOrderComparator,
  onMarkAsCompleted,
  onMarkAsNotCompleted,
  showSummarySection = true,
  guides,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

  // Tabulating.
  const questionAttributesUnion = tabulateQuestionsAttributesUnion(questions);

  // Filtering.
  const {
    query,
    setQuery,
    difficultyFilters,
    difficultyFilterOptions,
    companyFilters,
    companyFilterOptions,
    languageFilters,
    languageFilterOptions,
    frameworkFilters,
    frameworkFilterOptions,
    importanceFilters,
    importanceFilterOptions,
    completionStatusFilters,
    completionStatusFilterOptions,
    formatFilters,
    formatFilterOptions,
    topicFilters,
    topicFilterOptions,
    filters,
  } = useQuestionUnifiedFilters({
    filterNamespace,
    formatFiltersFilterPredicate,
    formatFiltersOrderComparator,
    initialFormat,
  });

  // Sorting.
  const {
    isAscendingOrder,
    setIsAscendingOrder,
    sortField,
    setSortField,
    defaultSortFields,
    premiumSortFields,
  } = useQuestionCodingSorting({ filterNamespace });

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

  const difficultyCount = countQuestionsByDifficulty(processedQuestions);
  const premiumCount = countQuestionsByPremium(processedQuestions);
  const totalDurationMins = countQuestionsTotalDurationMins(processedQuestions);
  const showPaywall =
    !userProfile?.isInterviewsPremium && companyFilters.size > 0;

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

  const sortAndFilters = (
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0">
      <div className={clsx(layout === 'full' && 'lg:hidden')}>
        <QuestionsListingFilterSlideOut
          attributesUnion={questionAttributesUnion}
          filterNamespace={filterNamespace}
          mode={mode}
        />
      </div>
      <DropdownMenu
        align="end"
        icon={RiSortDesc}
        label={intl.formatMessage({
          defaultMessage: 'Sort by',
          description: 'Label for sorting button',
          id: 'vegaR1',
        })}
        showChevron={true}
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
    </div>
  );
  const searchFilterRow = (
    <div className={clsx('flex justify-end gap-2')}>
      <div className="flex-1">
        <TextInput
          autoComplete="off"
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Search questions',
            description: 'Placeholder for search input of question list',
            id: '1w3zxf',
          })}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search questions',
            description: 'Placeholder for search input of question list',
            id: '1w3zxf',
          })}
          size="sm"
          startIcon={RiSearchLine}
          type="search"
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>
      {layout === 'embedded' && (
        <div className="hidden lg:inline-flex">
          <Popover
            trigger={
              <FilterButton
                addonPosition="end"
                icon={RiArrowDownSLine}
                label={companyFilterOptions.name}
                selected={companyFilters.size > 0}
                size="sm"
              />
            }>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {companyFilterOptions.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <CheckboxInput
                    label={option.label}
                    size="sm"
                    value={companyFilters.has(option.value)}
                    onChange={() => companyFilterOptions.onChange(option.value)}
                  />
                </div>
              ))}
            </div>
          </Popover>
        </div>
      )}
      {layout === 'embedded' && (
        <div className="hidden lg:inline-flex">
          <Popover
            trigger={
              <FilterButton
                addonPosition="end"
                icon={RiArrowDownSLine}
                label={difficultyFilterOptions.name}
                selected={difficultyFilters.size > 0}
                size="sm"
              />
            }
            width="sm">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {difficultyFilterOptions.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <CheckboxInput
                    label={option.label}
                    size="sm"
                    value={difficultyFilters.has(option.value)}
                    onChange={() =>
                      difficultyFilterOptions.onChange(option.value)
                    }
                  />
                </div>
              ))}
            </div>
          </Popover>
        </div>
      )}
      {layout === 'embedded' && (
        <div className="hidden lg:inline-flex">
          <Popover
            trigger={
              <FilterButton
                addonPosition="end"
                icon={RiArrowDownSLine}
                label={frameworkFilterOptions.name}
                selected={frameworkFilters.size > 0}
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
                        onChange={() =>
                          frameworkFilterOptions.onChange(option.value)
                        }
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
                        onChange={() =>
                          languageFilterOptions.onChange(option.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Popover>
        </div>
      )}
      {layout === 'embedded' && (
        <div className="hidden lg:inline-flex">
          <Popover
            trigger={
              <FilterButton
                addonPosition="end"
                icon={RiArrowDownSLine}
                label={completionStatusFilterOptions.name}
                selected={completionStatusFilters.size > 0}
                size="sm"
              />
            }
            width="sm">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {completionStatusFilterOptions.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <CheckboxInput
                    label={option.label}
                    size="sm"
                    value={completionStatusFilters.has(option.value)}
                    onChange={() =>
                      completionStatusFilterOptions.onChange(option.value)
                    }
                  />
                </div>
              ))}
            </div>
          </Popover>
        </div>
      )}
      {sortAndFilters}
    </div>
  );
  const listMetadata = (
    <div className="flex gap-x-10">
      <QuestionCountLabel count={processedQuestions.length} showIcon={true} />
      {totalDurationMins > 0 && (
        <QuestionTotalTimeLabel mins={totalDurationMins} showIcon={true} />
      )}
    </div>
  );

  return (
    <div
      className={clsx(
        layout === 'full' && 'lg:grid lg:grid-cols-12 lg:gap-x-6',
      )}>
      {/* Left Column */}
      <section className="flex flex-col gap-8 lg:col-span-9">
        <div className="flex flex-col gap-4">{searchFilterRow}</div>
        <div className="flex flex-col gap-4">
          {listMetadata}
          {showPaywall ? (
            <div className="relative">
              <div
                className={clsx(
                  'min-h-[500px]',
                  'pointer-events-none touch-none select-none',
                )}
                // So that focus cannot go into the card, which is not meant to be used.
                inert="">
                <QuestionsList
                  checkIfCompletedQuestion={() => false}
                  questions={sortedQuestions.slice(0, 4)}
                />
              </div>
              <div
                className={clsx(
                  'absolute bottom-0 top-0',
                  'w-full overflow-hidden rounded-b-lg',
                )}>
                <div
                  className={clsx(
                    'absolute bottom-0 top-0 w-full',
                    'bg-gradient-to-t from-white via-white dark:from-neutral-950 dark:via-neutral-950',
                  )}
                />
                <div className={clsx('absolute bottom-0 w-full px-8')}>
                  <QuestionPaywall background={false} feature="company-tags" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Heading className="sr-only" level="custom">
                <FormattedMessage
                  defaultMessage="Questions List"
                  description="Screenreader text indicating the question list component on question list pages"
                  id="h38yCs"
                />
              </Heading>
              <Section>
                <div className="flex flex-col gap-4">
                  {guides && <InterviewsGuideCard data={guides} />}
                  <QuestionsList
                    checkIfCompletedQuestion={(question) =>
                      question.isCompleted
                    }
                    checkIfCompletedQuestionBefore={
                      checkIfCompletedQuestionBefore
                    }
                    framework={framework}
                    listKey={listKey}
                    mode={listMode}
                    questionCompletionCount={questionCompletionCount}
                    questions={processedQuestions}
                    onMarkAsCompleted={onMarkAsCompleted}
                    onMarkAsNotCompleted={onMarkAsNotCompleted}
                  />
                </div>
              </Section>
            </div>
          )}
        </div>
      </section>
      {/* Right Column */}
      {layout === 'full' && (
        <aside
          className={clsx(
            'hidden h-full flex-col gap-y-10 lg:col-span-3 lg:flex',
            ['divide-y', themeDivideEmphasizeColor],
          )}>
          {showSummarySection && (
            <QuestionListingSummarySection
              free={premiumCount.free}
              premium={premiumCount.premium}
              {...difficultyCount}
            />
          )}
          <section
            className={clsx(
              'overflow-y-auto',
              'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
            )}>
            <Heading className="sr-only" level="custom">
              <FormattedMessage
                defaultMessage="Filters"
                description="Screenreader text indicating the filters component on question list pages"
                id="GyDKzV"
              />
            </Heading>
            <Section>
              <QuestionListingUnifiedFilters
                attributesUnion={questionAttributesUnion}
                companyFilterOptions={companyFilterOptions}
                companyFilters={companyFilters}
                completionStatusFilterOptions={completionStatusFilterOptions}
                completionStatusFilters={completionStatusFilters}
                difficultyFilterOptions={difficultyFilterOptions}
                difficultyFilters={difficultyFilters}
                formatFilterOptions={formatFilterOptions}
                formatFilters={formatFilters}
                frameworkFilterOptions={frameworkFilterOptions}
                frameworkFilters={frameworkFilters}
                importanceFilterOptions={importanceFilterOptions}
                importanceFilters={importanceFilters}
                languageFilterOptions={languageFilterOptions}
                languageFilters={languageFilters}
                mode={mode}
                topicFilterOptions={topicFilterOptions}
                topicFilters={topicFilters}
              />
            </Section>
          </section>
        </aside>
      )}
    </div>
  );
}
