'use client';

import clsx from 'clsx';
import { shuffle } from 'lodash-es';
import { useEffect, useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import {
  PROMO_PROJECTS_BETA_DISCOUNT_CODE,
  PROMO_PROJECTS_BETA_DISCOUNT_PERCENTAGE,
  PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
} from '~/data/PromotionConfig';

import { FormattedMessage } from '~/components/intl';
import useUserProfileWithProjectsProfile from '~/components/projects/common/useUserProfileWithProjectsProfile';
import SponsorsAdFormatGlobalBanner from '~/components/sponsors/ads/SponsorsAdFormatGlobalBanner';
import Anchor from '~/components/ui/Anchor';
import Text, { textVariants } from '~/components/ui/Text';
import { themeBackgroundInvertColor } from '~/components/ui/theme';

import GlobalBannerShell from './GlobalBannerShell';
import SwagOverflowLogo from '../logos/SwagOverflowLogo';
import { useUserPreferences } from '../UserPreferencesProvider';

const arrowEl = (
  <RiArrowRightLine
    aria-hidden={true}
    className="size-3.5 -mt-0.5 ml-1 inline-flex shrink-0"
  />
);

const socialMediaRewardMessageEl = (
  <Anchor href="/rewards/social" target="_blank" variant="flat">
    <FormattedMessage
      defaultMessage="Enjoy {discountPercentage}% off all plans by following our social accounts! <strong>Check it out</strong>"
      description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
      id="AEkIua"
      values={{
        discountPercentage: PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
        strong: (chunks) => (
          <Text className="hidden md:inline" color="inherit" weight="bold">
            {chunks}
          </Text>
        ),
      }}
    />
    {arrowEl}
  </Anchor>
);

const projectsLaunchMessageEl = (
  <Anchor
    className="whitespace-nowrap"
    href="/projects"
    locale="en-US"
    target="_blank"
    variant="flat">
    <FormattedMessage
      defaultMessage="GreatFrontEnd Projects now in BETA! {percentage}% off with {promoCode}"
      description="Text on Promo Banner"
      id="7AiLO9"
      values={{
        percentage: PROMO_PROJECTS_BETA_DISCOUNT_PERCENTAGE,
        promoCode: PROMO_PROJECTS_BETA_DISCOUNT_CODE,
      }}
    />
    {arrowEl}
  </Anchor>
);

type BannerType = 'ad' | 'projects' | 'social' | 'swag';

function MarketingMessage() {
  const { isLoading, userProfile } = useUserProfileWithProjectsProfile(false);

  if (isLoading) {
    return (
      <GlobalBannerShell isLoading={true} theme="interviews" variant="primary">
        {null}
      </GlobalBannerShell>
    );
  }

  const isInterviewsPremium = userProfile?.premium;
  const isProjectsPremium = userProfile?.projectsProfile?.premium;

  return (
    <MarketingMessageImpl
      isInterviewsPremium={isInterviewsPremium}
      isProjectsPremium={isProjectsPremium}
    />
  );
}

function MarketingMessageImpl({
  isInterviewsPremium = false,
  isProjectsPremium = false,
}: Readonly<{ isInterviewsPremium?: boolean; isProjectsPremium?: boolean }>) {
  const { setShowGlobalBanner } = useUserPreferences();

  const [bannerIndex, setBannerIndex] = useState(0);
  const [banners, setBanners] = useState<ReadonlyArray<BannerType>>([
    'social',
    'projects',
    'swag',
  ]);

  const { data, isLoading } = trpc.sponsorships.ad.useQuery(
    {
      format: 'GLOBAL_BANNER',
    },
    {
      onSuccess() {
        const rotatedBanners: Array<BannerType> = ['ad', 'swag'];

        if (!isProjectsPremium) {
          rotatedBanners.push('projects');
        }

        const shuffledBanners = shuffle(rotatedBanners);

        setBanners(
          isInterviewsPremium
            ? shuffledBanners
            : ['social', ...shuffledBanners],
        );
      },
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((value) => (value + 1) % banners.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [banners.length]);

  function hideBanner() {
    setShowGlobalBanner(false);
  }

  if (isLoading) {
    return (
      <GlobalBannerShell
        isLoading={isLoading}
        theme="interviews"
        variant="primary">
        {null}
      </GlobalBannerShell>
    );
  }

  const bannerType = banners[bannerIndex];
  const projectsBannerEl = (
    <GlobalBannerShell
      isLoading={isLoading}
      theme="projects"
      variant="primary"
      onHide={hideBanner}>
      {projectsLaunchMessageEl}
    </GlobalBannerShell>
  );

  switch (bannerType) {
    case 'ad': {
      if (data?.format === 'GLOBAL_BANNER') {
        return (
          <SponsorsAdFormatGlobalBanner
            adId={data.adId}
            isLoading={isLoading}
            text={data.text}
            url={data.url}
            onHide={hideBanner}
          />
        );
      }
      break;
    }
    case 'social': {
      return (
        <GlobalBannerShell
          isLoading={isLoading}
          theme="interviews"
          variant="primary"
          onHide={hideBanner}>
          {socialMediaRewardMessageEl}
        </GlobalBannerShell>
      );
    }
    case 'projects': {
      return projectsBannerEl;
    }
    case 'swag': {
      return (
        <GlobalBannerShell
          className={themeBackgroundInvertColor}
          isLoading={isLoading}
          variant="neutral"
          onHide={hideBanner}>
          <Anchor
            className={textVariants({
              color: 'invert',
              weight: 'medium',
            })}
            href="https://swagoverflow.store"
            target="_blank"
            variant="flat">
            <SwagOverflowLogo className="mr-2 hidden sm:inline" />
            <FormattedMessage
              defaultMessage="Visit the ultimate swag store for Front End Engineers! <strong>Check it out</strong>"
              description="Text on SwagStore Banner"
              id="epwmlp"
              values={{
                strong: (chunks) => (
                  <Text
                    className="hidden md:inline"
                    color="inherit"
                    weight="bold">
                    {chunks}
                  </Text>
                ),
              }}
            />
            {arrowEl}
          </Anchor>
        </GlobalBannerShell>
      );
    }
  }

  return projectsBannerEl;
}

export default function GlobalBanner() {
  return (
    <div
      className={clsx(
        'global-banner', // Non-Tailwind class. Sync with sticky.css.
        'z-fixed sticky top-0 w-full',
      )}>
      <MarketingMessage />
    </div>
  );
}
