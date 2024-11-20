import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFilterLine,
  RiSearchLine,
} from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

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
import type { StudyListItemType } from '~/components/interviews/questions/listings/learning/InterviewsStudyListSelector';
import InterviewsStudyListSelector from '~/components/interviews/questions/listings/learning/InterviewsStudyListSelector';
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
import { themeBorderColor, themeTextInvertColor } from '~/components/ui/theme';

import InterviewsStudyListQuestions from './InterviewsStudyListQuestions';
import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
import QuestionsListSortButton from '../items/QuestionsListSortButton';
import { questionHrefWithList } from '../../common/questionHref';

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
}: Readonly<{
  frameworkCoveredValues?: Set<QuestionFramework>;
  frameworkFilterOptions: QuestionFilter<QuestionFramework, Q>;
  frameworkFilters: Set<QuestionFramework>;
  languageCoveredValues?: Set<QuestionLanguage>;
  languageFilterOptions: QuestionFilter<QuestionLanguage, Q>;
  languageFilters: Set<QuestionLanguage>;
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
        {frameworkCoveredValues && frameworkCoveredValues.size > 1 && (
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
  listKey,
  currentListKey,
  metadata,
  filterNamespace,
  setFirstQuestionHref,
  onClickDifferentStudyListQuestion,
}: Readonly<{
  currentListKey?: string;
  filterNamespace: string;
  listKey?: string;
  metadata: QuestionMetadata;
  onClickDifferentStudyListQuestion: (href: string) => void;
  setFirstQuestionHref: (href: string) => void;
}>) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();

  const [showFilters, setShowFilters] = useState(false);

  // To fetch the list specific question when user change the study list
  const { data: listQuestions, isLoading } =
    trpc.questionLists.getQuestions.useQuery({
      listKey: currentListKey,
    });

  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    listQuestions ?? [],
    currentListKey,
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
  const defaultSortField = listKey == null ? 'difficulty' : 'default';

  // Sorting.
  const { defaultSortFields, premiumSortFields } = useQuestionCodingSorting({
    defaultSortField,
    filterNamespace,
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

  const numberOfFilters = filters.filter(([size]) => size > 0).length;

  const sortFilter = (
    <QuestionsListSortButton
      defaultSortField={defaultSortField}
      filterNamespace={filterNamespace}
      isLabelHidden={true}
    />
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
        questionHrefWithList(
          processedQuestions[0].href,
          currentListKey
            ? {
                studyList: currentListKey,
              }
            : undefined,
        ),
      );
    }
  }, [
    currentListKey,
    processedQuestions,
    setFirstQuestionHref,
    showCompanyPaywall,
  ]);

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
              label={
                currentListKey
                  ? intl.formatMessage({
                      defaultMessage: 'Search in the list',
                      description: 'Search placeholder for study list',
                      id: 'y6DqsF',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Search questions',
                      description: 'Search placeholder label',
                      id: 'K4Xbup',
                    })
              }
              placeholder={
                currentListKey
                  ? intl.formatMessage({
                      defaultMessage: 'Search in the list',
                      description: 'Search placeholder for study list',
                      id: 'y6DqsF',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Search questions',
                      description: 'Search placeholder label',
                      id: 'K4Xbup',
                    })
              }
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
        <InterviewsStudyListQuestions
          checkIfCompletedQuestion={(question) => question.isCompleted}
          currentList={
            currentListKey ? { studyList: currentListKey } : undefined
          }
          list={
            listKey
              ? {
                  studyList: listKey,
                }
              : undefined
          }
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
  isDisabled: boolean;
  metadata: QuestionMetadata;
  processedQuestions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  studyList?: Readonly<{ name: string; studyListKey: string }>;
}>;

