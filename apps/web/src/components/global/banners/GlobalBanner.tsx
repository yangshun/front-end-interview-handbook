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
            <Text color="inherit" weight="bold">
              {chunks}
              {arrowEl}
            </Text>
          ),
        }}
      />
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

  if (pathname?.startsWith('/projects') || isInterviewsPremium) {
    return <BannerShell theme="projects">{projectsLaunchMessage}</BannerShell>;
  }

  return isShowingSocialMediaMessage ? (
    <BannerShell theme="interviews">{socialMediaSaleMessage}</BannerShell>
  ) : (
    <BannerShell theme="projects">{projectsLaunchMessage}</BannerShell>
  );
}

type Props = Readonly<{
  rotateMessages: boolean;
}>;

function BannerShell({
  children,
  theme,
}: Readonly<{
  children: ReactNode;
  theme: 'interviews' | 'projects';
}>) {
  const { isUserProfileLoading } = useUserProfile();
  const { setShowGlobalBanner } = useUserPreferences();

  return (
    <Banner
      className={clsx(
        'h-6', // Sync with sticky.css.
        textVariants({ color: 'light' }),
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
