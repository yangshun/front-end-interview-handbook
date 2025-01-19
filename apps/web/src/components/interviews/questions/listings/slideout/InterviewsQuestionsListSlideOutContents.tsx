import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseLine,
  RiFilterLine,
  RiSearchLine,
} from 'react-icons/ri';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import type { QuestionFilter } from '~/components/interviews/questions/listings/filters/QuestionFilterType';
import QuestionFrameworkLanguageTooltipLabel from '~/components/interviews/questions/listings/filters/QuestionFrameworkLanguageTooltipLabel';
import QuestionListingFilterItemCheckboxes from '~/components/interviews/questions/listings/filters/QuestionListingFilterItemCheckboxes';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/items/useQuestionsWithCompletionStatus';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Popover from '~/components/ui/Popover';
import ScrollArea from '~/components/ui/ScrollArea';
import Spinner from '~/components/ui/Spinner';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeBackgroundCardColor } from '~/components/ui/theme';

import InterviewsQuestionsListSlideOutQuestionList from './InterviewsQuestionsListSlideOutQuestionList';
import QuestionListingFilterButtonBadgeWrapper from '../filters/QuestionListingFilterButtonBadgeWrapper';
import {
  filterQuestions,
  sortQuestionsMultiple,
  tabulateQuestionsAttributesUnion,
} from '../filters/QuestionsProcessor';
import QuestionsListSortButton from '../items/QuestionsListSortButton';
import { questionHrefFrameworkSpecificAndListType } from '../../common/QuestionHrefUtils';
import type {
  QuestionFramework,
  QuestionHash,
  QuestionLanguage,
  QuestionListTypeData,
  QuestionMetadata,
  QuestionPracticeFormat,
} from '../../common/QuestionsTypes';
import { useQuestionsListDataForType } from '../../common/useQuestionsListDataForType';

function FilterSection<T extends string, Q extends QuestionMetadata>({
  coveredValues,
  filters,
  filterOptions,
}: Readonly<{
  coveredValues?: Set<T>;
  filterOptions: QuestionFilter<T, Q>;
  filters: Set<T>;
}>) {
  // No need filter if there's only a single option.
  if (coveredValues != null && coveredValues.size <= 1) {
    return null;
  }

  return (
    <Popover
      trigger={
        <FilterButton
          addonPosition="end"
          icon={RiArrowDownSLine}
          label={
            filterOptions.name +
            (filters.size === 0 ? '' : ` (${filters.size})`)
          }
          selected={filters.size > 0}
          size="xs"
          tooltip={filterOptions.tooltip}
        />
      }>
      <QuestionListingFilterItemCheckboxes
        coveredValues={coveredValues}
        section={filterOptions}
        values={filters}
      />
    </Popover>
  );
}

