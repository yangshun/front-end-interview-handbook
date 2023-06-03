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
  sticky = true,
}: Readonly<{
  sticky?: boolean;
  variant?: 'primary' | 'special';
}>) {
  const { userProfile } = useUserProfile();
  const { showPromoBanner, setShowPromoBanner } = useUserPreferences();
  const isPremium = userProfile?.isPremium ?? false;
  const isInvisible = isPremium || !showPromoBanner;

  return (
    <div
      className={clsx(
        'z-20 w-full transition-opacity duration-500',
        sticky && 'lg:sticky',
        isInvisible && 'select-none opacity-0',
      )}
      style={{ top: `var(--navbar-height)` }}
      suppressHydrationWarning={true}>
      <Banner
        size="xs"
        variant={variant}
        onHide={() => {
          setShowPromoBanner(false);
        }}>
        <FormattedMessage
          defaultMessage="Summer Sale! Additional 20% off annual and lifetime plans with the code SUMMERSALE23. <link>Grab your discount today!</link>"
          description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
          id="LJKTGq"
          values={{
            link: (chunks) => (
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
          }}
        />
      </Banner>
    </div>
  );
}
