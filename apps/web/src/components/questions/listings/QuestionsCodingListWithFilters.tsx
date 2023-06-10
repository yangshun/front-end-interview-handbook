import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionCodingFormat,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
} from '~/components/questions/common/QuestionsTypes';
import QuestionListingFilterSectionDesktop from '~/components/questions/listings/QuestionListingFilterSectionDesktop';
import QuestionListingFilterSectionMobile from '~/components/questions/listings/QuestionListingFilterSectionMobile';
import QuestionListingSquareFilterSectionDesktop from '~/components/questions/listings/QuestionListingSquareFilterSectionDesktop';
import QuestionsList from '~/components/questions/listings/QuestionsList';
import useQuestionCodingFormatFilter from '~/components/questions/listings/useQuestionCodingFormatFilter';
import useQuestionCompanyFilter from '~/components/questions/listings/useQuestionCompanyFilter';
import useQuestionCompletionStatusFilter from '~/components/questions/listings/useQuestionCompletionStatusFilter';
import useQuestionDifficultyFilter from '~/components/questions/listings/useQuestionDifficultyFilter';
import useQuestionLanguageFilter from '~/components/questions/listings/useQuestionLanguageFilter';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import questionMatchesTextQuery from './questionMatchesTextQuery';
import useQuestionFrameworkFilter from './useQuestionFrameworkFilter';
import useQuestionsWithCompletionStatus from './useQuestionsWithCompletionStatus';
import type { QuestionFramework } from '../common/QuestionsTypes';

