'use client';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import type {
  SponsorsAdFormatSpotlightPlacement,
  SponsorsAdFormatSpotlightSize,
} from './SponsorsAdFormatSpotlight';
import SponsorsAdFormatSpotlight from './SponsorsAdFormatSpotlight';

function SponsorsAdFormatSpotlightContainerImpl({
  adPlacement,
  size,
}: Readonly<{
  adPlacement: SponsorsAdFormatSpotlightPlacement;
  size?: SponsorsAdFormatSpotlightSize;
}>) {
  const { data, isLoading } = trpc.sponsors.ad.useQuery({
    format: 'SPOTLIGHT',
  });

  if (isLoading || data?.format !== 'SPOTLIGHT') {
    return null;
  }

  return (
    <SponsorsAdFormatSpotlight
      adPlacement={adPlacement}
      size={size}
      {...data}
    />
  );
}

export default function SponsorsAdFormatSpotlightContainer({
  adPlacement,
  size,
}: Readonly<{
  adPlacement: SponsorsAdFormatSpotlightPlacement;
  size?: SponsorsAdFormatSpotlightSize;
}>) {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return (
    <SponsorsAdFormatSpotlightContainerImpl
      adPlacement={adPlacement}
      size={size}
    />
  );
}
