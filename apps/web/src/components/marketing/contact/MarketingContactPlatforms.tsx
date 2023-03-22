import clsx from 'clsx';

import gtag from '~/lib/gtag';

import Anchor from '~/components/ui/Anchor';

import MarketingContactPlatformsConfig from './MarketingContactPlatformsConfig';

export default function MarketingContactPlatforms() {
  return (
    <div className={clsx('mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4')}>
      {MarketingContactPlatformsConfig.map((platform) => (
        <Anchor
          key={platform.key}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          href={platform.href}
          variant="unstyled"
          onClick={() => {
            gtag.event({
              action: `contact_us.${platform.key}.click`,
              category: 'engagement',
              label: platform.name,
            });
          }}>
          <platform.icon className="h-5 w-5" /> {platform.name}
        </Anchor>
      ))}
    </div>
  );
}
