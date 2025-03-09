'use client';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import type {
  SponsorsAdFormatInContentPlacement,
  SponsorsAdFormatInContentSize,
} from './SponsorsAdFormatInContent';
import SponsorsAdFormatInContent from './SponsorsAdFormatInContent';

function SponsorsAdFormatInContentContainerImpl({
  adPlacement,
  size,
}: Readonly<{
  adPlacement: SponsorsAdFormatInContentPlacement;
  size: SponsorsAdFormatInContentSize;
}>) {
  const { data, isLoading } = trpc.sponsorships.ad.useQuery({
    format: 'IN_CONTENT',
  });

  if (isLoading || data?.format !== 'IN_CONTENT') {
    return null;
  }

  return (
    <SponsorsAdFormatInContent
      adPlacement={adPlacement}
      size={size}
      {...data}
    />
  );
}

export default function SponsorsAdFormatInContentContainer({
  adPlacement,
  size,
}: Readonly<{
  adPlacement: SponsorsAdFormatInContentPlacement;
  size: SponsorsAdFormatInContentSize;
}>) {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return (
    <SponsorsAdFormatInContentContainerImpl
      adPlacement={adPlacement}
      size={size}
    />
  );
}
