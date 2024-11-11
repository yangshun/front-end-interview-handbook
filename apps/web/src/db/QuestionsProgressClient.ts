'use client';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { useUser } from '@supabase/auth-helpers-react';

export function useQueryQuestionProgress(
  metadata: QuestionMetadata,
  listKey?: string,
) {
  const user = useUser();

  return trpc.questionProgress.get.useQuery(
    {
      listKey,
      question: {
        format: metadata.format,
        slug: metadata.slug,
      },
    },
    {
      enabled: !!user, // Only enable the query if the user is logged in
    },
  );
}

export function useMutationQuestionProgressAdd() {
  const trpcUtils = trpc.useUtils();

  return trpc.questionProgress.add.useMutation({
    onSuccess: () => {
      // TODO(interviews): find out why setData is not working
      // trpcUtils.questionProgress.get.setData({ question: variables }, data);
      trpcUtils.questionProgress.invalidate();
    },
  });
}

export function useMutationQuestionProgressDelete() {
  const trpcUtils = trpc.useUtils();

  return trpc.questionProgress.delete.useMutation({
    onSuccess: () => {
      trpcUtils.questionProgress.invalidate();
    },
  });
}

export function useMutationQuestionProgressDeleteAll() {
  const trpcUtils = trpc.useUtils();

  return trpc.questionProgress.deleteAll.useMutation({
    onSuccess: () => {
      trpcUtils.questionProgress.invalidate();
    },
  });
}

export function getQuestionMetadata(
  questions: ReadonlyArray<QuestionMetadata>,
  format: QuestionFormat,
  slug: string,
): QuestionMetadata | null {
  // TODO(interviews): This is a really inefficient O(n) lookup and doesn't scale when
  // the number of questions increase.
  // Combine on server when we hit scaling limits.
  const question = questions.find(
    (questionItem) =>
      questionItem.format === format && questionItem.slug === slug,
  );

  return question ?? null;
}
