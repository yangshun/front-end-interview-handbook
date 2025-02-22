import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import { themeGradientHeading } from '~/components/ui/theme';

import SponsorsAdFormatGlobalBannerSection from './formats/SponsorsAdFormatGlobalBannerSection';
import SponsorsAdFormatInContentSection from './formats/SponsorsAdFormatInContentSection';

export default function SponsorsOpportunitiesSection() {
  return (
    <div
      className={clsx('flex flex-col gap-y-12 lg:gap-y-16', 'py-16 sm:py-20')}>
      <Heading
        className={themeGradientHeading}
        level="heading2"
        tag="p"
        weight="medium">
        <FormattedMessage
          defaultMessage="Explore our Advertising Opportunities"
          description="Advertise with us section title"
          id="voGLL8"
        />
      </Heading>
      <div className="flex flex-col gap-24 lg:gap-32">
        <SponsorsAdFormatGlobalBannerSection />
        <SponsorsAdFormatInContentSection />
      </div>
    </div>
  );
}
