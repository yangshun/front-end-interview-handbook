import Container from '~/components/ui/Container';

import SponsorsAudienceProfileSection from './SponsorsAudienceProfileSection';
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
    </Container>
  );
}
