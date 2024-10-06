'use client';

import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import { hasCompletedGuide, hashGuide } from '~/db/guides/GuidesUtils';

import type {
  GuideCardMetadata,
  GuideCardMetadataWithCompletedStatus,
} from './types';

import { useUser } from '@supabase/auth-helpers-react';

export default function useGuidesWithCompletionStatus<
  Q extends GuideCardMetadata,
>(
  guides: ReadonlyArray<Q>,
): ReadonlyArray<GuideCardMetadataWithCompletedStatus & Q> {
  const user = useUser();

  const { data: guideProgress } = trpc.guideProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );

  const guidesWithCompletionStatus = useMemo(() => {
    const completedGuides = new Set(
      (guideProgress ?? []).map(({ type, slug }) => hashGuide(type, slug)),
    );

    return guides.map((guide) => ({
      ...guide,
      isCompleted: hasCompletedGuide(completedGuides, guide),
    }));
  }, [guideProgress, guides]);

  return guidesWithCompletionStatus;
}
