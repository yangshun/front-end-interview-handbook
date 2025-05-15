'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import type {
  InterviewsQuestionItemMinimal,
  InterviewsQuestionItemWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { hasCompletedQuestion, hashQuestion } from '~/db/QuestionsUtils';

export default function useQuestionsWithCompletionStatus<
  Q extends InterviewsQuestionItemMinimal,
>(
  questions: ReadonlyArray<Q>,
  studyListKey?: string,
): ReadonlyArray<InterviewsQuestionItemWithCompletedStatus & Q> {
  const user = useUser();

  const { data: questionProgress } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: user != null && studyListKey == null,
    },
  );
  const { data: questionSessionProgress } =
    trpc.questionProgress.getStudyListProgress.useQuery(
      {
        studyListKey: studyListKey!,
      },
      {
        enabled: user != null && studyListKey != null,
      },
    );

  const questionsWithCompletionStatus = useMemo(() => {
    const completedQuestions = new Set(
      studyListKey
        ? (questionSessionProgress ?? []).map(({ key }) => key)
        : (questionProgress ?? []).map((item) => hashQuestion(item)),
    );

    return questions.map((question) => ({
      ...question,
      isCompleted: hasCompletedQuestion(completedQuestions, question),
    }));
  }, [questionProgress, questions, studyListKey, questionSessionProgress]);

  return questionsWithCompletionStatus;
}
