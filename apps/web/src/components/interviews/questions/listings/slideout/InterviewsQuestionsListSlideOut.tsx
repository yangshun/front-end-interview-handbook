import clsx from 'clsx';
import { isEqual } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { Suspense, useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import type {
  QuestionFramework,
  QuestionHash,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import type { QuestionListTypeWithLabel } from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutSwitcher';
import InterviewsQuestionsListSlideOutSwitcher from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutSwitcher';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import SlideOut from '~/components/ui/SlideOut';
import {
  themeBackgroundGlimmerColor,
  themeBorderColor,
} from '~/components/ui/theme';

import InterviewsQuestionsListSlideOutContents from './InterviewsQuestionsListSlideOutContents';
import QuestionListingFilterButtonBadgeWrapper from '../filters/QuestionListingFilterButtonBadgeWrapper';
import { questionListFilterNamespace } from '../../common/QuestionHrefUtils';

type Props = Readonly<{
  currentQuestionHash: QuestionHash;
  currentQuestionPosition: number;
  framework?: QuestionFramework;
  initialListType: QuestionListTypeWithLabel;
  isLoading: boolean;
  listIsShownInSidebarOnDesktop: boolean;
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
  listIsShownInSidebarOnDesktop,
  currentQuestionPosition,
  processedQuestions,
  currentQuestionHash,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
}: Props) {
  const intl = useIntl();
  const { showSidebar, setShowSidebar } = useUserPreferences();

  // Have to be controlled because we don't want to
  // fetch the question lists for nothing
  const [isSlideOutShown, setIsSlideOutShown] = useQueryState(
    slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
    parseAsBoolean.withDefault(false),
  );
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isDesktop = useMediaQuery('(min-width: 1367px)');
  const router = useRouter();
  const [currentListType, setCurrentListType] =
    useState<QuestionListTypeWithLabel>(initialListType);
  const filterNamespace = questionListFilterNamespace(currentListType);
  const [showSwitchQuestionListDialog, setShowSwitchQuestionListDialog] =
    useState<
      React.ComponentProps<
        typeof InterviewsQuestionsListSlideOutContents
      >['showSwitchQuestionListDialog']
    >({
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
      headerClassName={clsx('border-b', themeBorderColor)}
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
        <QuestionListingFilterButtonBadgeWrapper
          badgeClassName={clsx('left-4 top-0', 'size-3 text-[8px]')}
          numberOfFilters={numberOfFilters}>
          <Button
            addonPosition="start"
            icon={RiFilterLine}
            iconClassName={clsx(numberOfFilters > 0 && 'dark:text-brand')}
            isDisabled={isLoading}
            isLabelHidden={isMobile}
            label={listName}
            size="xs"
            variant="secondary"
            onClick={() => {
              if (isDesktop && listIsShownInSidebarOnDesktop) {
                setShowSidebar(!showSidebar);
              } else {
                setIsSlideOutShown(true);
              }
            }}>
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
        </QuestionListingFilterButtonBadgeWrapper>
      }
      onClose={onClose}>
      {isSlideOutShown && (
        <InterviewsQuestionsListSlideOutContents
          key={filterNamespace}
          currentQuestionHash={currentQuestionHash}
          filterNamespace={filterNamespace}
          framework={framework}
          isDifferentListFromInitial={
            !isEqual(initialListType, currentListType)
          }
          listType={currentListType}
          mode="full"
          setFirstQuestionHref={setFirstQuestionInListHref}
          showSwitchQuestionListDialog={showSwitchQuestionListDialog}
          onCancelSwitchStudyList={() => {
            closeSlideOut();
          }}
          onClickDifferentStudyListQuestion={(href: string) =>
            setShowSwitchQuestionListDialog({
              href,
              show: true,
              type: 'question-click',
            })
          }
          onCloseSwitchQuestionListDialog={onCloseSwitchQuestionListDialog}
        />
      )}
    </SlideOut>
  );
}
