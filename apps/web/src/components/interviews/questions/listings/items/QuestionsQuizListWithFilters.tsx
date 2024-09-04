import clsx from 'clsx';
import { useState } from 'react';
import { RiFilterLine, RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCompletionStatusFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionCompletionStatusFilter';
import useQuestionTopicFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionTopicFilter';
import QuestionListingTopicFilters from '~/components/interviews/questions/listings/filters/QuestionListingTopicFilters';
import {
  countQuestionsTotalDurationMins,
  filterQuestions,
  sortQuestionsMultiple,
  tabulateQuestionsAttributesUnion,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import SlideOut from '~/components/ui/SlideOut';
import TextInput from '~/components/ui/TextInput';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import useQuestionImportanceFilter from '../filters/hooks/useQuestionImportanceFilter';
import QuestionListingQuizFilters from '../filters/QuestionListingQuizFilters';
import questionMatchesTextQuery from '../filters/questionMatchesTextQuery';
import QuestionTotalTimeLabel from '../../metadata/QuestionTotalTimeLabel';

export type Props = Readonly<{
  checkIfCompletedQuestionBefore?: (question: QuestionMetadata) => boolean;
  layout?: 'embedded' | 'full';
  listKey?: string;
  listMode?: 'default' | 'learning-list';
  namespace: string;
  onMarkAsCompleted?: (question: QuestionMetadata) => void;
  onMarkAsNotCompleted?: (question: QuestionMetadata) => void;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
}>;

export default function QuestionsQuizListWithFilters({
  checkIfCompletedQuestionBefore,
  listKey,
  layout = 'full',
  listMode = 'default',
  onMarkAsCompleted,
  onMarkAsNotCompleted,
  namespace,
  questions,
  questionCompletionCount,
}: Props) {
  const intl = useIntl();
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState<QuestionSortField>('importance');
  const [quizTopicFilters, quizTopicFilterOptions] = useQuestionTopicFilter({
    namespace,
  });
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({ namespace });
  const [importanceFilters, importanceFilterOptions] =
    useQuestionImportanceFilter({ namespace });

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

  // Tabulating.
  const questionAttributesUnion = tabulateQuestionsAttributesUnion(questions);

  // Processing.
  const sortedQuestions = sortQuestionsMultiple(questions, [
    { field: 'ranking', isAscendingOrder: true },
    { field: sortField, isAscendingOrder },
  ]);
  const filters: ReadonlyArray<
    [
      number,
      (
        question: QuestionMetadata & QuestionMetadataWithCompletedStatus,
      ) => boolean,
    ]
  > = [
    // Query.
    [0, (question) => questionMatchesTextQuery(question, query)],
    // Topics.
    [quizTopicFilters.size, quizTopicFilterOptions.matches],
    // Completion Status.
    [completionStatusFilters.size, completionStatusFilterOptions.matches],
  ];
  const numberOfFilters = filters.filter(([size]) => size > 0).length;
  const processedQuestions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );
  const totalDurationMins = countQuestionsTotalDurationMins(processedQuestions);
  const sortAndFilters = (
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0">
      <div className={clsx(layout === 'full' && 'lg:hidden')}>
        <SlideOut
          size="sm"
          title={intl.formatMessage({
            defaultMessage: 'Filters',
            description: 'Label for filters button',
            id: 'k2Oi+j',
          })}
          trigger={
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
              purpose="button"
              selected={numberOfFilters > 0}
              size="sm"
            />
          }>
          <QuestionListingQuizFilters
            attributesUnion={questionAttributesUnion}
            completionStatusFilterOptions={completionStatusFilterOptions}
            completionStatusFilters={completionStatusFilters}
            importanceFilterOptions={importanceFilterOptions}
            importanceFilters={importanceFilters}
            quizTopicFilterOptions={quizTopicFilterOptions}
            quizTopicFilters={quizTopicFilters}
          />
        </SlideOut>
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
              defaultMessage: 'Importance: High to Low',
              description:
                'Sorting option on quiz questions page - from High to Low',
              id: 'hoQUfU',
            }),
            'importance',
            false,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Importance: Low to High',
              description:
                'Sorting option on quiz questions page - from Low to High',
              id: 'ZX2n3I',
            }),
            'importance',
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
        ].map((props) => (
          <DropdownMenu.Item key={props.label} {...props} />
        ))}
      </DropdownMenu>
    </div>
  );
  const topicFilters = (
    <QuestionListingTopicFilters
      section={quizTopicFilterOptions}
      values={quizTopicFilters}
    />
  );
  const searchFilterRow = (
    <div className={clsx('flex justify-end gap-2')}>
      <div className="flex-1">
        <TextInput
          autoComplete="off"
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Search quiz questions',
            description: 'Placeholder for search input of quiz question list',
            id: 'YbRLG7',
          })}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search quiz questions',
            description: 'Placeholder for search input of quiz question list',
            id: 'YbRLG7',
          })}
          size="sm"
          startIcon={RiSearchLine}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>
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
        layout === 'full' && 'lg:grid lg:grid-cols-10 lg:gap-x-6',
      )}>
      {/* Left Column */}
      <section className="flex flex-col gap-6 lg:col-span-7">
        <div className="flex flex-col gap-4">
          {topicFilters}
          {searchFilterRow}
        </div>
        <div className="flex flex-col gap-4">
          {listMetadata}
          <div>
            <Heading className="sr-only" level="custom">
              <FormattedMessage
                defaultMessage="Questions List"
                description="Screenreader text for quiz questions list"
                id="AYkO94"
              />
            </Heading>
            <Section>
              <QuestionsList
                checkIfCompletedQuestion={(question) => question.isCompleted}
                checkIfCompletedQuestionBefore={checkIfCompletedQuestionBefore}
                listKey={listKey}
                mode={listMode}
                primaryLabel="importance"
                questionCompletionCount={questionCompletionCount}
                questions={processedQuestions}
                onMarkAsCompleted={onMarkAsCompleted}
                onMarkAsNotCompleted={onMarkAsNotCompleted}
              />
            </Section>
          </div>
        </div>
      </section>
      {/* Right Column */}
      {layout === 'full' && (
        <aside
          className={clsx(
            'hidden h-full flex-col gap-y-10 lg:col-span-3 lg:flex',
          )}>
          <Heading className="sr-only" level="custom">
            <FormattedMessage
              defaultMessage="Filters"
              description="Screenreader text to indicate filters component on quiz questions list"
              id="knfvnJ"
            />
          </Heading>
          <Section>
            <QuestionListingQuizFilters
              attributesUnion={questionAttributesUnion}
              completionStatusFilterOptions={completionStatusFilterOptions}
              completionStatusFilters={completionStatusFilters}
              importanceFilterOptions={importanceFilterOptions}
              importanceFilters={importanceFilters}
              quizTopicFilterOptions={quizTopicFilterOptions}
              quizTopicFilters={quizTopicFilters}
            />
          </Section>
        </aside>
      )}
    </div>
  );
}
