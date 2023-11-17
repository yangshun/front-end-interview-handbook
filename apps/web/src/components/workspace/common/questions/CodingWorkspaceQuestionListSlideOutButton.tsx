import { useState } from 'react';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiListUnordered,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionsWithCompletionStatus from '~/components/interviews/questions/listings/filters/hooks/useQuestionsWithCompletionStatus';
import Button from '~/components/ui/Button';
import QuestionCodingListSlideOut from '~/components/workspace/common/questions/CodingWorkspaceQuestionListSlideOut';

import { hashQuestion } from '~/db/QuestionsUtils';

export default function CodingWorkspaceQuestionListSlideOutButton({
  metadata,
}: Readonly<{
  metadata: QuestionMetadata;
}>) {
  const { isLoading, data: codingQuestions } = trpc.questions.coding.useQuery();
  const questionsWithCompletionStatus = useQuestionsWithCompletionStatus(
    codingQuestions ?? [],
  );
  const [showQuestionsSlideOut, setShowQuestionsSlideOut] = useState(false);

  const currentQuestionIndex = questionsWithCompletionStatus
    // .filter((question) => !question.isCompleted)
    .findIndex(
      (question) =>
        hashQuestion(question.format, question.slug) ===
        hashQuestion(metadata.format, metadata.slug),
    );

  const prevQuestion = questionsWithCompletionStatus[currentQuestionIndex - 1];
  const nextQuestion = questionsWithCompletionStatus[currentQuestionIndex + 1];

  return (
    <div>
      <div className="flex gap-x-2">
        <Button
          addonPosition="start"
          href={prevQuestion?.href}
          icon={RiArrowLeftSLine}
          isDisabled={isLoading || prevQuestion == null}
          isLabelHidden={true}
          label="Previous question"
          size="xs"
          tooltip="Previous question"
          tooltipPosition="above"
          variant="secondary"
        />
        <Button
          addonPosition="start"
          icon={RiListUnordered}
          isDisabled={isLoading}
          label="All Questions"
          size="xs"
          tooltip="View questions list"
          tooltipPosition="above"
          variant="secondary"
          onClick={() => setShowQuestionsSlideOut(true)}
        />
        <Button
          addonPosition="start"
          href={nextQuestion?.href}
          icon={RiArrowRightSLine}
          isDisabled={isLoading || nextQuestion == null}
          isLabelHidden={true}
          label="Next question"
          size="xs"
          tooltip="Next question"
          tooltipPosition="above"
          variant="secondary"
        />
      </div>
      <QuestionCodingListSlideOut
        isShown={showQuestionsSlideOut}
        questionsWithCompletionStatus={questionsWithCompletionStatus}
        onClose={() => setShowQuestionsSlideOut(false)}
      />
    </div>
  );
}
