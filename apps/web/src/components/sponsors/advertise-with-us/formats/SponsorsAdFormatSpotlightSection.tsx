'use client';

import clsx from 'clsx';
import { RiCheckLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Text from '~/components/ui/Text';
import {
  themeBorderElementColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';

import SponsorsAdFormatAvailableSlotInfo from './SponsorsAdFormatAvailableSlotInfo';
import SponsorsAdFormatHeader from './SponsorsAdFormatHeader';
import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';
import SponsorsAdFormatInfoAccordion from './SponsorsAdFormatInfoAccordion';
import SponsorsAdFormatPlacementInfo from './SponsorsAdFormatPlacementInfo';

export default function SponsorsAdFormatSpotlightSection() {
  const FORMAT = 'SPOTLIGHT';
  const intl = useIntl();
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
          defaultMessage="Includes all our questions and guides pages"
          description="Item 1 for placement pages info"
          id="YQ5lLr"
        />
      ),
    },
  ];

  const placementConstraints = [
    {
      key: 'title',
      label: (
        <FormattedMessage
          defaultMessage="One-liner: {characterLimit} characters maximum, not more than 1 link"
          description="Title placement constraints"
          id="Z40/iW"
          values={{
            characterLimit:
              SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.text,
          }}
        />
      ),
    },
    {
      key: 'image',
      label: (
        <FormattedMessage
          defaultMessage="Image: {width}px x {height}px ({ratio}:1 ratio)"
          description="Image placement constraints"
          id="1qwgK6"
          values={{
            height:
              SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                ?.height,
            ratio:
              (SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                ?.width ?? 0) /
              (SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                ?.height ?? 1),
            width:
              SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                ?.width,
          }}
        />
      ),
    },
  ];

  const placementInfo = [
    {
      img: {
        alt: 'Spotlight Ad Placement in app sidebar',
        srcDark: '/img/sponsors/spotlight-placement-sidebar-dark.png',
        srcLight: '/img/sponsors/spotlight-placement-sidebar-light.png',
      },
      key: 'sidebar',
      title: intl.formatMessage({
        defaultMessage: 'Application Sidebar',
        description: 'Label for spotlight ad placement in app sidebar',
        id: 'jNY7ys',
      }),
    },
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{pagesCount}+ pages',
          description: 'Label for pages count',
          id: 'EVrvEF',
        },
        { pagesCount: 30 },
      ),
      img: {
        alt: 'Spotlight Ad Placement in question listing',
        srcDark: '/img/sponsors/spotlight-placement-question-listing-dark.png',
        srcLight:
          '/img/sponsors/spotlight-placement-question-listing-light.png',
      },
      key: 'questions-listing',
      title: intl.formatMessage({
        defaultMessage: 'All Question Listing pages',
        description: 'Label for spotlight ad placement in question listing',
        id: 'SACEEk',
      }),
    },
    {
      badgeLabel: intl.formatMessage(
        {
          defaultMessage: '{pagesCount}+ pages',
          description: 'Label for pages count',
          id: 'EVrvEF',
        },
        { pagesCount: 20 },
      ),
      img: {
        alt: 'Spotlight Ad Placement in question detail page',
        srcDark: '/img/sponsors/spotlight-placement-question-detail-dark.png',
        srcLight: '/img/sponsors/spotlight-placement-question-detail-light.png',
      },
      key: 'question-detail',
      title: intl.formatMessage({
        defaultMessage: 'All Question Detail pages',
        description:
          'Label Label for spotlight ad placement in question detail pages',
        id: 'rSr8Ph',
      }),
    },
  ];

  const accordionItems = [
    {
      content: (
        <ul className="flex flex-col gap-4" role="list">
          {placementConstraints.map((item) => (
            <li key={item.key} className="flex gap-x-2">
              <RiCheckLine
                aria-hidden="true"
                className={clsx('size-4 shrink-0', themeTextSuccessColor)}
              />
              <Text color="subtitle" size="body2">
                {item.label}
              </Text>
            </li>
          ))}
        </ul>
      ),
      key: 'item1',
      title: (
        <FormattedMessage
          defaultMessage="View placement constraints"
          description="Accordion trigger label"
          id="NLQRm+"
        />
      ),
    },
    {
      content: (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:gap-10">
          {placementInfo.map((item) => (
            <SponsorsAdFormatPlacementInfo
              key={item.key}
              badgeLabel={item.badgeLabel}
              className="col-span-1"
              img={item.img}
              showSeeAll={
                item.key === 'questions-listing' ||
                item.key === 'question-detail'
              }
              title={item.title}
            />
          ))}
        </div>
      ),
      key: 'item2',
      title: (
        <FormattedMessage
          defaultMessage="Specific locations this ad will be shown"
          description="Label for specific locations this ad will be shown"
          id="z9d6Ys"
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
        <SponsorsAdFormatInfoAccordion items={accordionItems} />
      </div>
    </div>
  );
}

function Asset() {
  return (
    <div
      className={clsx(
        'relative',
        'h-full w-full overflow-hidden sm:h-[155px] lg:h-[200px] xl:h-[240px]',
        'rounded-[4px] sm:rounded-lg lg:rounded-xl',
      )}>
      <div
        className={clsx(
          'pointer-events-none absolute inset-0',
          'rounded-[inherit]',
          ['border', themeBorderElementColor],
        )}></div>
      {/* Light mode image */}
      <picture className={clsx('block dark:hidden')}>
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
          className={clsx(
            'h-full w-full sm:h-[155px] lg:h-[200px] xl:h-[240px]',
            'object-cover object-left-top',
          )}
          decoding="async"
          loading="lazy"
          src="/img/sponsors/spotlight-ad-placement-light.png"
        />
      </picture>
      {/* Dark mode image */}
      <picture className={clsx('hidden dark:block')}>
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
          className={clsx(
            'h-full w-full sm:h-[155px] lg:h-[200px] xl:h-[240px]',
            'object-cover object-left-top',
          )}
          decoding="async"
          loading="lazy"
          src="/img/sponsors/spotlight-ad-placement-dark.png"
        />
      </picture>
    </div>
  );
}
