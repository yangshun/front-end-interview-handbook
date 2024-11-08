'use client';

import { trpc } from '~/hooks/trpc';

import type { GuideMetadata } from '~/components/guides/types';

import {
  frontendInterviewSlugs,
  frontendSystemDesignSlugs,
  hashGuide,
  unhashGuide,
} from './GuidesUtils';

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

export function useGuideCompletionCount() {
  const user = useUser();
  const { data: guideProgress } = trpc.guideProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );

  if (!guideProgress) {
    return {
      frontendInterviewPlaybook: {
        completed: 0,
        total: frontendInterviewSlugs.length,
      },
      systemDesignPlaybook: {
        completed: 0,
        total: frontendSystemDesignSlugs.length,
      },
    };
  }

  const completedGuides = new Set(
    guideProgress.map(({ type, slug }) => hashGuide(type, slug)),
  );

  const {
    frontendInterviewPlaybookCompletionCount,
    systemDesignPlaybookCompletionCount,
  } = Array.from(completedGuides).reduce(
    (counts, item) => {
      const [type] = unhashGuide(item);

      if (type === 'front-end-interview-guide') {
        counts.frontendInterviewPlaybookCompletionCount++;
      }
      if (type === 'system-design-guide') {
        counts.systemDesignPlaybookCompletionCount++;
      }

      return counts;
    },
    {
      frontendInterviewPlaybookCompletionCount: 0,
      systemDesignPlaybookCompletionCount: 0,
    },
  );

  return {
    frontendInterviewPlaybook: {
      completed: frontendInterviewPlaybookCompletionCount,
      total: frontendInterviewSlugs.length,
    },
    systemDesignPlaybook: {
      completed: systemDesignPlaybookCompletionCount,
      total: frontendSystemDesignSlugs.length,
    },
  };
}
