'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Button from '~/components/ui/Button';
import { textVariants } from '~/components/ui/Text';

import { useI18nPathname } from '~/next-i18nostic/src';

import { useUserPreferences } from '../UserPreferencesProvider';
import { useUserProfile } from '../UserProfileProvider';

function MarketingMessage({ rotateMessages }: Props) {
  const intl = useIntl();
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
    <Anchor href="/rewards/social" target="_blank" variant="flat">
      <FormattedMessage
        defaultMessage="Enjoy {discountPercentage}% off all plans by following our social accounts"
        description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
        id="f7fKvu"
        values={{
          discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
        }}
      />
    </Anchor>
  );

  const projectsLaunchMessage = (
    <Anchor href="/projects" locale="en-US" target="_blank" variant="flat">
      <FormattedMessage
        defaultMessage="GreatFrontEnd Projects is now in BETA! Get {percentage}% off with code {promoCode}"
        description="Text on Promo Banner"
        id="VR6dnk"
        values={{
          percentage: 30,
          promoCode: 'BETA30',
        }}
      />
    </Anchor>
  );

  const projectsCheckItOut = (
    <Button
      className="!h-[22px] max-md:hidden sm:ml-2"
      href="/projects"
      icon={RiArrowRightLine}
      label={intl.formatMessage({
        defaultMessage: 'Check it out',
        description: 'Marketing promotions',
        id: 'H1kMHf',
      })}
      locale="en-US"
      size="xs"
      target="_blank"
      variant="secondary"
    />
  );

  if (pathname?.startsWith('/projects') || isInterviewsPremium) {
    return (
      <BannerShell theme="projects">
        {projectsLaunchMessage} {projectsCheckItOut}
      </BannerShell>
    );
  }

  const otherPromotionsButton = (
    <Anchor
      className="max-md:hidden sm:ml-2"
      href="/promotions"
      target="_blank"
      variant="flat">
      {intl.formatMessage({
        defaultMessage: 'Other promotions',
        description: 'Marketing promotions',
        id: 'coAsEN',
      })}
    </Anchor>
  );

  return isShowingSocialMediaMessage ? (
    <BannerShell theme="interviews">
      {socialMediaSaleMessage}
      <Button
        className="!h-[22px] max-md:hidden sm:ml-2"
        href="/rewards/social"
        icon={RiArrowRightLine}
        label={intl.formatMessage({
          defaultMessage: 'Check it out',
          description: 'Marketing promotions',
          id: 'H1kMHf',
        })}
        size="xs"
        variant="secondary"
      />
      {otherPromotionsButton}
    </BannerShell>
  ) : (
    <BannerShell theme="projects">
      {projectsLaunchMessage} {projectsCheckItOut}
    </BannerShell>
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
        'h-11 lg:h-8', // Sync with sticky.css.
        textVariants({ color: 'light' }),
      )}
      data-theme={theme}
      size="sm"
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
