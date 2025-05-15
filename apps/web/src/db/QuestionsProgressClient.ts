'use client';

import { useUser } from '@supabase/auth-helpers-react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type { InterviewsQuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

export function useQueryQuestionProgress(
  metadata: Pick<InterviewsQuestionMetadata, 'format' | 'slug'>,
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
      trpcUtils.questionProgress.invalidate();
      trpcUtils.questionSessions.invalidate();

      if (data?.newSessionCreated) {
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
      trpcUtils.questionSessions.invalidate();
    },
  });
}

export function useMutationQuestionProgressDeleteAll() {
  const trpcUtils = trpc.useUtils();

  return trpc.questionProgress.deleteAll.useMutation({
    onSuccess: () => {
      trpcUtils.questionProgress.invalidate();
      trpcUtils.questionSessions.invalidate();
    },
  });
}
