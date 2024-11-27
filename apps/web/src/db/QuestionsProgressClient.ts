'use client';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

import { useUser } from '@supabase/auth-helpers-react';

export function useQueryQuestionProgress(
  metadata: QuestionMetadata,
  studyListKey: string | null,
) {
  const user = useUser();

  return trpc.questionProgress.get.useQuery(
    {
      question: {
        format: metadata.format,
        slug: metadata.slug,
      },
      studyListKey: studyListKey ?? undefined,
    },
    {
      enabled: user != null, // Only enable the query if the user is logged in
    },
  );
}

export function useMutationQuestionProgressAdd() {
  const intl = useIntl();
  const { showToast } = useToast();
  const trpcUtils = trpc.useUtils();

  return trpc.questionProgress.add.useMutation({
    onSuccess: (data) => {
      // TODO(interviews): find out why setData is not working
      // trpcUtils.questionProgress.get.setData({ question: variables }, data);
      trpcUtils.questionProgress.invalidate();

      if (data?.newSessionCreated) {
        trpcUtils.questionLists.invalidate();
        if (data.studyListName) {
          showToast({
            title: intl.formatMessage(
              {
                defaultMessage:
                  "We've started tracking your progress for {studyListName}",
                description: 'Success message for starting a study plan',
                id: 'mVFZ09',
              },
              {
                studyListName: data.studyListName,
              },
            ),
            variant: 'success',
          });
        } else {
          showToast({
            title: intl.formatMessage({
              defaultMessage: "We've started tracking your progress",
              description: 'Success message for starting a study plan',
              id: 'HJ+bJn',
            }),
            variant: 'success',
          });
        }
      }
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
