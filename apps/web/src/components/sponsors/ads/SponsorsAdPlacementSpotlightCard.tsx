import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import {
  themeBackgroundCardColor,
  themeBorderColor,
} from '~/components/ui/theme';

import SponsorsAdPlacementSpotlight from './SponsorsAdPlacementSpotlight';

export default function SponsorsAdPlacementSpotlightCard() {
  if (!SPONSORSHIPS_AVAILABLE) {
    return null;
  }

  return <SponsorsAdPlacementSpotlightCardImpl />;
}

function SponsorsAdPlacementSpotlightCardImpl() {
  const { data, isLoading } = trpc.sponsorships.ad.useQuery({
    placement: 'SPOTLIGHT',
  });

  if (isLoading || data?.placement !== 'SPOTLIGHT') {
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
      <SponsorsAdPlacementSpotlight {...data} />
    </div>
  );
}
