import Container from '~/components/ui/Container';

import AdvertiseAudienceProfileSection from './AdvertiseAudienceProfileSection';
import AdvertiseHeroSection from './AdvertiseHeroSection';
import AdvertiseTechAudienceSection from './AdvertiseTechAudienceSection';

export default function AdvertiseWithUsPage() {
  return (
    <Container width="marketing">
      <AdvertiseHeroSection />
      <AdvertiseTechAudienceSection />
      <AdvertiseAudienceProfileSection />
    </Container>
  );
}
