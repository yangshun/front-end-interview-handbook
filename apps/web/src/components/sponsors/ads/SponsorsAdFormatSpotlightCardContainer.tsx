import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import type { SponsorsAdFormatSpotlightPlacement } from './SponsorsAdFormatSpotlight';
import SponsorsAdFormatSpotlightCard from './SponsorsAdFormatSpotlightCard';

export default function SponsorsAdFormatSpotlightCardContainer({
  adPlacement,
  tracking,
}: Readonly<{
  adPlacement: SponsorsAdFormatSpotlightPlacement;
  tracking?: boolean;
}>) {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return (
    <SponsorsAdFormatSpotlightCardImpl
      adPlacement={adPlacement}
      tracking={tracking}
    />
  );
}

function SponsorsAdFormatSpotlightCardImpl({
  adPlacement,
  tracking,
}: Readonly<{
  adPlacement: SponsorsAdFormatSpotlightPlacement;
  tracking?: boolean;
}>) {
  const { data, isLoading } = trpc.sponsorships.ad.useQuery({
    format: 'SPOTLIGHT',
  });

  if (isLoading || data?.format !== 'SPOTLIGHT') {
    return null;
  }

  return (
    <SponsorsAdFormatSpotlightCard
      adPlacement={adPlacement}
      tracking={tracking}
      {...data}
    />
  );
}
