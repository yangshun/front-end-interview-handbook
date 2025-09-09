'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { Suspense } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import {
  questionHrefFrameworkSpecificAndListType,
  QuestionListTypeDefault,
} from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionFramework,
  QuestionHash,
  QuestionListTypeData,
  QuestionMetadataWithStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import useQuestionsWithStatus from '~/components/interviews/questions/listings/items/useQuestionsWithStatus';
import InterviewsQuestionsListSlideOut from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOut';
import {
  useQuestionsListDataForType,
  useQuestionsListTypeCurrent,
} from '~/components/interviews/questions/listings/utils/useQuestionsListDataForType';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { hashQuestion } from '~/db/QuestionsUtils';

import type { QuestionListTypeWithLabel } from './InterviewsQuestionsListSlideOutSwitcher';

type Props = Readonly<{
  currentQuestionHash: QuestionHash;
  framework?: QuestionFramework;
  initialListType?: QuestionListTypeData;
  listIsShownInSidebarOnDesktop: boolean;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string | null;
  studyListKey?: string;
}>;

export default function InterviewsQuestionsListSlideOutButton(props: Props) {
  return (
    <Suspense>
      <InterviewsQuestionsListSlideOutButtonWithLoader {...props} />
    </Suspense>
  );
}

function InterviewsQuestionsListSlideOutButtonWithLoader({
  currentQuestionHash,
  framework,
  initialListType,
  listIsShownInSidebarOnDesktop,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
  studyListKey,
}: Props) {
  const listType =
    useQuestionsListTypeCurrent(studyListKey, framework) ??
    initialListType ??
    QuestionListTypeDefault;
  const { data, isLoading } = useQuestionsListDataForType(listType);

  const questionsWithCompletionStatus = useQuestionsWithStatus(
    data?.questions ?? [],
    studyListKey,
  );

  const hidden = isLoading || data == null;

  return (
    <div
      className={clsx(
        'transition-opacity duration-500',
        hidden ? 'opacity-0' : 'opacity-100',
      )}>
      {(() => {
        if (hidden) {
          return null;
        }

        return (
          <InterviewsQuestionsListSlideOutButtonImpl
            currentQuestionHash={currentQuestionHash}
            framework={framework}
            listIsShownInSidebarOnDesktop={listIsShownInSidebarOnDesktop}
            listType={{ ...data.listType, label: data.title }}
            questions={questionsWithCompletionStatus}
            slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
              slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
            }
          />
        );
      })()}
    </div>
  );
}

function InterviewsQuestionsListSlideOutButtonImpl({
  currentQuestionHash,
  framework,
  listIsShownInSidebarOnDesktop,
  listType,
  questions,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
}: Omit<Props, 'studyListKey'> &
  Readonly<{
    listType: QuestionListTypeWithLabel;
    questions: ReadonlyArray<QuestionMetadataWithStatus>;
  }>) {
  const intl = useIntl();

  // Filtering.
  const { filters } = useQuestionUnifiedFilters({
    listType,
  });

  // Sorting.
  const { sortFields } = useQuestionCodingSorting({
    listType,
  });

  // Processing.
  const sortedQuestions = sortQuestionsMultiple(questions, sortFields);
  const processedQuestions = filterQuestions(
    sortedQuestions,
    filters.map(([_, filterFn]) => filterFn),
  );

  const currentQuestionIndex = processedQuestions.findIndex(
    (question) => hashQuestion(question) === currentQuestionHash,
  );

  // The current question might not appear in the filtered list,
  // but `currentQuestionIndex` will return -1 and the next question
  // will be 0 index which is the first question in the processed list.
  const prevQuestion = processedQuestions[currentQuestionIndex - 1];
  const nextQuestion = processedQuestions[currentQuestionIndex + 1];

  return (
    <div className="flex h-7 gap-x-2">
      <NavigationButton
        addonPosition="start"
        icon={RiArrowLeftSLine}
        isDisabled={prevQuestion == null}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Previous question',
          description: 'Previous question',
          id: 'WPfIhl',
        })}
        questionHref={
          prevQuestion
            ? (pathname: string | null) =>
                questionHrefFrameworkSpecificAndListType(
                  prevQuestion,
                  listType,
                  framework,
                  pathname,
                )
            : undefined
        }
        size="xs"
        tooltip={prevQuestion ? prevQuestion?.title : undefined}
        variant="tertiary"
      />
      <InterviewsQuestionsListSlideOut
        key={currentQuestionHash}
        currentQuestionHash={currentQuestionHash}
        currentQuestionPosition={currentQuestionIndex + 1}
        framework={framework}
        initialListType={listType}
        isLoading={false}
        listIsShownInSidebarOnDesktop={listIsShownInSidebarOnDesktop}
        processedQuestions={processedQuestions}
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
          slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
        }
      />
      <NavigationButton
        addonPosition="start"
        icon={RiArrowRightSLine}
        isDisabled={nextQuestion == null}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Next question',
          description: 'Next question',
          id: 'DqvEKB',
        })}
        questionHref={
          nextQuestion
            ? (pathname: string | null) =>
                questionHrefFrameworkSpecificAndListType(
                  nextQuestion,
                  listType,
                  framework,
                  pathname,
                )
            : undefined
        }
        size="xs"
        tooltip={nextQuestion ? nextQuestion?.title : undefined}
        variant="tertiary"
      />
    </div>
  );
}

function NavigationButton({
  questionHref,
  ...props
}: ComponentProps<typeof Button> &
  Readonly<{
    questionHref?: (pathname: string | null) => string;
  }>) {
  const pathname = usePathname();

  const href = questionHref?.(pathname);

  return <Button {...props} href={href} />;
}
