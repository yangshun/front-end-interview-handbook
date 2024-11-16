import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiSearchLine, RiSortDesc } from 'react-icons/ri';

import VignetteOverlay from '~/components/common/VignetteOverlay';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { GuideCardMetadataWithCompletedStatus } from '~/components/guides/types';
import InterviewsGuideCard from '~/components/interviews/guides/InterviewsGuideCard';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionFormat,
  QuestionFrameworkOrLanguage,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  countQuestionsByAccess,
  countQuestionsTotalDurationMins,
  filterQuestions,
  sortQuestionsMultiple,
  tabulateQuestionsAttributesUnion,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import { FormattedMessage, useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import TextInput from '~/components/ui/TextInput';
import { themeDivideEmphasizeColor } from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import useQuestionCodingSorting from '../filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '../filters/hooks/useQuestionUnifiedFilters';
import QuestionListingUnifiedFilters from '../filters/QuestionListingUnifiedFilters';
import QuestionsListingFilterSlideOut from '../filters/QuestionsListingFilterSlideout';
import QuestionListingAccessSummary from '../stats/QuestionListingAccessSummary';
import QuestionCountLabel from '../../metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '../../metadata/QuestionTotalTimeLabel';

type Props = Readonly<{
  categoryTabs?: ReactNode;
  checkIfCompletedQuestionBefore?: (question: QuestionMetadata) => boolean;
  defaultSortField: QuestionSortField;
  filterNamespace: string;
  formatFiltersFilterPredicate?: (format: QuestionFormat) => boolean;
  formatFiltersOrderComparator?: (
    a: QuestionFormat,
    b: QuestionFormat,
  ) => number;
  framework?: QuestionFrameworkOrLanguage;
  guides?: {
    description: string;
    items: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
    title: string;
  };
  initialFormat?: QuestionFormat | null;
  listKey?: string;
  listMode?: 'default' | 'learning-list';
  mode?: 'default' | 'framework';
  onMarkAsCompleted?: (question: QuestionMetadata) => void;
  onMarkAsNotCompleted?: (question: QuestionMetadata) => void;
  onQuestionClickIntercept?: (redirectHref: string) => void;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  searchPlaceholder?: string;
  showSummarySection?: boolean;
  sideColumnAddOn?: ReactNode;
}>;

export default function QuestionsUnifiedListWithFilters({
  checkIfCompletedQuestionBefore,
  categoryTabs,
  defaultSortField = 'default',
  initialFormat = null,
  framework,
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
  searchPlaceholder,
  showSummarySection = true,
  onQuestionClickIntercept,
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
  } = useQuestionCodingSorting({ defaultSortField, filterNamespace });

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

  const premiumCount = countQuestionsByAccess(processedQuestions);
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
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0 md:gap-4">
      <div className={clsx('lg:hidden')}>
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
        {/* TODO(interviews): consolidate with QuestionsStudyListSlideOut */}
        {[
          defaultSortField === 'default' &&
            makeDropdownItemProps(
              intl.formatMessage({
                defaultMessage: 'Default',
                description: 'Default sorting',
                id: 'vcnpme',
              }),
              'default',
              true,
            ),
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
        ]
          .flatMap((item) => (item ? [item] : []))
          .map((props) => (
            <DropdownMenu.Item key={props.label} {...props} />
          ))}
      </DropdownMenu>
    </div>
  );
  const searchFilterRow = (
    <>
      <div className={clsx('flex justify-end gap-2 md:gap-4')}>
        <div className="flex-1">
          <TextInput
            autoComplete="off"
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Search questions',
              description: 'Placeholder for search input of question list',
              id: '1w3zxf',
            })}
            placeholder={
              searchPlaceholder ??
              (listKey
                ? intl.formatMessage({
                    defaultMessage: 'Search within this list of questions',
                    description:
                      'Placeholder for search input of question list',
                    id: 'WUBRnN',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Search questions',
                    description:
                      'Placeholder for search input of question list',
                    id: '1w3zxf',
                  }))
            }
            size="sm"
            startIcon={RiSearchLine}
            type="search"
            value={query}
            onChange={(value) => setQuery(value)}
          />
        </div>
        {sortAndFilters}
      </div>
      {categoryTabs}
    </>
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
    <div className={clsx('lg:grid lg:grid-cols-3 lg:gap-x-6')}>
      {/* Left Column */}
      <section className="flex flex-col gap-8 lg:col-span-2">
        <div className="flex flex-col gap-8">{searchFilterRow}</div>
        <div className="flex flex-col gap-4">
          {listMetadata}
          {showPaywall ? (
            <VignetteOverlay
              overlay={
                <QuestionPaywall background={false} feature="company-tags" />
              }>
              <div
                className="border-lg pointer-events-none touch-none select-none"
                // So that focus cannot go into the card, which is not meant to be used.
                inert="">
                <QuestionsList
                  checkIfCompletedQuestion={() => false}
                  questions={questions.slice(0, 4)}
                />
              </div>
            </VignetteOverlay>
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
                    framework={
                      // TODO(interviews): improve this
                      framework !== 'html' &&
                      framework !== 'js' &&
                      framework !== 'ts' &&
                      framework !== 'css'
                        ? framework
                        : undefined
                    }
                    listKey={listKey}
                    mode={listMode}
                    questionCompletionCount={questionCompletionCount}
                    questions={processedQuestions}
                    onMarkAsCompleted={onMarkAsCompleted}
                    onMarkAsNotCompleted={onMarkAsNotCompleted}
                    onQuestionClickIntercept={onQuestionClickIntercept}
                  />
                </div>
              </Section>
            </div>
          )}
        </div>
      </section>
      {/* Right Column */}
      <aside
        className={clsx(
          'hidden h-full flex-col gap-y-10 lg:col-span-1 lg:flex',
          'px-5',
          ['divide-y', themeDivideEmphasizeColor],
        )}>
        {showSummarySection && (
          <QuestionListingAccessSummary {...premiumCount} />
        )}
        <section className="sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]">
          <ScrollArea>
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
          </ScrollArea>
        </section>
      </aside>
    </div>
  );
}
