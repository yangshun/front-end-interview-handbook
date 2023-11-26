'use client';

import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import gtag from '~/lib/gtag';

import {
  PERPETUAL_PROMO_CODE,
  PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
  SEASONAL_PROMO_CODE,
  SEASONAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
} from '~/data/PromotionConfig';

import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import logEvent from '~/logging/logEvent';

import { useUserPreferences } from '../UserPreferencesProvider';
import { useUserProfile } from '../UserProfileProvider';

export default function GlobalBanner() {
  const { userProfile, isUserProfileLoading } = useUserProfile();
  const { setShowGlobalBanner } = useUserPreferences();
  const isPremium = userProfile?.isPremium ?? false;

  const seasonalSaleMessage = (
    <FormattedMessage
      defaultMessage="Cyber Monday Sale is LIVE! <discount>Get {discountPercentage}% off all purchases with {promoCode}</discount> and get free exclusive access to our mystery product dropping in Jan – Feb 2024! 🚀"
      description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
      id="ejVSuu"
      values={{
        discount: (chunks) => (
          <Anchor
            className="font-medium"
            href="/pricing"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.discount.click`,
                category: 'engagement',
                label: 'Grab your discount today',
              });
              logEvent('click', {
                element: 'Promo banner',
                label: 'Grab your discount today',
              });
            }}>
            {chunks}
          </Anchor>
        ),
        discountPercentage: SEASONAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
        promoCode: SEASONAL_PROMO_CODE,
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

  const _perpetualSaleMessage = (
    <FormattedMessage
      defaultMessage="Get {discountPercentage}% off the annual plan with the code {promoCode}, <discount>grab your discount today</discount> or check out other <promotion>promotions</promotion>"
      description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
      id="lCkmFp"
      values={{
        discount: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/pricing"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.discount.click`,
                category: 'engagement',
                label: 'Grab your discount today',
              });
              logEvent('click', {
                element: 'Promo banner',
                label: 'Grab your discount today',
              });
            }}>
            {chunks}
          </Anchor>
        ),
        discountPercentage: PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE,
        promoCode: PERPETUAL_PROMO_CODE,
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
          {isPremium ? weAreHiringMessage : seasonalSaleMessage}
        </span>
      </Banner>
    </div>
  );
}
