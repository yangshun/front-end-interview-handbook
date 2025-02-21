import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';

import VignetteOverlay from '~/components/common/VignetteOverlay';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { GuideCardMetadataWithCompletedStatus } from '~/components/guides/types';
import InterviewsGuideCard from '~/components/interviews/guides/InterviewsGuideCard';
import InterviewsPurchasePaywall from '~/components/interviews/purchase/InterviewsPurchasePaywall';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  countQuestionsTotalDurationMins,
  filterQuestions,
  sortQuestionsMultiple,
  tabulateQuestionsAttributesUnion,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeDivideEmphasizeColor } from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import QuestionsListSortButton from './QuestionsListSortButton';
import useQuestionCodingSorting from '../filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '../filters/hooks/useQuestionUnifiedFilters';
import QuestionListFilterFormats from '../filters/QuestionListingFilterFormats';
import QuestionListingUnifiedFilters from '../filters/QuestionListingUnifiedFilters';
import QuestionsListingFilterSlideOut from '../filters/QuestionsListingFilterSlideout';
import QuestionCountLabel from '../../metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '../../metadata/QuestionTotalTimeLabel';

import NumberFlow from '@number-flow/react';

type Props = Readonly<{
  categoryTabs?: ReactNode;
  checkIfCompletedQuestionBefore?: (question: QuestionMetadata) => boolean;
  formatFiltersFilterPredicate?: (format: QuestionFormat) => boolean;
  formatFiltersOrderComparator?: (
    a: QuestionFormat,
    b: QuestionFormat,
  ) => number;
  // Framework?: QuestionFramework;
  guides?: {
    description: string;
    items: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
    title: string;
  };
  initialFormat?: QuestionFormat | null;
  listMode?: React.ComponentProps<typeof QuestionsList>['mode'];
  listType?: React.ComponentProps<typeof QuestionsList>['listType'];
  // Mode?: 'default' | 'framework';
  onMarkAsCompleted?: (question: QuestionMetadata) => void;
  onMarkAsNotCompleted?: (question: QuestionMetadata) => void;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  searchPlaceholder?: string;
  showCount_TEMPORARY?: boolean;
  sideColumnAddOn?: ReactNode;
}>;

