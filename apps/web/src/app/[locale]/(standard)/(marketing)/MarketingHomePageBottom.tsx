import { useUserProfile } from '~/components/global/UserProfileProvider';
import MarketingContactUs from '~/components/interviews/marketing/contact/MarketingContactUs';
import MarketingContinuousUpdates from '~/components/interviews/marketing/MarketingContinuousUpdates';
import MarketingGeneralFAQSection from '~/components/interviews/marketing/MarketingGeneralFAQSection';
import MarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/MarketingTestimonialsSection';
import InterviewsPricingSectionLocalizedContainer from '~/components/interviews/purchase/InterviewsPricingSectionLocalizedContainer';

export default function MarketingHomePageBottom() {
  const { userProfile } = useUserProfile();

  return (
    <>
      {!(userProfile?.isPremium && userProfile?.plan === 'lifetime') && (
        <InterviewsPricingSectionLocalizedContainer />
      )}
      <MarketingTestimonialsSection />
      <MarketingContinuousUpdates />
      <MarketingGeneralFAQSection />
      <MarketingContactUs />
    </>
  );
}
