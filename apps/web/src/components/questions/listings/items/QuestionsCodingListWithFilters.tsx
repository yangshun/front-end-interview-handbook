import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { RiFilterLine, RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import {
  countQuestionsByDifficulty,
  countQuestionsByPremium,
  countQuestionsTotalDurationMins,
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionCodingFormat,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionSortField,
} from '~/components/questions/common/QuestionsTypes';
import useQuestionCodingFormatFilter from '~/components/questions/listings/filters/hooks/useQuestionCodingFormatFilter';
import useQuestionCompanyFilter from '~/components/questions/listings/filters/hooks/useQuestionCompanyFilter';
import useQuestionCompletionStatusFilter from '~/components/questions/listings/filters/hooks/useQuestionCompletionStatusFilter';
import useQuestionDifficultyFilter from '~/components/questions/listings/filters/hooks/useQuestionDifficultyFilter';
import useQuestionFrameworkFilter from '~/components/questions/listings/filters/hooks/useQuestionFrameworkFilter';
import useQuestionLanguageFilter from '~/components/questions/listings/filters/hooks/useQuestionLanguageFilter';
import QuestionListingTopicFilters from '~/components/questions/listings/filters/QuestionListingTopicFilters';
import QuestionsList from '~/components/questions/listings/items/QuestionsList';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Popover from '~/components/ui/Popover';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import QuestionFilterButton from '../filters/QuestionFilterButton';
import QuestionListingCodingFilters from '../filters/QuestionListingCodingFilters';
import questionMatchesTextQuery from '../questionMatchesTextQuery';
import QuestionListingSummarySection from '../stats/QuestionListingSummarySection';
import type { QuestionFramework } from '../../common/QuestionsTypes';
import QuestionCountLabel from '../../metadata/QuestionCountLabel';
import QuestionTotalTimeLabel from '../../metadata/QuestionTotalTimeLabel';

export type Props = Readonly<{
  checkIfCompletedQuestionBefore?: (question: QuestionMetadata) => boolean;
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
  listKey?: string;
  mode?: 'default' | 'framework';
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  sideColumnAddOn?: ReactNode;
}>;

export default function QuestionsCodingListWithFilters({
  checkIfCompletedQuestionBefore,
  initialCodingFormat = null,
  framework,
  layout = 'full',
  listKey,
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

  const sortedQuestions = sortQuestionsMultiple(
    questions,
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
  const difficultyCount = countQuestionsByDifficulty(processedQuestions);
  const premiumCount = countQuestionsByPremium(processedQuestions);
  const totalDurationMins = countQuestionsTotalDurationMins(processedQuestions);
  const showPaywall = !userProfile?.isPremium && companyFilters.size > 0;

  const sortAndFilters = (
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0">
      <div className={clsx(layout === 'full' && 'lg:hidden')}>
        <QuestionFilterButton
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
        <QuestionListingCodingFilters
          codingFormatFilterOptions={codingFormatFilterOptions}
          codingFormatFilters={codingFormatFilters}
          companyFilterOptions={companyFilterOptions}
          companyFilters={companyFilters}
          completionStatusFilterOptions={completionStatusFilterOptions}
          completionStatusFilters={completionStatusFilters}
          difficultyFilterOptions={difficultyFilterOptions}
          difficultyFilters={difficultyFilters}
          frameworkFilterOptions={frameworkFilterOptions}
          frameworkFilters={frameworkFilters}
          itemGap="spacious"
          languageFilterOptions={languageFilterOptions}
          languageFilters={languageFilters}
          mode={mode}
        />
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
  const topicFilters = (
    <QuestionListingTopicFilters
      section={codingFormatFilterOptions}
      values={codingFormatFilters}
    />
  );
  const searchFilterRow = (
    <div className={clsx('flex justify-end gap-2')}>
      <div className="flex-1">
        <TextInput
          autoComplete="off"
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Search coding questions',
            description: 'Placeholder for search input of coding question list',
            id: 'jGQnYd',
          })}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search coding questions',
            description: 'Placeholder for search input of coding question list',
            id: 'jGQnYd',
          })}
          size="sm"
          startIcon={RiSearchLine}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>
      {layout === 'embedded' && (
        <div className="hidden lg:inline-flex">
          <Popover label={companyFilterOptions.name} size="sm">
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
          <Popover label={difficultyFilterOptions.name} size="sm" width="sm">
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
          <Popover label={frameworkFilterOptions.name} size="sm">
            <div className={clsx('flex flex-col')}>
              <div className="flex flex-col gap-2">
                <Text display="block" size="body3" weight="medium">
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
                <Text display="block" size="body3" weight="medium">
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
            label={completionStatusFilterOptions.name}
            size="sm"
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
      <section className="flex flex-col gap-6 lg:col-span-9">
        <div className="flex flex-col gap-4">
          {topicFilters}
          {searchFilterRow}
        </div>
        <div className="flex flex-col gap-4">
          {listMetadata}
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
                  checkIfCompletedQuestionBefore={
                    checkIfCompletedQuestionBefore
                  }
                  framework={framework}
                  listKey={listKey}
                  questionCompletionCount={questionCompletionCount}
                  questions={processedQuestions}
                />
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
          )}>
          <QuestionListingSummarySection
            free={premiumCount.free}
            premium={premiumCount.premium}
            {...difficultyCount}
          />
          <section
            className={clsx('sticky overflow-y-auto')}
            style={{
              maxHeight: FooterlessContainerHeight,
              top: `var(--navbar-height)`,
            }}>
            <Heading className="sr-only" level="custom">
              <FormattedMessage
                defaultMessage="Filters"
                description="Screenreader text indicating the filters component on question list pages"
                id="GyDKzV"
              />
            </Heading>
            <Section>
              <QuestionListingCodingFilters
                codingFormatFilterOptions={codingFormatFilterOptions}
                codingFormatFilters={codingFormatFilters}
                companyFilterOptions={companyFilterOptions}
                companyFilters={companyFilters}
                completionStatusFilterOptions={completionStatusFilterOptions}
                completionStatusFilters={completionStatusFilters}
                difficultyFilterOptions={difficultyFilterOptions}
                difficultyFilters={difficultyFilters}
                frameworkFilterOptions={frameworkFilterOptions}
                frameworkFilters={frameworkFilters}
                itemGap="compact"
                languageFilterOptions={languageFilterOptions}
                languageFilters={languageFilters}
                mode={mode}
              />
            </Section>
          </section>
        </aside>
      )}
    </div>
  );
}
