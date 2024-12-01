import { useCallback, useEffect, useState } from 'react';

import { trpc } from '~/hooks/trpc';
import useQueryParamAction from '~/hooks/useQueryParamAction';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';

import {
  useMutationGuideProgressAdd,
  useMutationGuideProgressDelete,
} from '~/db/guides/GuidesProgressClient';

import type { GuidebookItem } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';

const MARK_GUIDE_COMPLETE_ACTION = 'mark-guide-complete';

export default function useGuidesActions() {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const user = useUser();
  const { showToast } = useToast();
  const addGuideProgressMutation = useMutationGuideProgressAdd();
  const deleteGuideProgressMutation = useMutationGuideProgressDelete();
  const [automaticallyMarkCompleteGuide, setAutomaticallyMarkCompleteGuide] =
    useState<{ book: GuidebookItem; id: string; title: string } | null>(null);

  const addQueryParamToPath = useQueryParamAction<'book' | 'id' | 'title'>(
    MARK_GUIDE_COMPLETE_ACTION,
    (params) => {
      if (params) {
        setAutomaticallyMarkCompleteGuide(
          params as Readonly<{
            book: GuidebookItem;
            id: string;
            title: string;
          }>,
        );
      }
    },
    ['title', 'id', 'book'],
  );

  const markGuideAsCompleted = useCallback(
    (guide: Readonly<{ book: GuidebookItem; id: string; title: string }>) => {
      addGuideProgressMutation.mutate(
        {
          book: guide.book,
          slug: guide.id,
          title: guide.title,
        },
        {
          onSuccess: () => {
            trpcUtils.guideProgress.invalidate();
          },
        },
      );
    },
    [addGuideProgressMutation, trpcUtils],
  );

  useEffect(() => {
    if (user == null) {
      return;
    }

    if (automaticallyMarkCompleteGuide == null) {
      return;
    }

    markGuideAsCompleted(
      automaticallyMarkCompleteGuide as Readonly<{
        book: GuidebookItem;
        id: string;
        title: string;
      }>,
    );
    setAutomaticallyMarkCompleteGuide(null);
  }, [automaticallyMarkCompleteGuide, markGuideAsCompleted, user]);

  function markGuideAsNotCompleted(
    guide: Readonly<{ book: GuidebookItem; id: string; title: string }>,
  ) {
    if (user == null) {
      return;
    }

    deleteGuideProgressMutation.mutate(
      {
        book: guide.book,
        slug: guide.id,
      },
      {
        onError: () => {
          showToast({
            title: intl.formatMessage({
              defaultMessage:
                'Failed to mark article as not complete. Please try again',
              description:
                'Error message shown when a guide has failed to mark as not complete',
              id: 'i+5/Aq',
            }),
            variant: 'danger',
          });
        },
        onSuccess: () => {
          showToast({
            title: intl.formatMessage(
              {
                defaultMessage: 'Marked "{articleTitle}" as not completed',
                description:
                  'Success message for marking a question as not completed',
                id: 'yjjdMB',
              },
              {
                articleTitle: guide.title,
              },
            ),
            variant: 'info',
          });
        },
      },
    );
  }

  return { addQueryParamToPath, markGuideAsCompleted, markGuideAsNotCompleted };
}
