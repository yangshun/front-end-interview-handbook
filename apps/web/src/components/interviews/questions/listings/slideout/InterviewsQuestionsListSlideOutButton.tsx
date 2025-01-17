'use client';

import clsx from 'clsx';
import { Suspense } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import type {
  QuestionFramework,
  QuestionHash,
  QuestionMetadataWithCompletedStatus,
  QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/items/useQuestionsWithCompletionStatus';
import InterviewsQuestionsListSlideOut from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOut';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { hashQuestion } from '~/db/QuestionsUtils';

import {
  questionHrefFrameworkSpecificAndListType,
  questionListFilterNamespace,
} from '../../common/QuestionHrefUtils';
import type { QuestionListTypeData } from '../../common/QuestionsTypes';
import {
  useQuestionsListDataForType,
  useQuestionsListTypeCurrent,
} from '../../common/useQuestionsListDataForType';

type Props = Readonly<{
  currentQuestionHash: QuestionHash;
  framework?: QuestionFramework;
  listIsShownInSidebarOnDesktop: boolean;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
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
  framework,
  currentQuestionHash,
  listIsShownInSidebarOnDesktop,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
  studyListKey,
}: Props) {
  const listType = useQuestionsListTypeCurrent(studyListKey, framework);
  const { isLoading, data } = useQuestionsListDataForType(listType);

  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
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
            listInfo={{ tabs: data.tabs, title: data.title }}
            listIsShownInSidebarOnDesktop={listIsShownInSidebarOnDesktop}
            listType={data.listType}
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
  listInfo,
  listType,
  listIsShownInSidebarOnDesktop,
  questions,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
}: Omit<Props, 'studyListKey'> &
  Readonly<{
    listInfo: Readonly<{
      tabs?: ReadonlyArray<QuestionPracticeFormat>;
      title: string;
    }>;
    listType: QuestionListTypeData;
    questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  }>) {
  const intl = useIntl();
  const filterNamespace = questionListFilterNamespace(listType);

  // Filtering.
  const { filters } = useQuestionUnifiedFilters({
    filterNamespace,
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
      <Button
        addonPosition="start"
        href={
          prevQuestion
            ? questionHrefFrameworkSpecificAndListType(
                prevQuestion,
                listType,
                framework,
              )
            : undefined
        }
        icon={RiArrowLeftSLine}
        isDisabled={prevQuestion == null}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Previous question',
          description: 'Previous question',
          id: 'WPfIhl',
        })}
        size="xs"
        tooltip={prevQuestion ? prevQuestion?.title : undefined}
        variant="tertiary"
      />
      <InterviewsQuestionsListSlideOut
        key={currentQuestionHash}
        currentQuestionHash={currentQuestionHash}
        currentQuestionPosition={currentQuestionIndex + 1}
        framework={framework}
        initialListType={{ ...listType, label: listInfo.title }}
        isLoading={false}
        listIsShownInSidebarOnDesktop={listIsShownInSidebarOnDesktop}
        listTabs={listInfo.tabs}
        processedQuestions={processedQuestions}
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
          slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
        }
      />
      <Button
        addonPosition="start"
        href={
          nextQuestion
            ? questionHrefFrameworkSpecificAndListType(
                nextQuestion,
                listType,
                framework,
              )
            : undefined
        }
        icon={RiArrowRightSLine}
        isDisabled={nextQuestion == null}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Next question',
          description: 'Next question',
          id: 'DqvEKB',
        })}
        size="xs"
        tooltip={nextQuestion ? nextQuestion?.title : undefined}
        variant="tertiary"
      />
    </div>
  );
}