export default function QuestionsUnifiedListWithFilters({
  checkIfCompletedQuestionBefore,
  categoryTabs,
  initialFormat = null,
  listType,
  listMode,
  questions,
  questionCompletionCount,
  formatFiltersFilterPredicate,
  formatFiltersOrderComparator,
  onMarkAsCompleted,
  onMarkAsNotCompleted,
  searchPlaceholder,
  showCount_TEMPORARY = true,
  sideColumnAddOn,
  guides,
}: Props) {
  const intl = useIntl();
  const framework =
    listType?.type === 'framework' ? listType?.value : undefined;
  const { userProfile } = useUserProfile();

  // Tabulating.
  const questionAttributesUnion = tabulateQuestionsAttributesUnion(questions);

  // Sorting.
  const { sortFields } = useQuestionCodingSorting({
    listType,
  });

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
    clearAllFilters,
  } = useQuestionUnifiedFilters({
    formatFiltersFilterPredicate,
    formatFiltersOrderComparator,
    initialFormat,
    listType,
  });

  // Add the search query in the active filter count
  const numberOfFilters =
    filters.filter(([size]) => size > 0).length + (query.length > 0 ? 1 : 0);

  // Processing
  const filteredQuestions = filterQuestions(
    questions,
    filters.map(([_, filterFn]) => filterFn),
  );
  const processedQuestions = sortQuestionsMultiple(
    filteredQuestions,
    sortFields,
  );

  const totalDurationMins = countQuestionsTotalDurationMins(processedQuestions);
  const showPaywall =
    !userProfile?.isInterviewsPremium && companyFilters.size > 0;

  const sortAndFilters = (
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0 md:gap-4">
      <div className={clsx('min-[1200px]:hidden')}>
        <QuestionsListingFilterSlideOut
          attributesUnion={questionAttributesUnion}
          listType={listType}
        />
      </div>
      <QuestionsListSortButton listType={listType} />
    </div>
  );
  const searchFilterRow = (
    <div className="flex flex-col gap-5 xl:gap-6">
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
              intl.formatMessage({
                defaultMessage: 'Search within this list of questions',
                description: 'Placeholder for search input of question list',
                id: 'WUBRnN',
              })
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
      {questionAttributesUnion.formats.size > 1 && (
        <QuestionListFilterFormats
          formatFilterOptions={formatFilterOptions}
          formatFilters={formatFilters}
          formatFiltersUnion={questionAttributesUnion.formats}
        />
      )}
    </div>
  );
  const listMetadata = (
    <div className="flex gap-x-4 sm:gap-x-10">
      {showCount_TEMPORARY && (
        <QuestionCountLabel count={processedQuestions.length} showIcon={true} />
      )}
      {totalDurationMins > 0 && (
        <QuestionTotalTimeLabel mins={totalDurationMins} showIcon={true} />
      )}
    </div>
  );

  const filterApplied = (
    <div className={clsx('flex items-center gap-0.5', '-my-1 -mr-1')}>
      <Text color="secondary" size="body3">
        <FormattedMessage
          defaultMessage="{count, plural, =0 {<bold>#</bold> filters} =1 {<bold>#</bold> filter} other {<bold>#</bold> filters}} applied"
          description="Number of applied filters"
          id="oafz//"
          values={{
            bold: () => (
              <Text color="subtitle" size="body2" weight="bold">
                <NumberFlow value={numberOfFilters} />
              </Text>
            ),
            count: numberOfFilters,
          }}
        />
      </Text>
      <Button
        icon={RiCloseLine}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Reset filters',
          description: 'Label for reset filter button',
          id: 'L3y2pt',
        })}
        size="xs"
        tooltip={intl.formatMessage({
          defaultMessage: 'Reset filters',
          description: 'Label for reset filter button',
          id: 'L3y2pt',
        })}
        variant="tertiary"
        onClick={clearAllFilters}
      />
    </div>
  );

  return (
    <div
      className={clsx(
        'min-[1200px]:grid min-[1200px]:grid-cols-3 min-[1200px]:gap-x-6',
      )}>
      {/* Left Column */}
      <section className="flex flex-col gap-8 lg:col-span-2">
        <div className="flex flex-col gap-8">{searchFilterRow}</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {listMetadata}
            {numberOfFilters > 0 && filterApplied}
          </div>
          {showPaywall ? (
            <VignetteOverlay
              className="max-h-[500px] md:max-h-none"
              overlay={
                <InterviewsPurchasePaywall
                  background="vignette"
                  premiumFeature="company-tags"
                />
              }
              overlayClass="top-8 sm:top-16 md:top-24">
              <div
                className="border-lg pointer-events-none min-h-[450px] touch-none select-none"
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
                  {guides && (
                    <InterviewsGuideCard
                      key={guides.items.length}
                      data={guides}
                    />
                  )}
                  <QuestionsList
                    checkIfCompletedQuestion={(question) =>
                      question.isCompleted
                    }
                    checkIfCompletedQuestionBefore={
                      checkIfCompletedQuestionBefore
                    }
                    framework={framework}
                    listType={listType}
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
      <aside
        className={clsx(
          'hidden flex-col min-[1200px]:col-span-1 min-[1200px]:flex',
          'h-full',
          'pl-5',
          'gap-6',
        )}>
        {sideColumnAddOn}
        <section
          className={clsx(
            'sticky top-[var(--global-sticky-height)] -mt-6 h-[calc(100vh_-_var(--global-sticky-height))]',
            'flex-col gap-y-10 lg:flex',
            ['divide-y', themeDivideEmphasizeColor],
          )}>
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
                frameworkFilterOptions={frameworkFilterOptions}
                frameworkFilters={frameworkFilters}
                importanceFilterOptions={importanceFilterOptions}
                importanceFilters={importanceFilters}
                languageFilterOptions={languageFilterOptions}
                languageFilters={languageFilters}
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
