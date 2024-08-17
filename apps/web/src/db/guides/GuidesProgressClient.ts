'use client';

import { trpc } from '~/hooks/trpc';

import type { GuideMetadata } from '~/components/guides/types';

export function useQueryGuideProgress(metadata: GuideMetadata) {
  return trpc.guideProgress.get.useQuery({
    guide: {
      category: metadata.category,
      slug: metadata.slug,
    },
  });
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
