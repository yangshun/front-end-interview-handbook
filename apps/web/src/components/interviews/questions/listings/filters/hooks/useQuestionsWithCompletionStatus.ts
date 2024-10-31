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
  listKey?: string,
): ReadonlyArray<Q & QuestionMetadataWithCompletedStatus> {
  const user = useUser();

  const { data: questionProgress } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user && !listKey,
    },
  );
  const { data: questionSessionProgress } =
    trpc.questionLists.getSessionProgress.useQuery(
      {
        listKey: listKey!,
      },
      {
        enabled: !!user && !!listKey,
      },
    );

  const questionsWithCompletionStatus = useMemo(() => {
    const completedQuestions = new Set(
      listKey
        ? (questionSessionProgress ?? []).map(({ key }) => key)
        : (questionProgress ?? []).map(({ format, slug }) =>
            hashQuestion(format, slug),
          ),
    );

    return questions.map((question) => ({
      ...question,
      isCompleted: hasCompletedQuestion(completedQuestions, question),
    }));
  }, [questionProgress, questions, listKey, questionSessionProgress]);

  return questionsWithCompletionStatus;
}
