import clsx from 'clsx';

import gtag from '~/lib/gtag';

import Button from '~/components/ui/Button';

import logEvent from '~/logging/logEvent';

import MarketingContactPlatformsConfig from './MarketingContactPlatformsConfig';

export default function MarketingContactPlatforms() {
  return (
    <div className={clsx('mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4')}>
      {MarketingContactPlatformsConfig().map((platform) => (
        <Button
          key={platform.key}
          href={platform.href}
          icon={platform.icon}
          label={platform.name}
          size="lg"
          variant="secondary"
          onClick={() => {
            gtag.event({
              action: `contact_us.${platform.key}.click`,
              category: 'engagement',
              label: platform.name,
            });
            logEvent('click', {
              element: 'Social link',
              label: platform.name,
            });
          }}
        />
      ))}
    </div>
  );
}
