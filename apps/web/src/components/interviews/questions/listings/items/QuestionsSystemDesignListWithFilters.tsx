import clsx from 'clsx';
import { useState } from 'react';
import { RiFilterLine, RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCompanyFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionCompanyFilter';
import useQuestionCompletionStatusFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionCompletionStatusFilter';
import useQuestionDifficultyFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionDifficultyFilter';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsList from '~/components/interviews/questions/listings/items/QuestionsList';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import SlideOut from '~/components/ui/SlideOut';
import TextInput from '~/components/ui/TextInput';

import useQuestionImportanceFilter from '../filters/hooks/useQuestionImportanceFilter';
import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
import QuestionListingSystemDesignFilters from '../filters/QuestionListingSystemDesignFilters';
import questionMatchesTextQuery from '../filters/questionMatchesTextQuery';
import { allSystemDesignQuestions } from '../../content/system-design/SystemDesignNavigation';

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
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState<QuestionSortField>('difficulty');
  const [difficultyFilters, difficultyFilterOptions] =
    useQuestionDifficultyFilter({ namespace });
  const [importanceFilters, importanceFilterOptions] =
    useQuestionImportanceFilter({ namespace });
  const [companyFilters, companyFilterOptions] = useQuestionCompanyFilter({
    namespace,
  });
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({ namespace });

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
    { field: sortField, isAscendingOrder },
    { field: 'ranking', isAscendingOrder: true },
  ];
  const premiumSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [{ field: 'premium', isAscendingOrder: true }];

  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    allSystemDesignQuestions,
  );

  const sortedQuestions = sortQuestionsMultiple(
    questionsWithCompletionStatus,
    userProfile?.isInterviewsPremium
      ? defaultSortFields
      : // Show free questions first if user is not a premium user.
        defaultSortFields.concat(premiumSortFields),
  );
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
    // Difficulty.
    [difficultyFilters.size, difficultyFilterOptions.matches],
    // Importance.
    [importanceFilters.size, importanceFilterOptions.matches],
    // Company.
    [companyFilters.size, companyFilterOptions.matches],
    // Completion Status.
    [completionStatusFilters.size, completionStatusFilterOptions.matches],
  ];
  const numberOfFilters = filters.filter(([size]) => size > 0).length;
  const processedQuestions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );
  const showPaywall =
    !userProfile?.isInterviewsPremium && companyFilters.size > 0;
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
          <QuestionListingSystemDesignFilters
            companyFilterOptions={companyFilterOptions}
            companyFilters={companyFilters}
            completionStatusFilterOptions={completionStatusFilterOptions}
            completionStatusFilters={completionStatusFilters}
            difficultyFilterOptions={difficultyFilterOptions}
            difficultyFilters={difficultyFilters}
            importanceFilterOptions={importanceFilterOptions}
            importanceFilters={importanceFilters}
            itemGap="spacious"
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
          <QuestionPaywall
            subtitle={intl.formatMessage({
              defaultMessage:
                'Purchase premium to unlock filtering questions by companies.',
              description: 'Subtitle for paywall over company tagging',
              id: 'PWyAGW',
            })}
            title={intl.formatMessage({
              defaultMessage: 'Premium Feature',
              description: 'Header for paywall over company tagging',
              id: 'X55xMA',
            })}
          />
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
              <QuestionListingSystemDesignFilters
                companyFilterOptions={companyFilterOptions}
                companyFilters={companyFilters}
                completionStatusFilterOptions={completionStatusFilterOptions}
                completionStatusFilters={completionStatusFilters}
                difficultyFilterOptions={difficultyFilterOptions}
                difficultyFilters={difficultyFilters}
                importanceFilterOptions={importanceFilterOptions}
                importanceFilters={importanceFilters}
                itemGap="compact"
              />
            </Section>
          </div>
        </aside>
      )}
    </div>
  );
}