function FrameworkAndLanguageFilterSection<Q extends QuestionMetadata>({
  languageCoveredValues,
  frameworkCoveredValues,
  frameworkFilters,
  frameworkFilterOptions,
  languageFilters,
  languageFilterOptions,
  listType,
}: Readonly<{
  frameworkCoveredValues?: Set<QuestionFramework>;
  frameworkFilterOptions: QuestionFilter<QuestionFramework, Q>;
  frameworkFilters: Set<QuestionFramework>;
  languageCoveredValues?: Set<QuestionLanguage>;
  languageFilterOptions: QuestionFilter<QuestionLanguage, Q>;
  languageFilters: Set<QuestionLanguage>;
  listType?: QuestionListTypeData;
}>) {
  const intl = useIntl();

  // No need filter if there's only a single option.
  if (
    languageCoveredValues != null &&
    languageCoveredValues.size <= 1 &&
    frameworkCoveredValues != null &&
    frameworkCoveredValues.size <= 1
  ) {
    return null;
  }

  const totalSelectionSize = frameworkFilters.size + languageFilters.size;

  return (
    <Popover
      trigger={
        <FilterButton
          addonPosition="end"
          icon={RiArrowDownSLine}
          label={
            intl.formatMessage({
              defaultMessage: 'Framework / Language',
              description:
                'Label for frameworks and programming language button',
              id: 'XhL9G7',
            }) + (totalSelectionSize === 0 ? '' : ` (${totalSelectionSize})`)
          }
          selected={frameworkFilters.size > 0 || languageFilters.size > 0}
          size="sm"
          tooltip={<QuestionFrameworkLanguageTooltipLabel />}
        />
      }>
      <div className={clsx('flex flex-col')}>
        {languageCoveredValues && languageCoveredValues.size > 1 && (
          <div className="flex flex-col gap-2">
            <Text className="block" size="body3" weight="medium">
              {languageFilterOptions.name}
            </Text>
            <QuestionListingFilterItemCheckboxes
              coveredValues={languageCoveredValues}
              section={languageFilterOptions}
              values={languageFilters}
            />
          </div>
        )}
        {frameworkCoveredValues &&
          frameworkCoveredValues.size > 1 &&
          listType?.type !== 'framework' &&
          listType?.type !== 'language' && (
            <>
              <Divider className="my-4" />
              <div className="flex flex-col gap-2">
                <Text className="block" size="body3" weight="medium">
                  {frameworkFilterOptions.name}
                </Text>
                <QuestionListingFilterItemCheckboxes
                  coveredValues={frameworkCoveredValues}
                  section={frameworkFilterOptions}
                  values={frameworkFilters}
                />
              </div>
            </>
          )}
      </div>
    </Popover>
  );
}

type Props = Readonly<{
  currentQuestionHash?: QuestionHash;
  framework?: QuestionFramework;
  isDifferentListFromInitial: boolean;
  listType: QuestionListTypeData;
  mode: React.ComponentProps<
    typeof InterviewsQuestionsListSlideOutQuestionList
  >['mode'];
  onCancelSwitchStudyList?: () => void;
  onClickQuestion: React.ComponentProps<
    typeof InterviewsQuestionsListSlideOutQuestionList
  >['onClickQuestion'];
  onCloseSwitchQuestionListDialog: () => void;
  onListTabChange?: (newTab: QuestionPracticeFormat) => void;
  setFirstQuestionHref?: (href: string) => void;
  showSwitchQuestionListDialog: Readonly<{
    href: string | null;
    show: boolean;
    type: 'question-click' | 'switch';
  }>;
}>;

