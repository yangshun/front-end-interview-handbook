import clsx from 'clsx';
import { useState } from 'react';
import { RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type { QuestionSortField } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import {
  filterQuestions,
  sortQuestionsMultiple,
  tabulateQuestionsAttributesUnion,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import TextInput from '~/components/ui/TextInput';

import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
import QuestionListingUnifiedFilters from '../filters/QuestionListingUnifiedFilters';
import QuestionsListingFilterSlideOut from '../filters/QuestionsListingFilterSlideout';
import { allSystemDesignQuestions } from '../../content/system-design/InterviewsSystemDesignQuestions';

type Props = Readonly<{
  layout?: 'embedded' | 'full';
  listMode?: 'default' | 'learning-list';
  namespace: string;
}>;

export default function QuestionsSystemDesignListWithFilters({
  namespace,
  listMode = 'default',
  layout = 'full',
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [sortField, setSortField] = useState<QuestionSortField>('difficulty');

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

  const defaultSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [
    { field: 'ranking', isAscendingOrder: true },
    { field: sortField, isAscendingOrder },
  ];
  const premiumSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [{ field: 'premium', isAscendingOrder: true }];

  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    allSystemDesignQuestions,
  );

  // Tabulating.
  const questionAttributesUnion = tabulateQuestionsAttributesUnion(
    allSystemDesignQuestions,
  );

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
    initialFormat: null,
    namespace,
  });

  // Processing.
  const sortedQuestions = sortQuestionsMultiple(
    questionsWithCompletionStatus,
    userProfile?.isInterviewsPremium
      ? defaultSortFields
      : // Show free questions first if user is not a premium user.
        defaultSortFields.concat(premiumSortFields),
  );

  const processedQuestions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );

  const showPaywall =
    !userProfile?.isInterviewsPremium && companyFilters.size > 0;

  const sortAndFilters = (
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0">
      <div className={clsx(layout === 'full' && 'lg:hidden')}>
        <QuestionsListingFilterSlideOut
          attributesUnion={questionAttributesUnion}
          mode="default"
          namespace={namespace}
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
        ].map((props) => (
          <DropdownMenu.Item key={props.label} {...props} />
        ))}
      </DropdownMenu>
    </div>
  );

  return (
    <div
      className={clsx(
        layout === 'full' && 'lg:grid lg:grid-cols-10 lg:gap-x-8',
      )}>
      <section className="space-y-6 lg:col-span-7 lg:mt-0">
        <div className="flex flex-col justify-end gap-2 pb-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <TextInput
              autoComplete="off"
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Search system design questions',
                description:
                  'Placeholder for search input of system design question list',
                id: 'BgJTSk',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search system design questions',
                description:
                  'Placeholder for search input of system design question list',
                id: 'BgJTSk',
              })}
              size="sm"
              startIcon={RiSearchLine}
              value={query}
              onChange={(value) => setQuery(value)}
            />
          </div>
          {sortAndFilters}
        </div>
        {showPaywall ? (
          <div className="relative">
            <div
              className={clsx(
                'min-h-[500px]',
                'pointer-events-none touch-none select-none',
              )}
              // So that focus cannot go into the card, which is not meant to be used.
              {...{ inert: '' }}>
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
                description="Screenreader text for question list"
                id="CrNgUe"
              />
            </Heading>
            <Section>
              <QuestionsList
                checkIfCompletedQuestion={(question) => question.isCompleted}
                mode={listMode}
                questions={processedQuestions}
              />
            </Section>
          </div>
        )}
      </section>
      {layout === 'full' && (
        <aside className="hidden h-full flex-col gap-y-10 lg:col-span-3 lg:flex">
          <div>
            <Heading className="sr-only" level="custom">
              <FormattedMessage
                defaultMessage="Filters"
                description="Screenreader text for Filters"
                id="Gi1TRd"
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
                mode="default"
                topicFilterOptions={topicFilterOptions}
                topicFilters={topicFilters}
              />
            </Section>
          </div>
        </aside>
      )}
    </div>
  );
}
