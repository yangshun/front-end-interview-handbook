'use client';

import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import gtag from '~/lib/gtag';

import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import logEvent from '~/logging/logEvent';

import { useUserPreferences } from '../UserPreferencesProvider';
import { useUserProfile } from '../UserProfileProvider';

export default function GlobalBanner() {
  const { userProfile, isUserProfileLoading } = useUserProfile();
  const { setShowGlobalBanner } = useUserPreferences();
  const isPremium = userProfile?.isPremium ?? false;

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

  const weAreHiringMessage = (
    <FormattedMessage
      defaultMessage="GreatFrontEnd is hiring! Check out our <link>jobs page</link>!"
      description="Text on Promo Banner"
      id="wfod1+"
      values={{
        link: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/jobs"
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
      }}
    />
  );

  return (
    <div
      className={clsx(
        'global-banner', // Non-Tailwind class. Sync with globals.css.
        'sticky top-0 z-30 w-full',
      )}>
      <Banner
        className={clsx('h-14 lg:h-auto')}
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
          {isPremium ? weAreHiringMessage : perpetualSaleMessage}
        </span>
      </Banner>
    </div>
  );
}
