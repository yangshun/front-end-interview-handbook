'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Text, { textVariants } from '~/components/ui/Text';
import { themeBackgroundInvertColor } from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import SwagOverflowLogo from '../logos/SwagOverflowLogo';
import { useUserPreferences } from '../UserPreferencesProvider';
import { useUserProfile } from '../UserProfileProvider';

function MarketingMessage() {
  const { userProfile } = useUserProfile();
  const { pathname } = useI18nPathname();
  const [bannerIndex, setBannerIndex] = useState(0);

  const isInterviewsPremium = userProfile?.isInterviewsPremium ?? false;

  const arrowEl = (
    <RiArrowRightLine
      aria-hidden={true}
      className="size-3.5 -mt-0.5 ml-1 inline-flex shrink-0"
    />
  );

  const socialMediaSaleMessage = (
    <Anchor href="/rewards/social" target="_blank" variant="flat">
      <FormattedMessage
        defaultMessage="Enjoy {discountPercentage}% off all plans by following our social accounts! <strong>Check it out</strong>"
        description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
        id="AEkIua"
        values={{
          discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
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

  const projectsLaunchMessage = (
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
          percentage: 30,
          promoCode: 'BETA30',
        }}
      />
      {arrowEl}
    </Anchor>
  );

  const swagOverflowBannerEl = (
    <BannerShell className={themeBackgroundInvertColor}>
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
              <Text className="hidden md:inline" color="inherit" weight="bold">
                {chunks}
              </Text>
            ),
          }}
        />
        {arrowEl}
      </Anchor>
    </BannerShell>
  );

  const socialMediaBannerEl = (
    <BannerShell theme="interviews">{socialMediaSaleMessage}</BannerShell>
  );
  const projectBannerEl = (
    <BannerShell theme="projects">{projectsLaunchMessage}</BannerShell>
  );

  const banners =
    pathname?.startsWith('/projects') || isInterviewsPremium
      ? [projectBannerEl, swagOverflowBannerEl]
      : [socialMediaBannerEl, projectBannerEl, swagOverflowBannerEl];

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((value) => (value + 1) % banners.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return banners[bannerIndex];
}

function BannerShell({
  children,
  className,
  theme,
}: Readonly<{
  children: ReactNode;
  className?: string;
  theme?: 'interviews' | 'projects';
}>) {
  const { isUserProfileLoading } = useUserProfile();
  const { setShowGlobalBanner } = useUserPreferences();

  return (
    <Banner
      className={clsx(
        'h-6', // Sync with sticky.css.
        textVariants({ color: 'light' }),
        className,
      )}
      data-theme={theme}
      size="xs"
      variant="primary"
      onHide={() => {
        setShowGlobalBanner(false);
      }}>
      <span
        className={clsx(
          'transition-opacity duration-500',
          isUserProfileLoading ? 'opacity-0' : 'opacity-100',
        )}
        suppressHydrationWarning={true}>
        {children}
      </span>
    </Banner>
  );
}

export default function GlobalBanner() {
  return (
    <div
      className={clsx(
        'global-banner', // Non-Tailwind class. Sync with sticky.css.
        'z-sticky sticky top-0 w-full',
      )}>
      <MarketingMessage />
    </div>
  );
}
