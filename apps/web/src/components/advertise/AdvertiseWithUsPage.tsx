import Container from '~/components/ui/Container';

import AdvertiseAudienceProfileSection from './AdvertiseAudienceProfileSection';
import AdvertiseHeroSection from './AdvertiseHeroSection';
import AdvertiseOpportunitiesSection from './AdvertiseOpportunitiesSection';
import AdvertiseSinglePlacementsSection from './AdvertiseSinglePlacementsSection';
import AdvertiseTechAudienceSection from './AdvertiseTechAudienceSection';

export default function AdvertiseWithUsPage() {
  return (
    <Container width="marketing">
      <AdvertiseHeroSection />
      <AdvertiseTechAudienceSection />
      <AdvertiseAudienceProfileSection />
      <AdvertiseSinglePlacementsSection />
      <AdvertiseOpportunitiesSection />
    </Container>
  );
}
