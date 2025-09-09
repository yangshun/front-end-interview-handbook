'use client';

import { useUser } from '@supabase/auth-helpers-react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

export function useQueryQuestionBookmark(
  metadata: Pick<QuestionMetadata, 'format' | 'slug'>,
) {
  const user = useUser();

  return trpc.bookmark.get.useQuery(
    {
      question: {
        format: metadata.format,
        slug: metadata.slug,
      },
    },
    {
      enabled: user != null, // Only enable the query if the user is logged in
    },
  );
}

export function useMutationQuestionBookmarkAdd() {
  const intl = useIntl();
  const { showToast } = useToast();
  const trpcUtils = trpc.useUtils();

  return trpc.bookmark.add.useMutation({
    onError: (error) => {
      showToast({
        description: error.message,
        title: intl.formatMessage({
          defaultMessage: 'Failed to bookmark question',
          description:
            'Error message shown when a question fails to be bookmarked',
          id: 'Tq/FEc',
        }),
        variant: 'danger',
      });
    },
    onSuccess: () => {
      trpcUtils.bookmark.invalidate();

      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Successfully bookmarked!',
          description: 'Success message when a question is bookmarked',
          id: 'rjzhbH',
        }),
        variant: 'success',
      });
    },
  });
}

export function useMutationQuestionBookmarkDelete() {
  const intl = useIntl();
  const { showToast } = useToast();
  const trpcUtils = trpc.useUtils();

  return trpc.bookmark.delete.useMutation({
    onError: (error) => {
      showToast({
        description: error.message,
        title: intl.formatMessage({
          defaultMessage: 'Failed to remove bookmark',
          description:
            'Error message shown when a bookmark fails to be removed',
          id: 'q4smX6',
        }),
        variant: 'danger',
      });
    },
    onSuccess: () => {
      trpcUtils.bookmark.invalidate();

      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Successfully removed!',
          description: 'Success message when a bookmark is removed',
          id: 'Ym4Ofx',
        }),
        variant: 'info',
      });
    },
  });
}
