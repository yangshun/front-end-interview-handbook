import clsx from 'clsx';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useSessionStorage } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import { QuestionsCodingFiltersNamespaceKey } from '~/components/interviews/questions/listings/filters/hooks/useQuestionsCodingFiltersNamespace';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/filters/hooks/useQuestionsWithCompletionStatus';
import useQuestionUnifiedFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionUnifiedFilters';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsStudyListSlideOut from '~/components/interviews/questions/listings/learning/QuestionsStudyListSlideOut';
import Button from '~/components/ui/Button';

import { hashQuestion } from '~/db/QuestionsUtils';

import { questionHrefWithList } from '../../common/questionHref';

export default function QuestionsStudyListSlideOutButton({
  metadata,
  studyList,
}: Readonly<{
  metadata: QuestionMetadata;
  studyList?: Readonly<{ listKey: string; name: string }>;
}>) {
  const { userProfile } = useUserProfile();
  const { isLoading, data: questions } =
    trpc.questionLists.getQuestions.useQuery({
      listKey: studyList?.listKey,
    });

  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    questions ?? [],
  );

  const [namespace] = useSessionStorage(
    QuestionsCodingFiltersNamespaceKey,
    'prepare-coding',
  );
  // Filtering.
  const { filters } = useQuestionUnifiedFilters({
    namespace,
  });
  // Sorting.
  const { defaultSortFields, premiumSortFields } = useQuestionCodingSorting();
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

  // Non-completed questions including the current question.
  const possibleQuestions = processedQuestions.filter(
    (question) =>
      !question.isCompleted ||
      hashQuestion(question.format, question.slug) ===
        hashQuestion(metadata.format, metadata.slug),
  );

  const currentQuestionIndex = possibleQuestions.findIndex(
    (question) =>
      hashQuestion(question.format, question.slug) ===
      hashQuestion(metadata.format, metadata.slug),
  );

  // The current question might not appear in the filtered list,
  // but `currentQuestionIndex` will return -1 and the next question
  // will be 0 index which is the first question in the processed list.
  const prevQuestion = possibleQuestions[currentQuestionIndex - 1];
  const prevQuestionButtonDisabled = isLoading || prevQuestion == null;

  const nextQuestion = possibleQuestions[currentQuestionIndex + 1];
  const nextQuestionButtonDisabled = isLoading || nextQuestion == null;

  return (
    <div>
      <div className="flex gap-x-2">
        <Button
          addonPosition="start"
          className={clsx(prevQuestionButtonDisabled && 'opacity-50')}
          href={
            prevQuestionButtonDisabled
              ? undefined
              : questionHrefWithList(prevQuestion?.href, studyList?.listKey)
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
          variant="secondary"
        />
        <QuestionsStudyListSlideOut
          isDisabled={isLoading}
          questions={questionsWithCompletionStatus}
          studyList={studyList}
        />
        <Button
          addonPosition="start"
          className={clsx(nextQuestionButtonDisabled && 'opacity-50')}
          href={
            nextQuestionButtonDisabled
              ? undefined
              : questionHrefWithList(nextQuestion?.href, studyList?.listKey)
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
          variant="secondary"
        />
      </div>
    </div>
  );
}
