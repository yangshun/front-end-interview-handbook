'use client';

import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '~/components/questions/common/QuestionsTypes';

import { hasCompletedQuestion, hashQuestion } from '~/db/QuestionsUtils';

export default function useQuestionsWithCompletionStatus<
  Q extends QuestionMetadata,
>(
  questions: ReadonlyArray<Q>,
): ReadonlyArray<Q & QuestionMetadataWithCompletedStatus> {
  const { data: questionProgress } = trpc.questionProgress.getAll.useQuery();

  const questionsWithCompletionStatus = useMemo(() => {
    const completedQuestions = new Set(
      (questionProgress ?? []).map(({ format, slug }) =>
        hashQuestion(format, slug),
      ),
    );

    return questions.map((question) => ({
      ...question,
      isCompleted: hasCompletedQuestion(completedQuestions, question),
    }));
  }, [questionProgress, questions]);

  return questionsWithCompletionStatus;
}
