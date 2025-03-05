import clsx from 'clsx';
import { RiCheckLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
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

export default function SponsorsAdFormatGlobalBannerSection() {
  const FORMAT = 'GLOBAL_BANNER';
  const { impressions, pages } = SponsorAdFormatConfigs[FORMAT];

  const impressionsItems = [
    {
      key: 'item1',
      label: (
        <FormattedMessage
          defaultMessage="Accounting for rotations with {bannerCount} other banners"
          description="Item 1 for global banner placement impressions info"
          id="dlRik2"
          values={{
            bannerCount: '2–3',
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
          defaultMessage="The Global banner appears on all pages on our website"
          description="Item 1 for global banner placement pages info"
          id="bwkYET"
        />
      ),
    },
  ];

  const accordionItems = [
    {
      content: (
        <div className="flex gap-x-2">
          <RiCheckLine
            aria-hidden="true"
            className={clsx('size-4 shrink-0', themeTextSuccessColor)}
          />
          <Text color="subtitle" size="body2">
            <FormattedMessage
              defaultMessage="{characterLimit} characters in {maxLine} line"
              description="Placement constraints"
              id="91sJoh"
              values={{
                characterLimit:
                  SponsorAdFormatConfigs.GLOBAL_BANNER.placementConstraints
                    .text,
                maxLine: 1,
              }}
            />
          </Text>
        </div>
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
        'h-[200px] w-full overflow-hidden sm:h-[155px] lg:h-[168px] xl:h-[200px]',
        'rounded-[4px] sm:rounded-lg lg:rounded-xl',
      )}>
      <div
        className={clsx(
          'pointer-events-none absolute inset-0',
          'rounded-[inherit]',
          ['border', themeBorderElementColor],
        )}
      />
      {/* Light mode image */}
      <picture className={clsx('block dark:hidden', 'h-full')}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/sponsors/global-banner-mobile-light.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/img/sponsors/global-banner-light.png"
        />
        <img
          alt="Global banner placement preview"
          className="size-full object-cover object-top"
          decoding="async"
          loading="lazy"
          src="/img/sponsors/global-banner-light.png"
        />
      </picture>
      {/* Dark mode image */}
      <picture className={clsx('hidden dark:block', 'h-full')}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/sponsors/global-banner-mobile-dark.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/img/sponsors/global-banner-dark.png"
        />
        <img
          alt="Global banner placement preview"
          className="size-full object-cover object-top"
          decoding="async"
          loading="lazy"
          src="/img/sponsors/global-banner-dark.png"
        />
      </picture>
    </div>
  );
}
