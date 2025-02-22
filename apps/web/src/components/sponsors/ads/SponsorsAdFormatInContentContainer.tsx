'use client';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import type { SponsorsAdFormatInContentSize } from './SponsorsAdFormatInContent';
import SponsorsAdFormatInContent from './SponsorsAdFormatInContent';

function SponsorsAdFormatInContentContainer({
  size,
}: Readonly<{
  size: SponsorsAdFormatInContentSize;
}>) {
  const { data, isLoading } = trpc.sponsorships.ad.useQuery({
    placement: 'IN_CONTENT',
  });

  if (isLoading || data?.format !== 'IN_CONTENT') {
    return null;
  }

  return <SponsorsAdFormatInContent size={size} {...data} />;
}

export default function SponsorsAdFormatInContentContainerWrapper({
  size,
}: Readonly<{
  size: SponsorsAdFormatInContentSize;
}>) {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return <SponsorsAdFormatInContentContainer size={size} />;
}
