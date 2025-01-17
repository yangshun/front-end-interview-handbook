'use client';

import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { hasCompletedQuestion, hashQuestion } from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

export default function useQuestionsWithCompletionStatus<
  Q extends QuestionMetadata,
>(
  questions: ReadonlyArray<Q>,
  studyListKey?: string,
): ReadonlyArray<Q & QuestionMetadataWithCompletedStatus> {
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
