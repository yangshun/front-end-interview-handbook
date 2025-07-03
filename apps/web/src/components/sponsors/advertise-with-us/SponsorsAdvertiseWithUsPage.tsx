import clsx from 'clsx';

import Container from '~/components/ui/Container';
import { themeBorderColor } from '~/components/ui/theme';

import SponsorsAboutGFESection from './SponsorsAboutGFESection';
import SponsorsAudienceProfileSection from './SponsorsAudienceProfileSection';
import SponsorsContactUsSection from './SponsorsContactUsSection';
import SponsorsHeroSection from './SponsorsHeroSection';
import SponsorsOpportunitiesSection from './SponsorsOpportunitiesSection';
import SponsorsSinglePlacementsSection from './SponsorsSinglePlacementsSection';
import SponsorsStepsToStartAdvertisingSection from './SponsorsStepsToStartAdvertisingSection';
import SponsorsTechAudienceSection from './SponsorsTechAudienceSection';
import SponsorsTrialPriceSection from './SponsorsTrialPriceSection';

export default function SponsorsAdvertiseWithUsPage() {
  return (
    <>
      <Container width="marketing">
        <SponsorsHeroSection />
        <SponsorsTechAudienceSection />
        <SponsorsAudienceProfileSection />
        <SponsorsSinglePlacementsSection />
        <SponsorsTrialPriceSection />
        <SponsorsOpportunitiesSection />
        <SponsorsStepsToStartAdvertisingSection />
      </Container>
      <div
        className={clsx(
          ['border-b', themeBorderColor],
          'bg-gradient-to-t from-neutral-200/30 to-white/60 dark:from-neutral-800/30 dark:to-neutral-900/80',
        )}>
        <Container width="marketing">
          <SponsorsContactUsSection />
        </Container>
      </div>
      <Container width="marketing">
        <SponsorsAboutGFESection />
      </Container>
    </>
  );
}
