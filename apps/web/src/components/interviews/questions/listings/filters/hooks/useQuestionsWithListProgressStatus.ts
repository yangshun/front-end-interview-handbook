'use client';

import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { hasCompletedQuestion } from '~/db/QuestionsUtils';

export default function useQuestionsWithListProgressStatus<
  Q extends QuestionMetadata,
>(
  listKey: string,
  questions: ReadonlyArray<Q>,
): ReadonlyArray<Q & QuestionMetadataWithCompletedStatus> {
  const { data: questionListProgress } =
    trpc.questionLists.getSessionProgress.useQuery({
      listKey,
    });

  const questionsWithCompletionStatus = useMemo(() => {
    const completedQuestions = new Set(
      (questionListProgress ?? []).map(({ key }) => key),
    );

    return questions.map((question) => ({
      ...question,
      isCompleted: hasCompletedQuestion(completedQuestions, question),
    }));
  }, [questionListProgress, questions]);

  return questionsWithCompletionStatus;
}