export default function QuestionsStudyListSlideOut({
  isDisabled,
  studyList,
  currentQuestionPosition,
  processedQuestions,
  metadata,
}: Props) {
  const intl = useIntl();
  // Have to be controlled because we don't want to
  // render the contents for nothing because it does a fetch.
  const [isShown, setIsShown] = useState(false);
  const isMobile = useMediaQuery('(max-width: 500px)');
  const router = useRouter();
  const [currentStudyList, setCurrentStudyList] =
    useState<StudyListItemType | null>(studyList ?? null);
  const filterNamespace = studyList
    ? `study-list:${currentStudyList?.studyListKey}`
    : 'prepare-coding';
  const [showStudyListSwitchDialog, setShowStudyListSwitchDialog] = useState<{
    href: string | null;
    show: boolean;
    type: 'question-click' | 'switch';
  }>({
    href: null,
    show: false,
    type: 'switch',
  });
  const [firstQuestionHref, setFirstQuestionHref] = useState<string | null>(
    null,
  );

  function onClose() {
    // If there are no questions after the filter, prevent closing
    if (processedQuestions.length === 0) {
      return;
    }
    if (
      studyList?.studyListKey &&
      studyList.studyListKey !== currentStudyList?.studyListKey
    ) {
      setShowStudyListSwitchDialog({
        href: firstQuestionHref,
        show: true,
        type: 'switch',
      });

      return;
    }
    // If the active question is not in the list
    // redirect to the first question in the list on closing
    if (currentQuestionPosition === 0 && firstQuestionHref) {
      router.push(firstQuestionHref);
    }
    setIsShown(false);
  }

  function onCloseStudyListSwitchDialog() {
    setShowStudyListSwitchDialog((prev) => ({
      ...prev,
      href: null,
      show: false,
    }));
  }

  const { filters } = useQuestionUnifiedFilters({
    filterNamespace,
  });
  const numberOfFilters = filters.filter(([size]) => size > 0).length;

  return (
    <SlideOut
      enterFrom="start"
      isShown={isShown}
      padding={false}
      size="xl"
      title={
        currentStudyList != null ? (
          <InterviewsStudyListSelector
            currentStudyList={currentStudyList}
            onChangeStudyList={setCurrentStudyList}
          />
        ) : (
          intl.formatMessage({
            defaultMessage: 'Questions',
            description: 'Questions list',
            id: 'Lo9TQS',
          })
        )
      }
      trigger={
        <div className="relative">
          <Button
            addonPosition="start"
            icon={RiFilterLine}
            iconClassName={clsx(
              numberOfFilters > 0 && 'dark:text-brand text-brand-darker',
            )}
            isDisabled={isDisabled}
            isLabelHidden={isMobile}
            label={
              studyList != null
                ? studyList.name
                : intl.formatMessage({
                    defaultMessage: 'Question list',
                    description: 'Questions list',
                    id: '5lRIfw',
                  })
            }
            size="xs"
            variant="secondary"
            onClick={() => setIsShown(true)}>
            {studyList == null ? (
              intl.formatMessage({
                defaultMessage: 'Question list',
                description: 'Questions list',
                id: '5lRIfw',
              })
            ) : (
              <div className="flex items-center gap-3">
                <span>{studyList.name}</span>
                <Badge
                  label={`${currentQuestionPosition}/${processedQuestions.length}`}
                  size="xs"
                  variant="neutral"
                />
              </div>
            )}
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
      {isShown && (
        <ScrollArea>
          <Contents
            key={currentStudyList?.studyListKey ?? 'coding'}
            currentListKey={currentStudyList?.studyListKey}
            filterNamespace={filterNamespace}
            listKey={currentStudyList?.studyListKey}
            metadata={metadata}
            setFirstQuestionHref={setFirstQuestionHref}
            onClickDifferentStudyListQuestion={(href: string) =>
              setShowStudyListSwitchDialog({
                href,
                show: true,
                type: 'question-click',
              })
            }
          />
        </ScrollArea>
      )}
      <ConfirmationDialog
        confirmButtonLabel={intl.formatMessage({
          defaultMessage: 'Switch',
          description: 'Button label for switch study list',
          id: '09QDZQ',
        })}
        isShown={showStudyListSwitchDialog.show}
        title={intl.formatMessage({
          defaultMessage: 'Switch study list',
          description: 'Label to switch study list dialog',
          id: '3EzwJo',
        })}
        onCancel={onCloseStudyListSwitchDialog}
        onConfirm={() => {
          if (!showStudyListSwitchDialog.href) {
            return;
          }
          onCloseStudyListSwitchDialog();
          setIsShown(false);
          router.push(showStudyListSwitchDialog.href);
        }}>
        {showStudyListSwitchDialog.type === 'question-click' ? (
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
