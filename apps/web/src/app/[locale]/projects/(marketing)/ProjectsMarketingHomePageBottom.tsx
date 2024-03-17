import { useUserProfile } from '~/components/global/UserProfileProvider';
import MarketingContinuousUpdates from '~/components/interviews/marketing/MarketingContinuousUpdates';
import MarketingGeneralFAQSection from '~/components/interviews/marketing/MarketingGeneralFAQSection';
import ProjectsMarketingContactUs from '~/components/projects/marketing/ProjectsMarketingContactUs';
import ProjectsPricingSectionLocalizedContainer from '~/components/projects/purchase/ProjectsPricingSectionLocalizedContainer';

export default function ProjectsMarketingHomePageBottom() {
  const { userProfile } = useUserProfile();

  return (
    <>
      {!(userProfile?.isPremium && userProfile?.plan === 'lifetime') && (
        <ProjectsPricingSectionLocalizedContainer />
      )}
      <MarketingGeneralFAQSection />
      <MarketingContinuousUpdates />
      <ProjectsMarketingContactUs />
    </>
  );
}
