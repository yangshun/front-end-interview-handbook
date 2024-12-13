import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { Suspense, useEffect, useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFilterLine,
  RiSearchLine,
} from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import type { QuestionFilter } from '~/components/interviews/questions/listings/filters/QuestionFilterType';
import QuestionFrameworkLanguageTooltipLabel from '~/components/interviews/questions/listings/filters/QuestionFrameworkLanguageTooltipLabel';
import QuestionListingFilterItemCheckboxes from '~/components/interviews/questions/listings/filters/QuestionListingFilterItemCheckboxes';
import {
  filterQuestions,
  sortQuestionsMultiple,
  tabulateQuestionsAttributesUnion,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import type { QuestionListTypeWithLabel } from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutSwitcher';
import InterviewsQuestionsListSlideOutSwitcher from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutSwitcher';
import { FormattedMessage, useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Popover from '~/components/ui/Popover';
import ScrollArea from '~/components/ui/ScrollArea';
import SlideOut from '~/components/ui/SlideOut';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import {
  themeBackgroundGlimmerColor,
  themeBorderColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

import InterviewsQuestionsListSlideOutContents from './InterviewsQuestionsListSlideOutContents';
import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
import QuestionsListSortButton from '../items/QuestionsListSortButton';
import type { QuestionListTypeData } from '../../common/QuestionHrefUtils';
import {
  questionHrefFrameworkSpecificAndListType,
  questionListFilterNamespace,
} from '../../common/QuestionHrefUtils';
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
          size="sm"
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

function Contents({
  framework,
  listType,
  isDifferentListFromInitial,
  metadata,
  filterNamespace,
  setFirstQuestionHref,
  onClickDifferentStudyListQuestion,
}: Readonly<{
  filterNamespace: string;
  framework?: QuestionFramework;
  isDifferentListFromInitial: boolean;
  listType: QuestionListTypeData;
  metadata: QuestionMetadata;
  onClickDifferentStudyListQuestion: (href: string) => void;
  setFirstQuestionHref: (href: string) => void;
}>) {
  const intl = useIntl();
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
    filterNamespace,
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
    <div>
      <div className="flex flex-wrap gap-2 py-2">
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
        <FilterSection
          coveredValues={attributesUnion.formats}
          filterOptions={formatFilterOptions}
          filters={formatFilters}
        />
      </div>
      <div
        className={clsx('flex items-center justify-between gap-2', 'py-2', [
          'border-t',
          themeBorderColor,
        ])}>
        <Button
          icon={RiArrowUpSLine}
          label={intl.formatMessage({
            defaultMessage: 'Hide',
            description: 'Label for hide filter button',
            id: 'rfSyqp',
          })}
          size="xs"
          variant="tertiary"
          onClick={() => setShowFilters(false)}
        />
        <Button
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
      setFirstQuestionHref(
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

  return (
    <div className="flex flex-col gap-y-4">
      <form
        className="flex w-full flex-col gap-4 px-6"
        onSubmit={(event) => {
          event.preventDefault();
        }}>
        <div className="flex w-full items-center gap-3">
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
          {sortFilter}
        </div>
        {showFilters && embedFilters}
      </form>
      {isLoading ? (
        <div className="flex h-40 w-full items-center justify-center">
          <Spinner size="sm" />
        </div>
      ) : (
        <InterviewsQuestionsListSlideOutContents
          checkIfCompletedQuestion={(question) => question.isCompleted}
          framework={framework}
          isDifferentListFromInitial={isDifferentListFromInitial}
          listType={listType}
          metadata={metadata}
          questions={
            showCompanyPaywall
              ? sortedQuestions.slice(0, 4)
              : processedQuestions
          }
          showCompanyPaywall={showCompanyPaywall}
          onClickDifferentStudyListQuestion={onClickDifferentStudyListQuestion}
        />
      )}
    </div>
  );
}

type Props = Readonly<{
  currentQuestionPosition: number;
  framework?: QuestionFramework;
  initialListType: QuestionListTypeWithLabel;
  isLoading: boolean;
  metadata: QuestionMetadata;
  processedQuestions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  title?: string;
}>;

export default function InterviewsQuestionsListSlideOut(props: Props) {
  // Because useQuestionsListTypeCurrent() uses useSearchParams()
  // Because of nuqs
  return (
    <Suspense>
      <InterviewsQuestionsListSlideOutImpl {...props} />
    </Suspense>
  );
}

function InterviewsQuestionsListSlideOutImpl({
  framework,
  isLoading,
  initialListType,
  currentQuestionPosition,
  processedQuestions,
  metadata,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
}: Props) {
  const intl = useIntl();
  // Have to be controlled because we don't want to
  // fetch the question lists for nothing
  const [isSlideOutShown, setIsSlideOutShown] = useQueryState(
    slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
    parseAsBoolean.withDefault(false),
  );
  const isMobile = useMediaQuery('(max-width: 640px)');
  const router = useRouter();
  const [currentListType, setCurrentListType] =
    useState<QuestionListTypeWithLabel>(initialListType);
  const filterNamespace = questionListFilterNamespace(currentListType);
  const [showSwitchQuestionListDialog, setShowSwitchQuestionListDialog] =
    useState<{
      href: string | null;
      show: boolean;
      type: 'question-click' | 'switch';
    }>({
      href: null,
      show: false,
      type: 'switch',
    });
  const [firstQuestionInListHref, setFirstQuestionInListHref] = useState<
    string | null
  >(null);

  function closeSlideOut() {
    setIsSlideOutShown(false);
    // Reset to initial list when slide out is dismissed
    setCurrentListType(initialListType);
  }

  function onClose() {
    // If there are no questions after the filter, prevent closing
    if (processedQuestions.length === 0) {
      return;
    }

    if (!isEqual(initialListType, currentListType)) {
      setShowSwitchQuestionListDialog({
        href: firstQuestionInListHref,
        show: true,
        type: 'switch',
      });

      return;
    }

    // If the active question is not in the list, redirect
    // to the first question in the list upon closing
    if (currentQuestionPosition === 0 && firstQuestionInListHref) {
      router.push(firstQuestionInListHref);
    } else {
      closeSlideOut();
    }
  }

  function onCloseSwitchQuestionListDialog() {
    setShowSwitchQuestionListDialog((prev) => ({
      ...prev,
      href: null,
      show: false,
    }));
  }

  const { filters, query } = useQuestionUnifiedFilters({
    filterNamespace,
  });

  // Add the search query in the active filter count
  const numberOfFilters =
    filters.filter(([size]) => size > 0).length + (query.length > 0 ? 1 : 0);

  const listName =
    initialListType?.label ??
    intl.formatMessage({
      defaultMessage: 'Question list',
      description: 'Questions list',
      id: '5lRIfw',
    });

  return (
    <SlideOut
      enterFrom="start"
      isShown={Boolean(isSlideOutShown)}
      padding={false}
      size="xl"
      title={
        <InterviewsQuestionsListSlideOutSwitcher
          listType={currentListType}
          onChangeListType={setCurrentListType}
        />
      }
      trigger={
        <div className="relative">
          <Button
            addonPosition="start"
            icon={RiFilterLine}
            iconClassName={clsx(numberOfFilters > 0 && 'dark:text-brand')}
            isDisabled={isLoading}
            isLabelHidden={isMobile}
            label={listName}
            size="xs"
            variant="secondary"
            onClick={() => setIsSlideOutShown(true)}>
            <div className="flex items-center gap-3">
              {isLoading ? (
                <div
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Loading',
                    description: 'Loading label',
                    id: 'TV3jir',
                  })}
                  className={clsx(
                    'h-2 w-[120px] animate-pulse rounded',
                    themeBackgroundGlimmerColor,
                  )}
                />
              ) : (
                <>
                  <span>{listName}</span>
                  <Badge
                    label={`${currentQuestionPosition}/${processedQuestions.length}`}
                    size="xs"
                    variant="neutral"
                  />
                </>
              )}
            </div>
          </Button>
          {numberOfFilters > 0 && (
            <div
              className={clsx(
                'absolute bottom-0 left-4',
                'flex items-center justify-center',
                'size-3 rounded-full',
                'bg-neutral-900 dark:bg-neutral-100',
                'text-[8px] font-bold',
                themeTextInvertColor,
              )}>
              {numberOfFilters}
            </div>
          )}
        </div>
      }
      onClose={onClose}>
      {isSlideOutShown && (
        <ScrollArea>
          <Contents
            key={filterNamespace}
            filterNamespace={filterNamespace}
            framework={framework}
            isDifferentListFromInitial={
              !isEqual(initialListType, currentListType)
            }
            listType={currentListType}
            metadata={metadata}
            setFirstQuestionHref={setFirstQuestionInListHref}
            onClickDifferentStudyListQuestion={(href: string) =>
              setShowSwitchQuestionListDialog({
                href,
                show: true,
                type: 'question-click',
              })
            }
          />
        </ScrollArea>
      )}
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
          closeSlideOut();
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
    </SlideOut>
  );
}
