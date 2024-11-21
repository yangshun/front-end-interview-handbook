'use client';

import clsx from 'clsx';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/filters/hooks/useQuestionsWithCompletionStatus';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsStudyListSlideOut from '~/components/interviews/questions/listings/learning/QuestionsStudyListSlideOut';
import Button from '~/components/ui/Button';

import { hashQuestion } from '~/db/QuestionsUtils';

import {
  questionHrefWithListType,
  questionListFilterNamespace,
} from '../../common/questionHref';
import useQuestionsListDataForType from '../../common/useQuestionsListDataForType';

type Props = Readonly<{
  metadata: QuestionMetadata;
  studyListKey?: string;
}>;

export default function QuestionsStudyListSlideOutButton({
  metadata,
  studyListKey,
}: Props) {
  const { userProfile } = useUserProfile();
  const { isLoading, data } = useQuestionsListDataForType(studyListKey);

  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    data?.questions ?? [],
    studyListKey,
  );

  const filterNamespace = questionListFilterNamespace(data);

  // Filtering.
  const { filters } = useQuestionUnifiedFilters({
    filterNamespace,
  });

  // Sorting.
  const { defaultSortFields, premiumSortFields } = useQuestionCodingSorting({
    defaultSortField: 'default',
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

  const currentQuestionIndex = processedQuestions.findIndex(
    (question) => hashQuestion(question) === hashQuestion(metadata),
  );

  // The current question might not appear in the filtered list,
  // but `currentQuestionIndex` will return -1 and the next question
  // will be 0 index which is the first question in the processed list.
  const prevQuestion = processedQuestions[currentQuestionIndex - 1];
  const prevQuestionButtonDisabled = isLoading || prevQuestion == null;

  const nextQuestion = processedQuestions[currentQuestionIndex + 1];
  const nextQuestionButtonDisabled = isLoading || nextQuestion == null;

  return (
    <div className="flex gap-x-2">
      <Button
        addonPosition="start"
        className={clsx(prevQuestionButtonDisabled && 'opacity-50')}
        href={
          prevQuestionButtonDisabled
            ? undefined
            : questionHrefWithListType(prevQuestion?.href, data)
        }
        icon={RiArrowLeftSLine}
        isDisabled={prevQuestionButtonDisabled}
        isLabelHidden={true}
        label="Previous question"
        size="xs"
        tooltip={
          prevQuestionButtonDisabled
            ? undefined
            : `Previous question: ${prevQuestion?.title}`
        }
        variant="tertiary"
      />
      <QuestionsStudyListSlideOut
        currentQuestionPosition={currentQuestionIndex + 1}
        isDisabled={isLoading}
        listType={data}
        metadata={metadata}
        processedQuestions={processedQuestions}
        title={data?.title}
      />
      <Button
        addonPosition="start"
        className={clsx(nextQuestionButtonDisabled && 'opacity-50')}
        href={
          nextQuestionButtonDisabled
            ? undefined
            : questionHrefWithListType(nextQuestion?.href, data)
        }
        icon={RiArrowRightSLine}
        isDisabled={nextQuestionButtonDisabled}
        isLabelHidden={true}
        label="Next question"
        size="xs"
        tooltip={
          nextQuestionButtonDisabled
            ? undefined
            : `Next question: ${nextQuestion?.title}`
        }
        variant="tertiary"
      />
    </div>
  );
}
