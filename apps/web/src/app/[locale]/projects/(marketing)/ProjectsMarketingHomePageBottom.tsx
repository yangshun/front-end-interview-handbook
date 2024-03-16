import { useUserProfile } from '~/components/global/UserProfileProvider';
import MarketingContinuousUpdates from '~/components/interviews/marketing/MarketingContinuousUpdates';
import MarketingGeneralFAQSection from '~/components/interviews/marketing/MarketingGeneralFAQSection';
import InterviewsPricingSectionLocalizedContainer from '~/components/interviews/purchase/InterviewsPricingSectionLocalizedContainer';
import ProjectsMarketingContactUs from '~/components/projects/marketing/ProjectsMarketingContactUs';

export default function ProjectsMarketingHomePageBottom() {
  const { userProfile } = useUserProfile();

  return (
    <>
      {!(userProfile?.isPremium && userProfile?.plan === 'lifetime') && (
        <InterviewsPricingSectionLocalizedContainer />
      )}
      <MarketingGeneralFAQSection />
      <MarketingContinuousUpdates />
      <ProjectsMarketingContactUs />
    </>
  );
}