import { BarsArrowDownIcon, PlusIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type Props = Readonly<{
  codingFormatFiltersFilterPredicate?: (
    format: QuestionCodingFormat,
  ) => boolean;
  codingFormatFiltersOrderComparator?: (
    a: QuestionCodingFormat,
    b: QuestionCodingFormat,
  ) => number;
  framework?: QuestionFramework;
  initialCodingFormat?: QuestionCodingFormat | null;
  layout?: 'embedded' | 'full';
  mode?: 'default' | 'framework';
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadata>;
  sideColumnAddOn?: ReactNode;
}>;

export default function QuestionsCodingListWithFilters({
  initialCodingFormat = null,
  framework,
  layout = 'full',
  mode = 'default',
  questions,
  questionCompletionCount,
  codingFormatFiltersFilterPredicate,
  codingFormatFiltersOrderComparator,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState<QuestionSortField>('difficulty');
  const [difficultyFilters, difficultyFilterOptions] =
    useQuestionDifficultyFilter({
      userFacingFormat: 'coding',
    });

  const [companyFilters, companyFilterOptions] = useQuestionCompanyFilter({
    userFacingFormat: 'coding',
  });
  const [languageFilters, languageFilterOptions] = useQuestionLanguageFilter({
    userFacingFormat: 'coding',
  });
  const [frameworkFilters, frameworkFilterOptions] = useQuestionFrameworkFilter(
    {
      userFacingFormat: 'coding',
    },
  );
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({
      userFacingFormat: 'coding',
    });
  const [codingFormatFilters, codingFormatFilterOptions] =
    useQuestionCodingFormatFilter({
      filter: codingFormatFiltersFilterPredicate,
      initialValue: initialCodingFormat == null ? [] : [initialCodingFormat],
      order: codingFormatFiltersOrderComparator,
      userFacingFormat: 'coding',
    });

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

  const questionsWithCompletionStatus =
    useQuestionsWithCompletionStatus(questions);

  const sortedQuestions = sortQuestionsMultiple(
    questionsWithCompletionStatus,
    userProfile?.isPremium
      ? defaultSortFields
      : // Show free questions first if user is not a premium user.
        defaultSortFields.concat(premiumSortFields),
  );
  const filters: ReadonlyArray<
    [number, (question: QuestionMetadataWithCompletedStatus) => boolean]
  > = [
    // Query.
    [0, (question) => questionMatchesTextQuery(question, query)],
    // Difficulty.
    [difficultyFilters.size, difficultyFilterOptions.matches],
    // Company.
    [companyFilters.size, companyFilterOptions.matches],
    // Language.
    [languageFilters.size, languageFilterOptions.matches],
    // Coding Format.
    [codingFormatFilters.size, codingFormatFilterOptions.matches],
    // Framework.
    [frameworkFilters.size, frameworkFilterOptions.matches],
    // Completion Status.
    [completionStatusFilters.size, completionStatusFilterOptions.matches],
  ];
  const numberOfFilters = filters.filter(([size]) => size > 0).length;
  const processedQuestions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );
  const showPaywall = !userProfile?.isPremium && companyFilters.size > 0;
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
          <QuestionListingFilterSectionMobile
            section={companyFilterOptions}
            values={companyFilters}
          />
          <QuestionListingFilterSectionMobile
            section={codingFormatFilterOptions}
            values={codingFormatFilters}
          />
          <QuestionListingFilterSectionMobile
            section={difficultyFilterOptions}
            values={difficultyFilters}
          />
          {mode !== 'framework' && (
            <QuestionListingFilterSectionMobile
              section={frameworkFilterOptions}
              values={frameworkFilters}
            />
          )}
          <QuestionListingFilterSectionMobile
            section={languageFilterOptions}
            values={languageFilters}
          />
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
  const squareFilters = (
    <div className="shrink-0">
      <QuestionListingSquareFilterSectionDesktop
        itemsPerRow={3}
        section={codingFormatFilterOptions}
        values={codingFormatFilters}
      />
    </div>
  );

  return (
    <div
      className={clsx(
        layout === 'full' && 'lg:grid lg:grid-cols-10 lg:gap-x-8',
      )}>
      <section className="space-y-6 lg:col-span-7 lg:mt-0">
        <div className="flex flex-col justify-end gap-2 border-b border-neutral-200 pb-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <TextInput
              autoComplete="off"
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Search coding questions',
                description:
                  'Placeholder for search input of coding question list',
                id: 'jGQnYd',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search coding questions',
                description:
                  'Placeholder for search input of coding question list',
                id: 'jGQnYd',
              })}
              size="sm"
              startIcon={MagnifyingGlassIcon}
              value={query}
              onChange={(value) => setQuery(value)}
            />
          </div>
          {sortAndFilters}
        </div>
        {mode === 'default' && (
          <div className="hidden sm:block">{squareFilters}</div>
        )}
        {showPaywall ? (
          <QuestionPaywall
            subtitle={intl.formatMessage({
              defaultMessage:
                'Purchase premium to unlock filtering questions by companies.',
              description:
                'Subtitle on paywall over company tags on question list pages',
              id: 'RxZwQ9',
            })}
            title={intl.formatMessage({
              defaultMessage: 'Premium Feature',
              description:
                'Header on paywall over company tags on question list pages',
              id: 'LNK1eb',
            })}
          />
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
              <QuestionsList
                checkIfCompletedQuestion={(question) => question.isCompleted}
                framework={framework}
                questionCompletionCount={questionCompletionCount}
                questions={processedQuestions}
                showChevron={true}
              />
            </Section>
          </div>
        )}
        <Text color="secondary" display="block" variant="body3">
          <Anchor href="https://clearbit.com" variant="flat">
            <FormattedMessage
              defaultMessage="Logos provided by Clearbit"
              description="Attribution text at the end of question lists indicating that the logos were sourced by Clearbit"
              id="yXh24P"
            />
          </Anchor>
        </Text>
      </section>
      {layout === 'full' && (
        <aside className="hidden h-full flex-col gap-y-8 border-l border-neutral-200 pl-8 lg:col-span-3 lg:flex">
          <Heading className="sr-only" level="custom">
            <FormattedMessage
              defaultMessage="Filters"
              description="Screenreader text indicating the filters component on question list pages"
              id="GyDKzV"
            />
          </Heading>
          <Section>
            <form className="flex flex-col gap-y-6">
              <QuestionListingFilterSectionDesktop
                isFirstSection={true}
                section={companyFilterOptions}
                values={companyFilters}
              />
              <QuestionListingFilterSectionDesktop
                section={difficultyFilterOptions}
                values={difficultyFilters}
              />
              {mode !== 'framework' && (
                <QuestionListingFilterSectionDesktop
                  section={frameworkFilterOptions}
                  values={frameworkFilters}
                />
              )}
              <QuestionListingFilterSectionDesktop
                section={languageFilterOptions}
                values={languageFilters}
              />
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
