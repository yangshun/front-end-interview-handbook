'use client';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';

export function useMutationQuestionProgressAdd() {
  const context = trpc.useContext();

  return trpc.questionProgress.add.useMutation({
    onSuccess: (data, variables) => {
      context.questionProgress.getAll.invalidate();
      context.questionProgress.get.setData({ question: variables }, data);
    },
  });
}

export function useMutationQuestionProgressDelete() {
  const context = trpc.useContext();

  return trpc.questionProgress.delete.useMutation({
    onSuccess: (_, variables) => {
      context.questionProgress.getAll.invalidate();
      context.questionProgress.get.setData({ question: variables }, null);
    },
  });
}

export function useMutationQuestionProgressDeleteAll() {
  const context = trpc.useContext();

  return trpc.questionProgress.deleteAll.useMutation({
    onSuccess: () => {
      context.questionProgress.getAll.invalidate();
      context.questionProgress.getAll.setData(undefined, null);
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
