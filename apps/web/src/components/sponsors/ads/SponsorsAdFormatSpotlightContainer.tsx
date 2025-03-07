'use client';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import type { SponsorsAdFormatSpotlightPlacement } from './SponsorsAdFormatSpotlight';
import SponsorsAdFormatSpotlight from './SponsorsAdFormatSpotlight';

function SponsorsAdFormatSpotlightContainer({
  adPlacement,
}: Readonly<{
  adPlacement: SponsorsAdFormatSpotlightPlacement;
}>) {
  const { data, isLoading } = trpc.sponsorships.ad.useQuery({
    format: 'SPOTLIGHT',
  });

  if (isLoading || data?.format !== 'SPOTLIGHT') {
    return null;
  }

  return <SponsorsAdFormatSpotlight adPlacement={adPlacement} {...data} />;
}

export default function SponsorsAdFormatSpotlightContainerWrapper({
  adPlacement,
}: Readonly<{
  adPlacement: SponsorsAdFormatSpotlightPlacement;
}>) {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return <SponsorsAdFormatSpotlightContainer adPlacement={adPlacement} />;
}
