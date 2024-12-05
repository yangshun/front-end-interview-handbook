'use client';

import clsx from 'clsx';
import {
  RiArrowLeftLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';

import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/filters/hooks/useQuestionsWithCompletionStatus';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import InterviewsQuestionsListSlideOut from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOut';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { hashQuestion } from '~/db/QuestionsUtils';

import type { QuestionListTypeData } from '../../common/questionHref';
import {
  questionHrefWithListType,
  questionListFilterNamespace,
} from '../../common/questionHref';
import {
  useQuestionsListDataForType,
  useQuestionsListTypeCurrent,
} from '../../common/useQuestionsListDataForType';

type Props = Readonly<{
  metadata: QuestionMetadata;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  studyListKey?: string;
}>;

export default function InterviewsQuestionsListSlideOutButton({
  metadata,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
  studyListKey,
}: Props) {
  const listData = useQuestionsListTypeCurrent(studyListKey);
  const { isLoading, data } = useQuestionsListDataForType(listData);

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
            listType={data.listType}
            metadata={metadata}
            questions={questionsWithCompletionStatus}
            slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
              slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
            }
            title={data.title}
          />
        );
      })()}
    </div>
  );
}

function InterviewsQuestionsListSlideOutButtonImpl({
  title,
  listType,
  metadata,
  questions,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
}: Readonly<{
  listType: QuestionListTypeData;
  metadata: QuestionMetadata;
  questions: ReadonlyArray<QuestionMetadataWithCompletedStatus>;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  title: string;
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
    (question) => hashQuestion(question) === hashQuestion(metadata),
  );

  // The current question might not appear in the filtered list,
  // but `currentQuestionIndex` will return -1 and the next question
  // will be 0 index which is the first question in the processed list.
  const prevQuestion = processedQuestions[currentQuestionIndex - 1];
  const nextQuestion = processedQuestions[currentQuestionIndex + 1];

  if (listType.type === 'coding') {
    return (
      <Button
        addonPosition="start"
        href="/interviews/dashboard"
        icon={RiArrowLeftLine}
        label="Back to dashboard"
        variant="secondary"
      />
    );
  }

  return (
    <div className="flex gap-x-2">
      <Button
        addonPosition="start"
        href={
          prevQuestion
            ? questionHrefWithListType(prevQuestion?.href, listType)
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
        key={metadata.slug}
        currentQuestionPosition={currentQuestionIndex + 1}
        initialListType={{ ...listType, label: title }}
        isLoading={false}
        metadata={metadata}
        processedQuestions={processedQuestions}
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
          slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
        }
      />
      <Button
        addonPosition="start"
        href={
          nextQuestion
            ? questionHrefWithListType(nextQuestion?.href, listType)
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
