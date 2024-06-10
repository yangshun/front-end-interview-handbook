'use client';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { useQueryClient } from '@tanstack/react-query';

export function useQueryQuestionProgress(metadata: QuestionMetadata) {
  return trpc.questionProgress.get.useQuery({
    question: {
      format: metadata.format,
      slug: metadata.slug,
    },
  });
}

export function useMutationQuestionProgressAdd() {
  const context = trpc.useContext();
  const queryClient = useQueryClient();

  return trpc.questionProgress.add.useMutation({
    onSuccess: (data, variables) => {
      context.questionProgress.getAll.invalidate();
      context.questionProgress.get.setData({ question: variables }, data);

      // TODO(trpc): invalidate finegrain queries
      queryClient.invalidateQueries();
    },
  });
}

export function useMutationQuestionProgressDelete() {
  const context = trpc.useContext();
  const queryClient = useQueryClient();

  return trpc.questionProgress.delete.useMutation({
    onSuccess: (_, variables) => {
      context.questionProgress.getAll.invalidate();
      context.questionProgress.get.setData({ question: variables }, null);

      // TODO(trpc): invalidate finegrain queries
      queryClient.invalidateQueries();
    },
  });
}

export function useMutationQuestionProgressDeleteAll() {
  const context = trpc.useContext();
  const queryClient = useQueryClient();

  return trpc.questionProgress.deleteAll.useMutation({
    onSuccess: () => {
      context.questionProgress.getAll.invalidate();
      context.questionProgress.getAll.setData(undefined, undefined);

      // TODO(trpc): invalidate finegrain queries
      queryClient.invalidateQueries();
    },
  });
}

export function getQuestionMetadata(
  questions: ReadonlyArray<QuestionMetadata>,
  format: QuestionFormat,
  slug: string,
): QuestionMetadata | null {
  // TODO: This is a really inefficient O(n) lookup and doesn't scale when
  // the number of questions increase.
  // Combine on server when we hit scaling limits.
  const question = questions.find(
    (questionItem) =>
      questionItem.format === format && questionItem.slug === slug,
  );

  return question ?? null;
}
