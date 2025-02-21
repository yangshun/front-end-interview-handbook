'use client';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import SponsorsAdPlacementSpotlight from './SponsorsAdPlacementSpotlight';

function SponsorsAdPlacementSpotlightContainer() {
  const { data, isLoading } = trpc.sponsorships.ad.useQuery({
    placement: 'SPOTLIGHT',
  });

  if (isLoading || data?.placement !== 'SPOTLIGHT') {
    return null;
  }

  return <SponsorsAdPlacementSpotlight {...data} />;
}

export default function SponsorsAdPlacementSpotlightContainerWrapper() {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return <SponsorsAdPlacementSpotlightContainer />;
}
