'use client';

import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import gtag from '~/lib/gtag';

import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import logEvent from '~/logging/logEvent';

import { useUserPreferences } from '../UserPreferencesProvider';
import { useUserProfile } from '../UserProfileProvider';

export default function PromoBanner({
  variant = 'special',
}: Readonly<{
  variant?: 'primary' | 'special';
}>) {
  const { userProfile } = useUserProfile();
  const { showPromoBanner, setShowPromoBanner } = useUserPreferences();
  const isPremium = userProfile?.isPremium ?? false;
  const isInvisible = isPremium || !showPromoBanner;

  if (isInvisible) {
    return null;
  }

  return (
    <div
      className={clsx(
        'sticky top-0 z-30 w-full transition-opacity duration-500',
      )}
      suppressHydrationWarning={true}>
      <Banner
        size="xs"
        variant={variant}
        onHide={() => {
          setShowPromoBanner(false);
        }}>
        <FormattedMessage
          defaultMessage="Summer Sale! Additional 20% off annual plan with the code SUMMERSALE23, <discount>grab your discount today!</discount>. Check out other <promotion>promotions</promotion>"
          description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
          id="QRPpZB"
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
      </Banner>
    </div>
  );
}
