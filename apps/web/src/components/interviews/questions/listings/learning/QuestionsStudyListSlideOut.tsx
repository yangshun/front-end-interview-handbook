import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFilterLine,
  RiSearchLine,
  RiSortDesc,
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
  QuestionSortField,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import type { QuestionFilter } from '~/components/interviews/questions/listings/filters/QuestionFilterType';
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
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Popover from '~/components/ui/Popover';
import SlideOut from '~/components/ui/SlideOut';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeBorderColor } from '~/components/ui/theme';

import InterviewsStudyListQuestions from './InterviewsStudyListQuestions';
import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
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
        />
      }>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {filterOptions.options.map((option) => (
          <div key={option.value} className="flex items-center">
            <CheckboxInput
              label={option.label}
              size="sm"
              value={filters.has(option.value)}
              onChange={() => filterOptions.onChange(option.value)}
            />
          </div>
        ))}
      </div>
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
        />
      }>
      <div className={clsx('flex flex-col')}>
        <div className="flex flex-col gap-2">
          <Text className="block" size="body3" weight="medium">
            {frameworkFilterOptions.name}
          </Text>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {frameworkFilterOptions.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <CheckboxInput
                  label={option.label}
                  size="sm"
                  value={frameworkFilters.has(option.value)}
                  onChange={() => frameworkFilterOptions.onChange(option.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex flex-col gap-2">
          <Text className="block" size="body3" weight="medium">
            {languageFilterOptions.name}
          </Text>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {languageFilterOptions.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <CheckboxInput
                  label={option.label}
                  size="sm"
                  value={languageFilters.has(option.value)}
                  onChange={() => languageFilterOptions.onChange(option.value)}
                />
              </div>
            ))}
          </div>
        </div>
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

  // Sorting.
  const {
    isAscendingOrder,
    setIsAscendingOrder,
    sortField,
    setSortField,
    defaultSortFields,
    premiumSortFields,
  } = useQuestionCodingSorting({
    defaultSortField: listKey == null ? 'difficulty' : 'default',
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

  // Get the href of the first question in the list for navigation on closing slide out
  useEffect(() => {
    if (processedQuestions.length > 0) {
      setFirstQuestionHref(
        questionHrefWithList(processedQuestions[0].href, currentListKey),
      );
    }
  }, [currentListKey, processedQuestions, setFirstQuestionHref]);

  const numberOfFilters = filters.filter(([size]) => size > 0).length;

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

  const sortFilter = (
    <DropdownMenu
      align="end"
      icon={RiSortDesc}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Sort by',
        description: 'Tooltip for sorting button',
        id: 'IAQscN',
      })}
      showChevron={false}
      size="sm"
      tooltip={intl.formatMessage({
        defaultMessage: 'Sort by',
        description: 'Label for sort by',
        id: '4A5Ogu',
      })}>
      {[
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Default',
            description: 'Default sorting',
            id: 'vcnpme',
          }),
          'default',
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
  );

  const embedFilters = (
    <div>
      <div className="flex flex-wrap gap-2 py-2">
        <FilterSection
          coveredValues={attributesUnion.topics}
          filterOptions={topicFilterOptions}
          filters={topicFilters}
        />
        {userProfile?.isInterviewsPremium && (
          <div className="col-span-2">
            <FilterSection
              filterOptions={companyFilterOptions}
              filters={companyFilters}
            />
          </div>
        )}
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
          currentListKey={currentListKey}
          listKey={listKey}
          metadata={metadata}
          questions={processedQuestions}
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
  studyList?: Readonly<{ listKey: string; name: string }>;
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
    ? `study-list:${currentStudyList?.listKey}`
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
    if (studyList?.listKey && studyList.listKey !== currentStudyList?.listKey) {
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
        <Button
          addonPosition="start"
          icon={RiFilterLine}
          isDisabled={isDisabled}
          isLabelHidden={isMobile}
          label={studyList != null ? studyList.name : 'Question list'}
          size="xs"
          variant="secondary"
          onClick={() => setIsShown(true)}>
          <div className="flex items-center gap-3">
            <span>{studyList != null ? studyList.name : 'Question list'}</span>
            <Badge
              label={`${currentQuestionPosition}/${processedQuestions.length}`}
              size="xs"
              variant="neutral"
            />
          </div>
        </Button>
      }
      onClose={onClose}>
      {isShown && (
        <Contents
          key={currentStudyList?.listKey ?? 'coding'}
          currentListKey={currentStudyList?.listKey}
          filterNamespace={filterNamespace}
          listKey={currentStudyList?.listKey}
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
