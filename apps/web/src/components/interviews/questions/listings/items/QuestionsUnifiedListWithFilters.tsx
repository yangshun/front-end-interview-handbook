import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiSearchLine } from 'react-icons/ri';

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
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  countQuestionsTotalDurationMins,
  filterQuestions,
  sortQuestionsMultiple,
  tabulateQuestionsAttributesUnion,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import { FormattedMessage, useIntl } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import TextInput from '~/components/ui/TextInput';
import { themeDivideEmphasizeColor } from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import QuestionsListSortButton from './QuestionsListSortButton';
import useQuestionCodingSorting from '../filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '../filters/hooks/useQuestionUnifiedFilters';
import QuestionListingUnifiedFilters from '../filters/QuestionListingUnifiedFilters';
import QuestionsListingFilterSlideOut from '../filters/QuestionsListingFilterSlideout';
import QuestionCountLabel from '../../metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '../../metadata/QuestionTotalTimeLabel';

type Props = Readonly<{
  categoryTabs?: ReactNode;
  checkIfCompletedQuestionBefore?: (question: QuestionMetadata) => boolean;
  formatFiltersFilterPredicate?: (format: QuestionFormat) => boolean;
  formatFiltersOrderComparator?: (
    a: QuestionFormat,
    b: QuestionFormat,
  ) => number;
  frameworkOrLanguage?: QuestionFrameworkOrLanguage;
  guides?: {
    description: string;
    items: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
    title: string;
  };
  initialFormat?: QuestionFormat | null;
  listMode?: React.ComponentProps<typeof QuestionsList>['mode'];
  listType?: React.ComponentProps<typeof QuestionsList>['listType'];
  mode?: 'default' | 'framework';
  onMarkAsCompleted?: (question: QuestionMetadata) => void;
  onMarkAsNotCompleted?: (question: QuestionMetadata) => void;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  searchPlaceholder?: string;
  sideColumnAddOn?: ReactNode;
}>;

export default function QuestionsUnifiedListWithFilters({
  checkIfCompletedQuestionBefore,
  categoryTabs,
  initialFormat = null,
  frameworkOrLanguage,
  listType,
  listMode,
  mode = 'default',
  questions,
  questionCompletionCount,
  formatFiltersFilterPredicate,
  formatFiltersOrderComparator,
  onMarkAsCompleted,
  onMarkAsNotCompleted,
  searchPlaceholder,
  sideColumnAddOn,
  guides,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

  // Tabulating.
  const questionAttributesUnion = tabulateQuestionsAttributesUnion(questions);

  // Sorting.
  const { sortFields, filterNamespace } = useQuestionCodingSorting({
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
  } = useQuestionUnifiedFilters({
    filterNamespace,
    formatFiltersFilterPredicate,
    formatFiltersOrderComparator,
    initialFormat,
  });

  // Processing.
  const sortedQuestions = sortQuestionsMultiple(questions, sortFields);
  const processedQuestions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );

  const totalDurationMins = countQuestionsTotalDurationMins(processedQuestions);
  const showPaywall =
    !userProfile?.isInterviewsPremium && companyFilters.size > 0;

  const sortAndFilters = (
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0 md:gap-4">
      <div className={clsx('lg:hidden')}>
        <QuestionsListingFilterSlideOut
          attributesUnion={questionAttributesUnion}
          filterNamespace={filterNamespace}
          mode={mode}
        />
      </div>
      <QuestionsListSortButton listType={listType} />
    </div>
  );
  const searchFilterRow = (
    <div className="flex flex-col gap-5 xl:gap-8">
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
                    framework={
                      // TODO(interviews): improve this
                      frameworkOrLanguage !== 'html' &&
                      frameworkOrLanguage !== 'js' &&
                      frameworkOrLanguage !== 'ts' &&
                      frameworkOrLanguage !== 'css'
                        ? frameworkOrLanguage
                        : undefined
                    }
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
          'hidden h-full flex-col lg:col-span-1 lg:flex',
          'px-5',
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
