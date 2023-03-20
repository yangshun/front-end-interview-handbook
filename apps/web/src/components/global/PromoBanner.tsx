import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import * as gtag from '~/lib/gtag';

import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import { useUserProfile } from './UserProfileProvider';

export default function PromoBanner({
  variant = 'special',
  sticky = true,
}: Readonly<{
  sticky?: boolean;
  variant?: 'primary' | 'special';
}>) {
  const { isUserProfileLoading, userProfile } = useUserProfile();
  const isPremium = userProfile?.isPremium ?? false;
  const [isHidden, setIsHidden] = useState(false);
  const isInvisible = isUserProfileLoading || isPremium || isHidden;

  return (
    <div
      className={clsx(
        'z-10 w-full transition-opacity duration-500',
        sticky && 'lg:sticky',
        isInvisible && 'invisible',
      )}
      style={{ top: `var(--navbar-height)` }}
      suppressHydrationWarning={true}>
      <Banner
        size="xs"
        variant={variant}
        onHide={() => {
          setIsHidden(true);
        }}>
        <FormattedMessage
          defaultMessage="New Year Sale! Additional 20% off annual and lifetime plans with the code NEWYEAR2023. <link>Grab your discount today!</link>"
          description="Text on Promo Banner appearing almost on all application pages to inform user of New Year discount"
          id="THblGQ"
          values={{
            link: (chunks) => (
              <Anchor
                className="whitespace-nowrap font-medium"
                href="/pricing"
                underline={true}
                variant="flat"
                onClick={() => {
                  gtag.event({
                    action: `global.banner.new_year_2023_discount.click`,
                    category: 'engagement',
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
