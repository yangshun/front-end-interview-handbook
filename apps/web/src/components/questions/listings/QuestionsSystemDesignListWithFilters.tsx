import clsx from 'clsx';
import { useState } from 'react';
import { RiAddLine, RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
} from '~/components/questions/common/QuestionsTypes';
import QuestionListingFilterSectionDesktop from '~/components/questions/listings/QuestionListingFilterSectionDesktop';
import QuestionListingFilterSectionMobile from '~/components/questions/listings/QuestionListingFilterSectionMobile';
import QuestionsList from '~/components/questions/listings/QuestionsList';
import useQuestionCompanyFilter from '~/components/questions/listings/useQuestionCompanyFilter';
import useQuestionCompletionStatusFilter from '~/components/questions/listings/useQuestionCompletionStatusFilter';
import useQuestionDifficultyFilter from '~/components/questions/listings/useQuestionDifficultyFilter';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeLineColor } from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import questionMatchesTextQuery from './questionMatchesTextQuery';
import useQuestionsWithCompletionStatus from './useQuestionsWithCompletionStatus';
import { allSystemDesignQuestions } from '../content/system-design/SystemDesignNavigation';

type Props = Readonly<{
  layout?: 'embedded' | 'full';
}>;

export default function QuestionsSystemDesignListWithFilters({
  layout = 'full',
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState<QuestionSortField>('difficulty');
  const [difficultyFilters, difficultyFilterOptions] =
    useQuestionDifficultyFilter({ userFacingFormat: 'system-design' });
  const [companyFilters, companyFilterOptions] = useQuestionCompanyFilter({
    userFacingFormat: 'system-design',
  });
  const [completionStatusFilters, completionStatusFilterOptions] =
    useQuestionCompletionStatusFilter({ userFacingFormat: 'system-design' });

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

  const { data: questionProgress } = trpc.questionProgress.getAll.useQuery();
  const completedQuestions = new Set(
    (questionProgress ?? []).map(({ format, slug }) =>
      hashQuestion(format, slug),
    ),
  );
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

  const sortedQuestions = sortQuestionsMultiple(
    questionsWithCompletionStatus,
    userProfile?.isPremium
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
  const showPaywall = !userProfile?.isPremium && companyFilters.size > 0;
  const sortAndFilters = (
    <div className="flex justify-end gap-2 sm:pt-0">
      <div className={clsx(layout === 'full' && 'lg:hidden')}>
        <Button
          icon={RiAddLine}
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
            section={difficultyFilterOptions}
            values={difficultyFilters}
          />
          <QuestionListingFilterSectionMobile
            section={companyFilterOptions}
            values={companyFilters}
          />
          <QuestionListingFilterSectionMobile
            section={completionStatusFilterOptions}
            values={completionStatusFilters}
          />
        </form>
      </SlideOut>
      <DropdownMenu
        align="end"
        icon={RiSortDesc}
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
                questions={processedQuestions}
                showChevron={true}
              />
            </Section>
          </div>
        )}
        <Text color="secondary" display="block" size="body3">
          <Anchor href="https://clearbit.com" variant="flat">
            <FormattedMessage
              defaultMessage="Logos provided by Clearbit"
              description="Attribution text that company logos were provided by Clearbit"
              id="WzDhJE"
            />
          </Anchor>
        </Text>
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
                <QuestionListingFilterSectionDesktop
                  section={completionStatusFilterOptions}
                  values={completionStatusFilters}
                />
              </form>
            </Section>
          </div>
        </aside>
      )}
    </div>
  );
}