export default function InterviewsQuestionsListSlideOutContents({
  framework,
  listType,
  onListTabChange,
  isDifferentListFromInitial,
  currentQuestionHash,
  mode,
  setFirstQuestionHref,
  showSwitchQuestionListDialog,
  onCancelSwitchStudyList,
  onCloseSwitchQuestionListDialog,
  onClickQuestion,
}: Props) {
  const intl = useIntl();
  const router = useRouter();
  const { userProfile } = useUserProfile();

  const [showFilters, setShowFilters] = useState(false);

  const studyListKey =
    listType != null && listType.type === 'study-list'
      ? listType.value
      : undefined;

  // To fetch the list-specific question when user change the study list
  const { isLoading, data } = useQuestionsListDataForType(listType ?? null);

  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    data?.questions ?? [],
    studyListKey,
  );

  const [prevTabs, setPrevTabs] = useState<
    ReadonlyArray<QuestionPracticeFormat> | undefined
  >();

  useEffect(() => {
    if (data?.tabs == null) {
      return;
    }

    setPrevTabs(data?.tabs);
  }, [data?.tabs]);

  // Tabulating.
  const attributesUnion = tabulateQuestionsAttributesUnion(
    questionsWithCompletionStatus,
  );

  // Filtering.
  const {
    query,
    setQuery,
    difficultyFilters,
    difficultyFilterOptions,
    companyFilters,
    companyFilterOptions,
    frameworkFilters,
    frameworkFilterOptions,
    languageFilters,
    languageFilterOptions,
    completionStatusFilters,
    completionStatusFilterOptions,
    importanceFilters,
    importanceFilterOptions,
    formatFilters,
    formatFilterOptions,
    topicFilterOptions,
    topicFilters,
    filters,
    clearAllFilters,
  } = useQuestionUnifiedFilters({
    listType,
  });

  // Sorting.
  const { sortFields } = useQuestionCodingSorting({
    listType,
  });

  // Processing.
  const sortedQuestions = sortQuestionsMultiple(
    questionsWithCompletionStatus,
    sortFields,
  );
  const processedQuestions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );

  const numberOfFilters = filters.filter(([size]) => size > 0).length;

  const sortFilter = (
    <QuestionsListSortButton isLabelHidden={true} listType={listType} />
  );

  const embedFilters = (
    <div className={clsx('flex flex-col', themeBackgroundCardColor)}>
      <div className={clsx('flex flex-wrap items-center gap-2', 'px-6 py-4')}>
        <FilterSection
          coveredValues={attributesUnion.formats}
          filterOptions={formatFilterOptions}
          filters={formatFilters}
        />
        <FilterSection
          coveredValues={attributesUnion.topics}
          filterOptions={topicFilterOptions}
          filters={topicFilters}
        />
        <FilterSection
          filterOptions={companyFilterOptions}
          filters={companyFilters}
        />
        <FilterSection
          coveredValues={attributesUnion.difficulty}
          filterOptions={difficultyFilterOptions}
          filters={difficultyFilters}
        />
        <FilterSection
          coveredValues={attributesUnion.importance}
          filterOptions={importanceFilterOptions}
          filters={importanceFilters}
        />
        {userProfile != null && (
          <FilterSection
            filterOptions={completionStatusFilterOptions}
            filters={completionStatusFilters}
          />
        )}
        <FrameworkAndLanguageFilterSection
          frameworkCoveredValues={attributesUnion.frameworks}
          frameworkFilterOptions={frameworkFilterOptions}
          frameworkFilters={frameworkFilters}
          languageCoveredValues={attributesUnion.languages}
          languageFilterOptions={languageFilterOptions}
          languageFilters={languageFilters}
          listType={listType}
        />
      </div>
      <Divider />
      <div
        className={clsx(
          'flex items-center justify-between gap-2',
          'px-6 py-2',
        )}>
        <Button
          className="-ml-3"
          icon={RiArrowUpSLine}
          label={intl.formatMessage({
            defaultMessage: 'Hide',
            description: 'Label for close filter button',
            id: 'lmhAqm',
          })}
          size="sm"
          tooltip="Close filters"
          variant="tertiary"
          onClick={() => setShowFilters(false)}
        />
        <Button
          icon={RiCloseLine}
          label={intl.formatMessage({
            defaultMessage: 'Reset filters',
            description: 'Label for reset filter button',
            id: 'L3y2pt',
          })}
          size="xs"
          variant="tertiary"
          onClick={clearAllFilters}
        />
      </div>
    </div>
  );

  const showCompanyPaywall =
    !userProfile?.isInterviewsPremium && companyFilters.size > 0;

  // Get the href of the first question in the list for navigation on closing slide out
  useEffect(() => {
    if (processedQuestions.length > 0 && !showCompanyPaywall) {
      setFirstQuestionHref?.(
        questionHrefFrameworkSpecificAndListType(
          processedQuestions[0],
          listType,
          framework,
        ),
      );
    }
  }, [
    framework,
    listType,
    processedQuestions,
    setFirstQuestionHref,
    showCompanyPaywall,
  ]);

  const label = intl.formatMessage({
    defaultMessage: 'Search within this list',
    description: 'Search placeholder for question list',
    id: 'hA7U8d',
  });

  // Show the previous tabs while the new tabs are loading
  const displayedTabs = data?.tabs ?? prevTabs;

  return (
    <>
      <div className={clsx('flex h-full flex-col pt-3.5')}>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <div className="flex w-full items-center gap-3 px-6">
            <div className="flex-1">
              <TextInput
                autoComplete="off"
                isLabelHidden={true}
                label={label}
                placeholder={label}
                size="sm"
                startIcon={RiSearchLine}
                type="search"
                value={query}
                onChange={(value) => setQuery(value)}
              />
            </div>
            <QuestionListingFilterButtonBadgeWrapper
              badgeClassName={clsx('-right-2 -top-1.5', 'size-5 text-xs')}
              numberOfFilters={numberOfFilters}>
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
                selected={numberOfFilters > 0}
                size="sm"
                tooltip={
                  showFilters
                    ? intl.formatMessage({
                        defaultMessage: 'Collapse filters',
                        description: 'Tooltip for collapse filters',
                        id: 'i2950u',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Expand filters',
                        description: 'Tooltip for expand filters',
                        id: 'ymvdJV',
                      })
                }
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
              />
            </QuestionListingFilterButtonBadgeWrapper>
            {sortFilter}
          </div>
          {showFilters && embedFilters}
        </form>
        {displayedTabs ? (
          <div className="my-3 px-6">
            <TabsUnderline
              size="sm"
              tabs={displayedTabs.map((listTabValue) => {
                const labels: Record<QuestionPracticeFormat, string> = {
                  coding: intl.formatMessage({
                    defaultMessage: 'Coding',
                    description: 'Question format',
                    id: 'eJU0PN',
                  }),
                  quiz: intl.formatMessage({
                    defaultMessage: 'Quiz',
                    description: 'Question format',
                    id: 'doY6Fg',
                  }),
                  'system-design': intl.formatMessage({
                    defaultMessage: 'System design',
                    description: 'Question format',
                    id: '57qxzy',
                  }),
                };

                return {
                  label: labels[listTabValue],

                  value: listTabValue,
                };
              })}
              value={data?.listType.tab}
              onSelect={(value: QuestionPracticeFormat) =>
                onListTabChange?.(value)
              }
            />
          </div>
        ) : (
          <div className="mt-4" />
        )}
        <ScrollArea>
          {isLoading ? (
            <div className="flex h-40 w-full items-center justify-center">
              <Spinner size="sm" />
            </div>
          ) : (
            <InterviewsQuestionsListSlideOutQuestionList
              key={`${listType.type}/${listType.value}/${listType.tab}`}
              checkIfCompletedQuestion={(question) => question.isCompleted}
              currentQuestionHash={currentQuestionHash}
              framework={framework}
              isDifferentListFromInitial={isDifferentListFromInitial}
              listType={listType}
              mode={mode}
              questions={
                showCompanyPaywall
                  ? sortedQuestions.slice(0, 4)
                  : processedQuestions
              }
              showCompanyPaywall={showCompanyPaywall}
              onClickQuestion={onClickQuestion}
            />
          )}
        </ScrollArea>
      </div>
      <ConfirmationDialog
        cancelButtonLabel={intl.formatMessage({
          defaultMessage: 'Stay on previous list',
          description: 'Stay on previous question list',
          id: 'IEnLEU',
        })}
        confirmButtonLabel={intl.formatMessage({
          defaultMessage: 'Switch',
          description: 'Button label for switch study list',
          id: '09QDZQ',
        })}
        isShown={showSwitchQuestionListDialog.show}
        title={intl.formatMessage({
          defaultMessage: 'Switch study list',
          description: 'Change study list dialog title',
          id: '6rN7CN',
        })}
        onCancel={() => {
          onCloseSwitchQuestionListDialog();
          onCancelSwitchStudyList?.();
        }}
        onClose={() => {
          onCloseSwitchQuestionListDialog();
        }}
        onConfirm={() => {
          if (!showSwitchQuestionListDialog.href) {
            return;
          }

          onCloseSwitchQuestionListDialog();
          router.push(showSwitchQuestionListDialog.href);
        }}>
        {showSwitchQuestionListDialog.type === 'question-click' ? (
          <FormattedMessage
            defaultMessage="You've selected a question from a different study list than the one you're currently using. Navigating to it will switch your current list. Do you want to proceed?"
            description="Confirmation text for switching study list"
            id="+C/8iu"
          />
        ) : (
          <FormattedMessage
            defaultMessage="You've selected a different study list than the one you're currently using. Navigating to it will switch your current list. Do you want to proceed?"
            description="Confirmation text for switching study list"
            id="/D6EXa"
          />
        )}
      </ConfirmationDialog>
    </>
  );
}
