'use client';

import { trpc } from '~/hooks/trpc';

import type { GuideMetadata } from '~/components/guides/types';

import { useUser } from '@supabase/auth-helpers-react';

export function useQueryGuideProgress(metadata: GuideMetadata) {
  const user = useUser();

  return trpc.guideProgress.get.useQuery(
    {
      guide: {
        category: metadata.category,
        slug: metadata.slug,
      },
    },
    {
      enabled: !!user, // Only enable the query if the user is logged in
    },
  );
}

export function useMutationGuideProgressAdd() {
  const trpcUtils = trpc.useUtils();

  return trpc.guideProgress.add.useMutation({
    onSuccess: () => {
      trpcUtils.guideProgress.invalidate();
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
