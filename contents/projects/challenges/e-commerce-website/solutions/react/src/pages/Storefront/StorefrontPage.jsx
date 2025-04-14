import LatestArrivalsSection from '../LatestArrivals/components/LatestArrivalsSection';
import HeroSection from './components/HeroSection';
import CollectionsGridSection from './components/CollectionsGridSection';
import FeaturesGridSection from './components/FeaturesGridSection';

const StorefrontPage = () => {
  return (
    <div>
      <HeroSection />
      <LatestArrivalsSection />
      <CollectionsGridSection />
      <FeaturesGridSection />
    </div>
  );
};

export default StorefrontPage;
