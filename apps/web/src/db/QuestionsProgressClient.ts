'use client';

import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import type {
  QuestionProgress,
  QuestionProgressStatus,
} from './QuestionsProgressTypes';
import {
  genQuestionProgress,
  genQuestionProgressAdd,
  genQuestionProgressAll,
  genQuestionProgressDelete,
} from './QuestionsProgressUniversal';

import { useUser } from '@supabase/auth-helpers-react';
import type { User } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useQueryQuestionProgressAll() {
  const supabaseClient = useSupabaseClientGFE();
  const user = useUser();

  return useQuery(['questionProgressAll', user], ({ queryKey }) => {
    // TODO: Let queryKey type be inferred.
    const user_ = queryKey[1] as User | null;

    if (user_ == null) {
      return null;
    }

    return genQuestionProgressAll(supabaseClient, user_);
  });
}

export function useQueryQuestionProgress(
  question: QuestionMetadata,
  initialData?: QuestionProgress | null,
) {
  const user = useUser();
  const supabaseClient = useSupabaseClientGFE();

  return useQuery(
    ['questionProgress', question, user],
    ({ queryKey }) => {
      // TODO: Let queryKey type be inferred.
      const user_ = queryKey[2] as User | null;

      if (user_ == null) {
        return null;
      }

      return genQuestionProgress(supabaseClient, user_, question);
    },
    initialData != null
      ? {
          initialData,
        }
      : undefined,
  );
}

export function useMutationQuestionProgressAdd() {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClientGFE();

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
      onSuccess: (data, { question, user }) => {
        queryClient.invalidateQueries(['questionProgressAll']);
        queryClient.setQueryData(['questionProgress', question, user], data);
      },
    },
  );
}

export function useMutationQuestionProgressDelete() {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClientGFE();

  return useMutation(
    async ({
      question,
      user,
    }: Readonly<{ question: QuestionMetadata; user: User }>) =>
      genQuestionProgressDelete(supabaseClient, user, question),
    {
      onSuccess: (_, { question, user }) => {
        queryClient.invalidateQueries(['questionProgressAll']);
        queryClient.setQueryData(['questionProgress', question, user], null);
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
