'use client';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type { GuideMetadata } from '~/components/guides/types';
import { useIntl } from '~/components/intl';

import { useUser } from '@supabase/auth-helpers-react';

export function useQueryGuideProgress(metadata: GuideMetadata) {
  const user = useUser();

  return trpc.guideProgress.get.useQuery(
    {
      guide: {
        book: metadata.book,
        slug: metadata.id,
      },
    },
    {
      enabled: !!user, // Only enable the query if the user is logged in
    },
  );
}

export function useMutationGuideProgressAdd() {
  const trpcUtils = trpc.useUtils();
  const { showToast } = useToast();
  const intl = useIntl();

  return trpc.guideProgress.add.useMutation({
    onError: () => {
      showToast({
        title: intl.formatMessage({
          defaultMessage:
            'Failed to mark article as complete. Please try again',
          description:
            'Error message shown when a guide has failed to mark as complete',
          id: '6eVVTu',
        }),
        variant: 'danger',
      });
    },
    onSuccess: (_, variables) => {
      trpcUtils.guideProgress.invalidate();
      showToast({
        title: intl.formatMessage(
          {
            defaultMessage: 'Marked "{articleTitle}" as complete',
            description: 'Success message for marking a question as complete',
            id: 'GoDdwh',
          },
          {
            articleTitle: variables.title,
          },
        ),
        variant: 'success',
      });
    },
  });
}

export function useMutationGuideProgressDelete() {
  const trpcUtils = trpc.useUtils();

  return trpc.guideProgress.delete.useMutation({
    onSuccess: () => {
      trpcUtils.guideProgress.invalidate();
    },
  });
}

export function useMutationGuideProgressDeleteAll() {
  const trpcUtils = trpc.useUtils();

  return trpc.guideProgress.deleteAll.useMutation({
    onSuccess: () => {
      trpcUtils.guideProgress.invalidate();
    },
  });
}
