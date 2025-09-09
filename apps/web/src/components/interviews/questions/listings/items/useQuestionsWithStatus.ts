'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionMetadata,
  QuestionMetadataWithStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';

import {
  hasBookmarkedQuestion,
  hasCompletedQuestion,
  hashQuestion,
} from '~/db/QuestionsUtils';

export default function useQuestionsWithStatus<Q extends QuestionMetadata>(
  questions: ReadonlyArray<Q>,
  studyListKey?: string,
): ReadonlyArray<Q & QuestionMetadataWithStatus> {
  const user = useUser();

  const { data: questionProgress } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: user != null && studyListKey == null,
    },
  );
  const { data: bookmarkedQuestions } = trpc.bookmark.getAll.useQuery(
    undefined,
    {
      enabled: user != null,
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
    const bookmarkedQuestionsSet = new Set(
      (bookmarkedQuestions ?? []).map((item) => hashQuestion(item)),
    );

    return questions.map((question) => ({
      ...question,
      isBookmarked: hasBookmarkedQuestion(bookmarkedQuestionsSet, question),
      isCompleted: hasCompletedQuestion(completedQuestions, question),
    }));
  }, [
    questionProgress,
    questions,
    studyListKey,
    questionSessionProgress,
    bookmarkedQuestions,
  ]);

  return questionsWithCompletionStatus;
}
