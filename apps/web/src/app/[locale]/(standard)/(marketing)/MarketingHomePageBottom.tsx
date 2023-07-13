import { useUserProfile } from '~/components/global/UserProfileProvider';
import MarketingContactUs from '~/components/marketing/contact/MarketingContactUs';
import MarketingContinuousUpdates from '~/components/marketing/MarketingContinuousUpdates';
import MarketingFAQ from '~/components/marketing/MarketingFAQ';
import MarketingPricingSectionLocalizedContainer from '~/components/marketing/MarketingPricingSectionLocalizedContainer';
import MarketingTestimonialsSection from '~/components/marketing/testimonials/MarketingTestimonialsSection';

export default function MarketingHomePageBottom() {
  const { userProfile } = useUserProfile();

  return (
    <>
      {!(userProfile?.isPremium && userProfile?.plan === 'lifetime') && (
        <MarketingPricingSectionLocalizedContainer />
      )}
      <MarketingTestimonialsSection />
      <MarketingContinuousUpdates />
      <MarketingFAQ />
      <MarketingContactUs />
    </>
  );
}
