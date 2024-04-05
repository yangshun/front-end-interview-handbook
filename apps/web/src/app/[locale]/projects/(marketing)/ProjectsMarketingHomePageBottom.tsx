import MarketingContinuousUpdates from '~/components/interviews/marketing/MarketingContinuousUpdates';
import ProjectsMarketingContactUs from '~/components/projects/marketing/ProjectsMarketingContactUs';
import ProjectsPricingPromotions from '~/components/projects/purchase/ProjectsPricingPromotions';
import ProjectsPricingSectionLocalizedContainer from '~/components/projects/purchase/ProjectsPricingSectionLocalizedContainer';

import ProjectMarketingGeneralFAQSection from './ProjectMarketingGeneralFAQSection';

export default function ProjectsMarketingHomePageBottom() {
  return (
    <>
      <ProjectsPricingSectionLocalizedContainer />
      <ProjectsPricingPromotions />
      <ProjectMarketingGeneralFAQSection />
      <MarketingContinuousUpdates />
      <ProjectsMarketingContactUs />
    </>
  );
}
