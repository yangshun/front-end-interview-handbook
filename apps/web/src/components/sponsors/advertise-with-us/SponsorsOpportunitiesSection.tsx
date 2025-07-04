import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import {
  themeGradientHeading,
  themeMarketingHeadingSize,
} from '~/components/ui/theme';

import SponsorsAdFormatGlobalBannerSection from './formats/SponsorsAdFormatGlobalBannerSection';
import SponsorsAdFormatInContentSection from './formats/SponsorsAdFormatInContentSection';
import SponsorsAdFormatSpotlightSection from './formats/SponsorsAdFormatSpotlightSection';

export default function SponsorsOpportunitiesSection() {
  return (
    <div
      className={clsx(
        'flex flex-col gap-y-12 lg:gap-y-16',
        'py-16 sm:py-20',
        'scroll-mt-16 sm:scroll-mt-20',
      )}
      id="pricing-and-availability">
      <Heading
        className={clsx(
          themeGradientHeading,
          themeMarketingHeadingSize,
          'pb-1',
        )}
        level="custom"
        tag="p"
        weight="medium">
        <span className="hidden sm:block">
          <FormattedMessage
            defaultMessage="Explore our Advertising Opportunities"
            description="Advertise with us section title"
            id="voGLL8"
          />
        </span>
        <span aria-hidden="true" className="block sm:hidden">
          <FormattedMessage
            defaultMessage="Explore our Ad Opportunities"
            description="Advertise with us section title"
            id="ekQcko"
          />
        </span>
      </Heading>
      <div className="flex flex-col gap-24 lg:gap-32">
        <SponsorsAdFormatGlobalBannerSection />
        <SponsorsAdFormatInContentSection />
        <SponsorsAdFormatSpotlightSection />
      </div>
    </div>
  );
}
