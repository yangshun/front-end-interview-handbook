import MarketingContinuousUpdates from '~/components/interviews/marketing/MarketingContinuousUpdates';
import MarketingGeneralFAQSection from '~/components/interviews/marketing/MarketingGeneralFAQSection';
import ProjectsMarketingContactUs from '~/components/projects/marketing/ProjectsMarketingContactUs';
import ProjectsPricingPromotions from '~/components/projects/purchase/ProjectsPricingPromotions';
import ProjectsPricingSectionLocalizedContainer from '~/components/projects/purchase/ProjectsPricingSectionLocalizedContainer';

export default function ProjectsMarketingHomePageBottom() {
  return (
    <>
      <ProjectsPricingSectionLocalizedContainer />
      <ProjectsPricingPromotions />
      <MarketingGeneralFAQSection />
      <MarketingContinuousUpdates />
      <ProjectsMarketingContactUs />
    </>
  );
}
