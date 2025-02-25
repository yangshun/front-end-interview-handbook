import Container from '~/components/ui/Container';

import SponsorsAboutGFESection from './SponsorsAboutGFESection';
import SponsorsAudienceProfileSection from './SponsorsAudienceProfileSection';
import SponsorsContactUsSection from './SponsorsContactUsSection';
import SponsorsHeroSection from './SponsorsHeroSection';
import SponsorsOpportunitiesSection from './SponsorsOpportunitiesSection';
import SponsorsSinglePlacementsSection from './SponsorsSinglePlacementsSection';
import SponsorsStepsToStartAdvertisingSection from './SponsorsStepsToStartAdvertisingSection';
import SponsorsTechAudienceSection from './SponsorsTechAudienceSection';

export default function SponsorsAdvertiseWithUsPage() {
  return (
    <Container width="marketing">
      <SponsorsHeroSection />
      <SponsorsTechAudienceSection />
      <SponsorsAudienceProfileSection />
      <SponsorsSinglePlacementsSection />
      <SponsorsOpportunitiesSection />
      <SponsorsStepsToStartAdvertisingSection />
      <SponsorsContactUsSection />
      <SponsorsAboutGFESection />
    </Container>
  );
}
