import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import {
  themeBackgroundCardColor,
  themeBorderColor,
} from '~/components/ui/theme';

import SponsorsAdFormatSpotlight from './SponsorsAdFormatSpotlight';

export default function SponsorsAdFormatSpotlightCard() {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return <SponsorsAdFormatSpotlightCardImpl />;
}

function SponsorsAdFormatSpotlightCardImpl() {
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
        ['border', themeBorderColor],
        'rounded-lg',
      )}>
      <SponsorsAdFormatSpotlight {...data} />
    </div>
  );
}
