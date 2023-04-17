'use client';

import { trpc } from '~/hooks/trpc';

import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import type { QuestionProgressStatus } from './QuestionsProgressTypes';
import {
  genQuestionProgressAdd,
  genQuestionProgressDelete,
  genQuestionProgressDeleteAll,
} from './QuestionsProgressUniversal';

import { useUser } from '@supabase/auth-helpers-react';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useMutationQuestionProgressAdd() {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClientGFE();
  const context = trpc.useContext();

  return useMutation(
    async ({
      question,
      user,
      status,
    }: Readonly<{
      question: QuestionMetadata;
      status: QuestionProgressStatus;
      user: User;
    }>) => genQuestionProgressAdd(supabaseClient, user, question, status),
    {
      onSuccess: (data, { question }) => {
        queryClient.invalidateQueries(['questionProgressAll']);
        context.questionProgress.get.setData({ question }, data);
      },
    },
  );
}

export function useMutationQuestionProgressDelete() {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClientGFE();
  const context = trpc.useContext();

  return useMutation(
    async ({
      question,
      user,
    }: Readonly<{ question: QuestionMetadata; user: User }>) =>
      genQuestionProgressDelete(supabaseClient, user, question),
    {
      onSuccess: (_, { question }) => {
        queryClient.invalidateQueries(['questionProgressAll']);
        context.questionProgress.get.setData({ question }, null);
      },
    },
  );
}

export function useMutationQuestionProgressDeleteAll() {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClientGFE();

  return useMutation(
    async ({ user }: Readonly<{ user: User }>) =>
      genQuestionProgressDeleteAll(supabaseClient, user),
    {
      onSuccess: (_, { user }) => {
        queryClient.invalidateQueries(['questionProgressAll']);
        queryClient.setQueryData(['questionProgressAll', user], null);
      },
    },
  );
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
