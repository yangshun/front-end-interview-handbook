'use client';

import clsx from 'clsx';
import { shuffle } from 'lodash-es';
import { useEffect, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import {
  PROMO_PROJECTS_BETA_DISCOUNT_CODE,
  PROMO_PROJECTS_BETA_DISCOUNT_PERCENTAGE,
  PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
} from '~/data/PromotionConfig';

import { FormattedMessage } from '~/components/intl';
import useUserProfileWithProjectsProfile from '~/components/projects/common/useUserProfileWithProjectsProfile';
import SponsorsAdFormatGlobalBanner from '~/components/sponsors/ads/SponsorsAdFormatGlobalBanner';
import Text from '~/components/ui/Text';

import SwagOverflowLogo from '../logos/SwagOverflowLogo';
import { useUserPreferences } from '../UserPreferencesProvider';
import GlobalBannerShell from './GlobalBannerShell';

type BannerType = 'ad' | 'projects' | 'social' | 'swag';

const ROTATION_DURATION = 15_000;

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

  const { data, isLoading } = trpc.sponsors.ad.useQuery(
    {
      format: 'GLOBAL_BANNER',
    },
    {
      onSuccess() {
        const rotatedBanners: Array<BannerType> = ['swag'];

        if (!isProjectsPremium) {
          rotatedBanners.push('projects');
        }

        const shuffledBanners = shuffle(rotatedBanners);

        setBanners(
          isInterviewsPremium
            ? [shuffledBanners[0], 'ad', ...shuffledBanners.slice(1)]
            : ['social', 'ad', ...shuffledBanners],
        );
      },
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((value) => (value + 1) % banners.length);
    }, ROTATION_DURATION);

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
    <SponsorsAdFormatGlobalBanner
      adId="projects-global-banner"
      className={null}
      isLoading={isLoading}
      theme="projects"
      url="/projects"
      variant="primary"
      onHide={hideBanner}>
      <FormattedMessage
        defaultMessage="GreatFrontEnd Projects now in BETA! {percentage}% off with {promoCode}"
        description="Text on Promo Banner"
        id="7AiLO9"
        values={{
          percentage: PROMO_PROJECTS_BETA_DISCOUNT_PERCENTAGE,
          promoCode: PROMO_PROJECTS_BETA_DISCOUNT_CODE,
        }}
      />
    </SponsorsAdFormatGlobalBanner>
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
        <SponsorsAdFormatGlobalBanner
          adId="social-rewards-global-banner"
          className={null}
          isLoading={isLoading}
          theme="interviews"
          url="/rewards/social"
          variant="primary"
          onHide={hideBanner}>
          <FormattedMessage
            defaultMessage="Enjoy {discountPercentage}% off all plans by following our social accounts! <strong>Check it out</strong>"
            description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
            id="AEkIua"
            values={{
              discountPercentage: PROMO_SOCIAL_DISCOUNT_PERCENTAGE,
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
        </SponsorsAdFormatGlobalBanner>
      );
    }
    case 'projects': {
      return projectsBannerEl;
    }
    case 'swag': {
      return (
        <SponsorsAdFormatGlobalBanner
          adId="swag-overflow-global-banner"
          isLoading={isLoading}
          url="https://swagoverflow.store"
          variant="neutral"
          onHide={hideBanner}>
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
        </SponsorsAdFormatGlobalBanner>
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
