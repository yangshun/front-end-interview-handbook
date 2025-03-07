import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import {
  themeBackgroundCardColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

import type { SponsorsAdFormatSpotlightPlacement } from './SponsorsAdFormatSpotlight';
import SponsorsAdFormatSpotlight from './SponsorsAdFormatSpotlight';

export default function SponsorsAdFormatSpotlightCard({
  adPlacement,
}: Readonly<{
  adPlacement: SponsorsAdFormatSpotlightPlacement;
}>) {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return <SponsorsAdFormatSpotlightCardImpl adPlacement={adPlacement} />;
}

function SponsorsAdFormatSpotlightCardImpl({
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

  return (
    <div
      className={clsx(
        'w-full lg:w-auto lg:max-w-[337px]',
        'p-5',
        themeBackgroundCardColor,
        themeGlassyBorder,
        'rounded-lg',
      )}>
      <SponsorsAdFormatSpotlight
        adPlacement={adPlacement}
        textWeight="medium"
        {...data}
      />
    </div>
  );
}
