'use client';

import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import { themeBorderElementColor } from '~/components/ui/theme';

import SponsorsAdFormatAvailableSlotInfo from './SponsorsAdFormatAvailableSlotInfo';
import SponsorsAdFormatHeader from './SponsorsAdFormatHeader';
import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';
import SponsorsAdFormatSpotlightSectionAccordionInfo from './SponsorsAdFormatSpotlightSectionAccordionInfo';

export default function SponsorsAdFormatSpotlightSection() {
  const FORMAT = 'SPOTLIGHT';
  const { impressions, pages } = SponsorAdFormatConfigs[FORMAT];

  const impressionsItems = [
    {
      key: 'item1',
      label: (
        <FormattedMessage
          defaultMessage="Will be rotated with an ad unit from 1 other sponsor"
          description="Item 1 for in content ad placement impressions info"
          id="9I1J4a"
          values={{
            bannerCount: '2-3',
          }}
        />
      ),
    },
    {
      key: 'item2',
      label: (
        <FormattedMessage
          defaultMessage="Based on weekly averages over last {days} days"
          description="Item 2 for placement impressions info"
          id="4JGMxB"
          values={{
            days: 90,
          }}
        />
      ),
    },
  ];
  const pagesItems = [
    {
      key: 'item1',
      label: (
        <FormattedMessage
          defaultMessage="Appears on question detail pages"
          description="Item 1 for placement pages info"
          id="IPcfhY"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <SponsorsAdFormatHeader format={FORMAT} />
      <div className="flex flex-col gap-10">
        <Asset />
        <div className="flex flex-col gap-x-6 gap-y-10 sm:flex-row">
          <SponsorsAdFormatInfo
            className="flex-1"
            items={impressionsItems}
            title={`${impressions}+`}
            type="impressions"
          />
          <SponsorsAdFormatInfo
            className="flex-1"
            items={pagesItems}
            title={`${pages}+`}
            type="pages"
          />
          <SponsorsAdFormatAvailableSlotInfo format={FORMAT} />
        </div>
        <SponsorsAdFormatSpotlightSectionAccordionInfo />
      </div>
    </div>
  );
}

function Asset() {
  return (
    <div
      className={clsx(
        'relative',
        'h-full w-full overflow-hidden sm:h-[155px] md:h-[180px] lg:h-[220px] xl:h-[240px]',
        'rounded-[4px] sm:rounded-lg lg:rounded-xl',
      )}>
      <div
        className={clsx(
          'pointer-events-none absolute inset-0',
          'rounded-[inherit]',
          ['border', themeBorderElementColor],
        )}></div>
      {/* Light mode image */}
      <picture className={clsx('block dark:hidden', 'h-full')}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/sponsors/spotlight-ad-placement-mobile-light.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/img/sponsors/spotlight-ad-placement-light.png"
        />
        <img
          alt="Spotlight ad placement preview"
          className={clsx('size-full', 'object-cover object-left-top')}
          decoding="async"
          loading="lazy"
          src="/img/sponsors/spotlight-ad-placement-light.png"
        />
      </picture>
      {/* Dark mode image */}
      <picture className={clsx('hidden dark:block', 'h-full')}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/sponsors/spotlight-ad-placement-mobile-dark.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/img/sponsors/spotlight-ad-placement-dark.png"
        />
        <img
          alt="Spotlight ad placement preview"
          className={clsx('size-full', 'object-cover object-left-top')}
          decoding="async"
          loading="lazy"
          src="/img/sponsors/spotlight-ad-placement-dark.png"
        />
      </picture>
    </div>
  );
}
