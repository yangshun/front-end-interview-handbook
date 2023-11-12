import { useUserProfile } from '~/components/global/UserProfileProvider';
import MarketingContactUs from '~/components/interviews/marketing/contact/MarketingContactUs';
import MarketingContinuousUpdates from '~/components/interviews/marketing/MarketingContinuousUpdates';
import MarketingGeneralFAQSection from '~/components/interviews/marketing/MarketingGeneralFAQSection';
import MarketingPricingSectionLocalizedContainer from '~/components/interviews/marketing/pricing/MarketingPricingSectionLocalizedContainer';
import MarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/MarketingTestimonialsSection';

export default function MarketingHomePageBottom() {
  const { userProfile } = useUserProfile();

  return (
    <>
      {!(userProfile?.isPremium && userProfile?.plan === 'lifetime') && (
        <MarketingPricingSectionLocalizedContainer />
      )}
      <MarketingTestimonialsSection />
      <MarketingContinuousUpdates />
      <MarketingGeneralFAQSection />
      <MarketingContactUs />
    </>
  );
}
