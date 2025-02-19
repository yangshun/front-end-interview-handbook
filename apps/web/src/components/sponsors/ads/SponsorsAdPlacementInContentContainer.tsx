'use client';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import type { SponsorsAdPlacementInContentSize } from './SponsorsAdPlacementInContent';
import SponsorsAdPlacementInContent from './SponsorsAdPlacementInContent';

function SponsorsAdPlacementInContentContainer({
  size,
}: Readonly<{
  size: SponsorsAdPlacementInContentSize;
}>) {
  const { data, isLoading } = trpc.sponsorships.ad.useQuery({
    placement: 'IN_CONTENT',
  });

  if (isLoading || data?.placement !== 'IN_CONTENT') {
    return null;
  }

  return <SponsorsAdPlacementInContent size={size} {...data} />;
}

export default function SponsorsAdPlacementInContentContainerWrapper({
  size,
}: Readonly<{
  size: SponsorsAdPlacementInContentSize;
}>) {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return <SponsorsAdPlacementInContentContainer size={size} />;
}
