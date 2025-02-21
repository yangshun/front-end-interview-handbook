'use client';

import clsx from 'clsx';
import { RiEyeFill } from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import { FormattedMessage, useIntl } from '~/components/intl';
import { SponsorPlacementConfigs } from '~/components/sponsors/SponsorsPlacementConfigs';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeTextColor,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

export default function AdvertiseSinglePlacementsSection() {
  return (
    <div
      className={clsx('flex flex-col gap-y-12 lg:gap-y-16', 'py-16 sm:py-20')}>
      <div className="flex flex-col gap-6">
        <Heading
          className={clsx('max-w-3xl', themeGradientHeading)}
          level="heading2"
          tag="p"
          weight="medium">
          <FormattedMessage
            defaultMessage="Don't settle for single placements - we'll give you repeated ad exposure"
            description="Advertise with us section title"
            id="3C1g+S"
          />
        </Heading>
        <Text
          className={clsx('max-w-[634px]', 'text-base lg:text-lg')}
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="While other advertising options only provide a single placement—like a one-time newsletter mention—our solution <highlight>places your ad across multiple pages</highlight>, ensuring repeated, high-impact visibility on every visit."
            description="Advertise with us section subtitle"
            id="dVkXTc"
            values={{
              highlight: (chunks) => (
                <Text color="default" size="inherit" weight="inherit">
                  {chunks}
                </Text>
              ),
            }}
          />
        </Text>
      </div>
      <Asset />
    </div>
  );
}

function Asset() {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-x-5 gap-y-6 sm:justify-end lg:gap-x-6',
        'relative isolate overflow-hidden',
        'h-[399px] sm:h-[336px] lg:h-[400px]',
        'rounded-xl',
        'p-4 sm:pb-0 md:p-0',
        themeBackgroundColor,
        [
          themeWhiteGlowCardBackground,
          'before:-left-20 before:-top-20 before:z-[1]',
        ],
      )}
      inert="">
      <div
        className={clsx(
          '!absolute inset-0 rounded-[inherit] before:m-[-1px]',
          themeGlassyBorder,
        )}
      />
      <GlobalBannerPlacement />
      <div
        className={clsx(
          'flex flex-col gap-x-5 gap-y-6 sm:flex-row lg:gap-x-6',
          'w-[93%] max-w-[340px] sm:w-fit sm:max-w-none',
        )}>
        <InContentPlacementAsset />
        <SpotlightPlacementAsset />
      </div>
    </div>
  );
}

function GlobalBannerPlacement() {
  return (
    <div
      className={clsx(
        'relative',
        'w-[93%] max-w-[340px] sm:w-fit sm:max-w-none',
      )}>
      {/* Light mode image */}
      <picture
        className={clsx(
          'block dark:hidden',
          'h-auto sm:w-[558px]  lg:w-[665px]',
        )}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/advertise/global-banner-placement-mobile-light.png"
        />
        <source
          media="(min-width: 641px)"
          srcSet="/img/advertise/global-banner-placement-light.png"
        />
        <img
          alt="Global banner placement"
          decoding="async"
          loading="lazy"
          src="/img/advertise/global-banner-placement-light.png"
        />
      </picture>

      {/* Dark mode image */}
      <picture
        className={clsx(
          'hidden dark:block',
          'h-auto sm:w-[558px] lg:w-[665px]',
        )}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/advertise/global-banner-placement-mobile-dark.png"
        />
        <source
          media="(min-width: 641px)"
          srcSet="/img/advertise/global-banner-placement-dark.png"
        />
        <img
          alt="Global banner placement"
          decoding="async"
          loading="lazy"
          src="/img/advertise/global-banner-placement-dark.png"
        />
      </picture>
      <PagesCountBadge count={SponsorPlacementConfigs.GLOBAL_BANNER.pages} />
    </div>
  );
}

function InContentPlacementAsset() {
  return (
    <div className={clsx('relative', 'w-full')}>
      {/* Light mode image */}
      <picture
        className={clsx(
          'block dark:hidden',
          'h-auto w-full sm:w-[277px]  lg:w-[332px]',
        )}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/advertise/in-content-placement-mobile-light.png"
        />
        <source
          media="(min-width: 641px)"
          srcSet="/img/advertise/in-content-placement-light.png"
        />
        <img
          alt="In content placement"
          decoding="async"
          loading="lazy"
          src="/img/advertise/in-content-placement-light.png"
        />
      </picture>

      {/* Dark mode image */}
      <picture
        className={clsx(
          'hidden dark:block',
          'h-auto w-full sm:w-[277px] lg:w-[332px]',
        )}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/advertise/in-content-placement-mobile-dark.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/img/advertise/in-content-placement-dark.png"
        />
        <img
          alt="In content placement"
          decoding="async"
          loading="lazy"
          src="/img/advertise/in-content-placement-dark.png"
        />
      </picture>
      <PagesCountBadge count={SponsorPlacementConfigs.IN_CONTENT.pages} />
    </div>
  );
}

function SpotlightPlacementAsset() {
  return (
    <div className={clsx('relative', 'w-full')}>
      {/* Light mode image */}
      <picture
        className={clsx(
          'block dark:hidden',
          'h-auto w-full sm:w-[277px] lg:w-[332px]',
        )}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/advertise/spotlight-placement-mobile-light.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/img/advertise/spotlight-placement-light.png"
        />
        <img
          alt="Spotlight placement"
          decoding="async"
          loading="lazy"
          src="/img/advertise/spotlight-placement-light.png"
        />
      </picture>

      {/* Dark mode image */}
      <picture
        className={clsx(
          'hidden dark:block',
          'h-auto w-full sm:w-[277px]  lg:w-[332px]',
        )}>
        <source
          media="(max-width: 640px)"
          srcSet="/img/advertise/spotlight-placement-mobile-dark.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/img/advertise/spotlight-placement-dark.png"
        />
        <img
          alt="Spotlight placement"
          decoding="async"
          loading="lazy"
          src="/img/advertise/spotlight-placement-dark.png"
        />
      </picture>

      <PagesCountBadge count={SponsorPlacementConfigs.SPOTLIGHT.pages} />
    </div>
  );
}

function PagesCountBadge({ count }: { count: number }) {
  const intl = useIntl();
  const isMobileAndBelow = useMediaQuery('(max-width: 640px)');

  return (
    <Badge
      className="!absolute -right-3 -top-2"
      icon={RiEyeFill}
      iconClassName={themeTextColor}
      label={intl.formatMessage(
        {
          defaultMessage: '{count}+ pages',
          description: 'Ad placement pages count',
          id: 'mTh7dB',
        },
        { count },
      )}
      size={isMobileAndBelow ? 'sm' : 'md'}
      variant="neutral-active"
    />
  );
}
