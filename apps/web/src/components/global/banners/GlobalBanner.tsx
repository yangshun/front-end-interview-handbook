'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import gtag from '~/lib/gtag';

import { FormattedMessage } from '~/components/intl';
import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import { textVariants } from '~/components/ui/Text';
import {
  themeGradientGreenYellow,
  themeGradientPurple,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import { useI18nPathname } from '~/next-i18nostic/src';

import { useUserPreferences } from '../UserPreferencesProvider';
import { useUserProfile } from '../UserProfileProvider';

function MarketingMessage({ rotateMessages }: Props) {
  const { userProfile } = useUserProfile();
  const { pathname } = useI18nPathname();
  const [isShowingSocialMediaMessage, setIsShowingSocialMediaMessage] =
    useState(rotateMessages);

  useEffect(() => {
    if (!rotateMessages) {
      return;
    }

    setTimeout(() => {
      setIsShowingSocialMediaMessage((value) => !value);
    }, 8000);
  }, [isShowingSocialMediaMessage, rotateMessages]);

  const isInterviewsPremium = userProfile?.isInterviewsPremium ?? false;

  const socialMediaSaleMessage = (
    <FormattedMessage
      defaultMessage="Enjoy {discountPercentage}% off all plans by <follow>following us on social media</follow>. Check out other <promotion>promotions</promotion>!"
      description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
      id="47LloU"
      values={{
        discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
        follow: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/rewards/social"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.rewards.click`,
                category: 'engagement',
                label: 'following us on social media',
              });
              logEvent('click', {
                element: 'Promo banner rewards',
                label: 'following us on social media',
                namespace: 'general',
              });
            }}>
            {chunks}
          </Anchor>
        ),
        promotion: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/promotions"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.promotions.click`,
                category: 'engagement',
                label: 'promotions',
              });
              logEvent('click', {
                element: 'Promo banner',
                label: 'Promotions',
                namespace: 'general',
              });
            }}>
            {chunks}
          </Anchor>
        ),
      }}
    />
  );

  const projectsLaunchMessage = (
    <FormattedMessage
      defaultMessage="GreatFrontEnd Projects is now in BETA! For a limited time, get {percentage}% off with the promo code {promoCode}. <link>Check it out</link>! 🚀"
      description="Text on Promo Banner"
      id="g9Db2B"
      values={{
        link: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/projects"
            locale="en-US"
            target="_blank"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.hiring.click`,
                category: 'engagement',
                label: "We're hiring contributors",
              });
              logEvent('click', {
                element: 'Promo banner',
                label: "We're hiring contributors",
                namespace: 'general',
              });
            }}>
            {chunks}
          </Anchor>
        ),
        percentage: 30,
        promoCode: 'BETA30',
      }}
    />
  );

  if (pathname?.startsWith('/projects') || isInterviewsPremium) {
    return (
      <BannerShell className={themeGradientGreenYellow.className}>
        {projectsLaunchMessage}
      </BannerShell>
    );
  }

  return isShowingSocialMediaMessage ? (
    <BannerShell className={themeGradientPurple.className}>
      {socialMediaSaleMessage}
    </BannerShell>
  ) : (
    <BannerShell className={themeGradientGreenYellow.className}>
      {projectsLaunchMessage}
    </BannerShell>
  );
}

type Props = Readonly<{
  rotateMessages: boolean;
}>;

function BannerShell({
  className,
  children,
}: Readonly<{
  children: ReactNode;
  className: string;
}>) {
  const { isUserProfileLoading } = useUserProfile();
  const { setShowGlobalBanner } = useUserPreferences();

  return (
    <Banner
      className={clsx(
        'h-11 lg:h-8', // Sync with sticky.css.
        textVariants({ color: 'light' }),
        className,
      )}
      size="sm"
      variant="custom"
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

export default function GlobalBanner({ rotateMessages }: Props) {
  return (
    <div
      className={clsx(
        'global-banner', // Non-Tailwind class. Sync with sticky.css.
        'z-sticky sticky top-0 w-full',
      )}>
      <MarketingMessage rotateMessages={rotateMessages} />
    </div>
  );
}
