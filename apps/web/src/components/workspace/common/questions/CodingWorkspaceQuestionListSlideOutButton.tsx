import { useState } from 'react';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiListUnordered,
} from 'react-icons/ri';
import { useSessionStorage } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionCodingFilters from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingFilters';
import useQuestionCodingSorting from '~/components/interviews/questions/listings/filters/hooks/useQuestionCodingSorting';
import { QuestionsCodingFiltersNamespaceKey } from '~/components/interviews/questions/listings/filters/hooks/useQuestionsCodingFiltersNamespace';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/filters/hooks/useQuestionsWithCompletionStatus';
import {
  filterQuestions,
  sortQuestionsMultiple,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import Button from '~/components/ui/Button';
import QuestionCodingListSlideOut from '~/components/workspace/common/questions/CodingWorkspaceQuestionListSlideOut';

import { hashQuestion } from '~/db/QuestionsUtils';

export default function CodingWorkspaceQuestionListSlideOutButton({
  metadata,
}: Readonly<{
  metadata: QuestionMetadata;
}>) {
  const { userProfile } = useUserProfile();
  const { isLoading, data: codingQuestions } = trpc.questions.coding.useQuery();
  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    codingQuestions ?? [],
  );
  const [showQuestionsSlideOut, setShowQuestionsSlideOut] = useState(false);

  const [namespace] = useSessionStorage(
    QuestionsCodingFiltersNamespaceKey,
    'prepare-coding',
  );
  // Filtering
  const { filters } = useQuestionCodingFilters({
    namespace,
  });
  // Sorting.
  const { defaultSortFields, premiumSortFields } = useQuestionCodingSorting();
  // Processing.
  const sortedQuestions = sortQuestionsMultiple(
    questionsWithCompletionStatus,
    userProfile?.isPremium
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
          href={prevQuestionButtonDisabled ? undefined : prevQuestion?.href}
          icon={RiArrowLeftSLine}
          isDisabled={prevQuestionButtonDisabled}
          isLabelHidden={true}
          label="Previous question"
          size="xs"
          tooltip="Previous question"
          variant="secondary"
        />
        <Button
          addonPosition="start"
          icon={RiListUnordered}
          isDisabled={isLoading}
          label="Question list"
          size="xs"
          variant="secondary"
          onClick={() => setShowQuestionsSlideOut(true)}
        />
        <Button
          addonPosition="start"
          href={nextQuestionButtonDisabled ? undefined : nextQuestion?.href}
          icon={RiArrowRightSLine}
          isDisabled={nextQuestionButtonDisabled}
          isLabelHidden={true}
          label="Next question"
          size="xs"
          tooltip="Next question"
          variant="secondary"
        />
      </div>
      <QuestionCodingListSlideOut
        isShown={showQuestionsSlideOut}
        questions={questionsWithCompletionStatus}
        onClose={() => setShowQuestionsSlideOut(false)}
      />
    </div>
  );
}
