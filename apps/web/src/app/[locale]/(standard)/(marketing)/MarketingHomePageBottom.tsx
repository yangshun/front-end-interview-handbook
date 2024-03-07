import { useUserProfile } from '~/components/global/UserProfileProvider';
import MarketingContinuousUpdates from '~/components/interviews/marketing/MarketingContinuousUpdates';
import MarketingGeneralFAQSection from '~/components/interviews/marketing/MarketingGeneralFAQSection';
import MarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/MarketingTestimonialsSection';
import InterviewsPricingSectionLocalizedContainer from '~/components/interviews/purchase/InterviewsPricingSectionLocalizedContainer';
import MarketingContactUs from '~/components/marketing/contact/MarketingContactUs';

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
