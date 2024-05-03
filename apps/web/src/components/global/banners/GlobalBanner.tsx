'use client';

import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import gtag from '~/lib/gtag';

import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import logEvent from '~/logging/logEvent';
import { useI18nPathname } from '~/next-i18nostic/src';

import { useUserPreferences } from '../UserPreferencesProvider';
import { useUserProfile } from '../UserProfileProvider';

function MarketingMessage() {
  const { userProfile } = useUserProfile();
  const { pathname } = useI18nPathname();

  const isInterviewsPremium = userProfile?.isInterviewsPremium ?? false;

  const perpetualSaleMessage = (
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
              });
            }}>
            {chunks}
          </Anchor>
        ),
      }}
    />
  );

  const launchSaleMessage = (
    <FormattedMessage
      defaultMessage="GreatFrontEnd Projects is now in BETA! For a limited time, get {percentage}% off with the promo code {promoCode}. <link>Check it out</link>! 🚀"
      description="Text on Promo Banner"
      id="g9Db2B"
      values={{
        link: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/projects"
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

  if (pathname?.startsWith('/projects')) {
    return launchSaleMessage;
  }

  return isInterviewsPremium ? launchSaleMessage : perpetualSaleMessage;
}

type Props = Readonly<{
  className?: string;
  variant?: 'custom' | 'primary';
}>;

export default function GlobalBanner({
  className,
  variant = 'primary',
}: Props) {
  const { isUserProfileLoading } = useUserProfile();
  const { setShowGlobalBanner } = useUserPreferences();

  return (
    <div
      className={clsx(
        'global-banner', // Non-Tailwind class. Sync with sticky.css.
        'z-sticky sticky top-0 w-full',
      )}>
      <Banner
        className={clsx('h-10 sm:h-8', className)} // Sync with sticky.css.
        size="sm"
        variant={variant}
        onHide={() => {
          setShowGlobalBanner(false);
        }}>
        <span
          className={clsx(
            'transition-opacity duration-500',
            isUserProfileLoading ? 'opacity-0' : 'opacity-100',
          )}
          suppressHydrationWarning={true}>
          <MarketingMessage />
        </span>
      </Banner>
    </div>
  );
}
