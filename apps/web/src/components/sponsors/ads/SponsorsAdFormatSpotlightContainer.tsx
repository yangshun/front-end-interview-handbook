'use client';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import SponsorsAdFormatSpotlight from './SponsorsAdFormatSpotlight';

function SponsorsAdFormatSpotlightContainer() {
  const { data, isLoading } = trpc.sponsorships.ad.useQuery({
    format: 'SPOTLIGHT',
  });

  if (isLoading || data?.format !== 'SPOTLIGHT') {
    return null;
  }

  return <SponsorsAdFormatSpotlight {...data} />;
}

export default function SponsorsAdFormatSpotlightContainerWrapper() {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return <SponsorsAdFormatSpotlightContainer />;
}
