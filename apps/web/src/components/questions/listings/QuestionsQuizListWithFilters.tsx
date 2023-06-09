import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionMetadataWithCompletedStatus,
  QuestionQuizMetadata,
  QuestionSortField,
} from '~/components/questions/common/QuestionsTypes';
import QuestionListingFilterSectionDesktop from '~/components/questions/listings/QuestionListingFilterSectionDesktop';
import QuestionListingFilterSectionMobile from '~/components/questions/listings/QuestionListingFilterSectionMobile';
import QuestionListingSquareFilterSectionDesktop from '~/components/questions/listings/QuestionListingSquareFilterSectionDesktop';
import QuestionsQuizList from '~/components/questions/listings/QuestionsQuizList';
import useQuestionCompletionStatusFilter from '~/components/questions/listings/useQuestionCompletionStatusFilter';
import useQuestionQuizTopicFilter from '~/components/questions/listings/useQuestionQuizTopicFilter';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import SlideOut from '~/components/ui/SlideOut';
import TextInput from '~/components/ui/TextInput';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import questionMatchesTextQuery from './questionMatchesTextQuery';
import useQuestionsWithCompletionStatus from './useQuestionsWithCompletionStatus';

import { BarsArrowDownIcon, PlusIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type Props = Readonly<{
  layout?: 'embedded' | 'full';
  mode?: 'default' | 'topic';
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionQuizMetadata>;
}>;

export default function QuestionsQuizListWithFilters({
  layout = 'full',
  mode = 'default',
  questions,
  questionCompletionCount,
}: Props) {
  const intl = useIntl();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState<QuestionSortField>('importance');
  const [quizTopicFilters, quizTopicFilterOptions] = useQuestionQuizTopicFilter(
    { userFacingFormat: 'quiz' },
  );
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({ userFacingFormat: 'quiz' });

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

  const questionsWithCompletionStatus =
    useQuestionsWithCompletionStatus(questions);

  const sortedQuestions = sortQuestionsMultiple(questionsWithCompletionStatus, [
    { field: 'ranking', isAscendingOrder: true },
    { field: sortField, isAscendingOrder },
  ]);
  const filters: ReadonlyArray<
    [
      number,
      (
        question: QuestionMetadataWithCompletedStatus & QuestionQuizMetadata,
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
  const sortAndFilters = (
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0">
      <div>
        <Button
          icon={PlusIcon}
          label={
            intl.formatMessage({
              defaultMessage: 'Filters',
              description: 'Label for filters button',
              id: 'k2Oi+j',
            }) + (numberOfFilters > 0 ? ` (${numberOfFilters})` : '')
          }
          size="sm"
          type="button"
          variant="secondary"
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>
      <SlideOut
        isShown={mobileFiltersOpen}
        size="sm"
        title={intl.formatMessage({
          defaultMessage: 'Filters',
          description: 'Label for filters button',
          id: 'k2Oi+j',
        })}
        onClose={() => {
          setMobileFiltersOpen(false);
        }}>
        <form className="mt-4">
          {mode !== 'topic' && (
            <QuestionListingFilterSectionMobile
              section={quizTopicFilterOptions}
              values={quizTopicFilters}
            />
          )}
          <QuestionListingFilterSectionMobile
            section={completionStatusFilterOptions}
            values={completionStatusFilters}
          />
        </form>
      </SlideOut>
      <DropdownMenu
        align="end"
        icon={BarsArrowDownIcon}
        label={intl.formatMessage({
          defaultMessage: 'Sort By',
          description: 'Label for sort button',
          id: 'oQiKcl',
        })}
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
  const squareFilters = (
    <QuestionListingSquareFilterSectionDesktop
      itemsPerRow={5}
      section={quizTopicFilterOptions}
      values={quizTopicFilters}
    />
  );
  const squareFiltersEmbedded = (
    <QuestionListingSquareFilterSectionDesktop
      itemsPerRow={4}
      limit={3}
      section={quizTopicFilterOptions}
      values={quizTopicFilters}
    />
  );

  return (
    <div
      className={clsx(
        layout === 'full' && 'lg:grid lg:grid-cols-10 lg:gap-x-8',
      )}>
      <section className="space-y-6 lg:col-span-7 lg:mt-0">
        {layout === 'embedded' ? (
          <div className="flex items-center justify-between gap-8">
            <div className="hidden sm:block">
              {mode === 'default' && squareFiltersEmbedded}
            </div>
            {sortAndFilters}
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-end gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <TextInput
                  autoComplete="off"
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'Search quiz questions',
                    description:
                      'Placeholder for search input of quiz question list',
                    id: 'YbRLG7',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Search quiz questions',
                    description:
                      'Placeholder for search input of quiz question list',
                    id: 'YbRLG7',
                  })}
                  size="sm"
                  startIcon={MagnifyingGlassIcon}
                  value={query}
                  onChange={(value) => setQuery(value)}
                />
              </div>
              {sortAndFilters}
            </div>
            <div className="hidden sm:block">{squareFilters}</div>
          </>
        )}
        <div>
          <Heading className="sr-only" level="custom">
            <FormattedMessage
              defaultMessage="Questions List"
              description="Screenreader text for quiz questions list"
              id="AYkO94"
            />
          </Heading>
          <Section>
            <QuestionsQuizList
              checkIfCompletedQuestion={(question) => question.isCompleted}
              questionCompletionCount={questionCompletionCount}
              questions={processedQuestions}
              showChevron={true}
            />
          </Section>
        </div>
      </section>
      {layout === 'full' && (
        <aside className="hidden h-full flex-col gap-y-8 border-l border-slate-200 pl-8 lg:col-span-3 lg:flex">
          <Heading className="sr-only" level="custom">
            <FormattedMessage
              defaultMessage="Filters"
              description="Screenreader text to indicate filters component on quiz questions list"
              id="knfvnJ"
            />
          </Heading>
          <Section>
            <form className="flex flex-col gap-y-6">
              {mode !== 'topic' && (
                <QuestionListingFilterSectionDesktop
                  isFirstSection={true}
                  section={quizTopicFilterOptions}
                  values={quizTopicFilters}
                />
              )}
              <QuestionListingFilterSectionDesktop
                section={completionStatusFilterOptions}
                values={completionStatusFilters}
              />
            </form>
          </Section>
        </aside>
      )}
    </div>
  );
}
