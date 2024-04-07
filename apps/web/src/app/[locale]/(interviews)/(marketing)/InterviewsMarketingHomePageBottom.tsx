import { FormattedMessage, useIntl } from 'react-intl';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsMarketingContinuousUpdates from '~/components/interviews/marketing/InterviewsMarketingContinuousUpdates';
import InterviewsMarketingGeneralFAQSection from '~/components/interviews/marketing/InterviewsMarketingGeneralFAQSection';
import InterviewsMarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialsSection';
import InterviewsPricingSectionLocalizedContainer from '~/components/interviews/purchase/InterviewsPricingSectionLocalizedContainer';
import MarketingContactUs from '~/components/marketing/contact/MarketingContactUs';
import Text from '~/components/ui/Text';

export default function InterviewsMarketingHomePageBottom() {
  const { userProfile } = useUserProfile();
  const intl = useIntl();

  return (
    <>
      {!(userProfile?.isPremium && userProfile?.plan === 'lifetime') && (
        <InterviewsPricingSectionLocalizedContainer />
      )}
      <InterviewsMarketingTestimonialsSection />
      <InterviewsMarketingContinuousUpdates
        title={intl.formatMessage({
          defaultMessage: "We're still growing our question base",
          description: 'Question base section title',
          id: 'RQm9cE',
        })}>
        <Text
          className="relative block max-w-5xl text-base md:text-xl"
          color="secondary">
          <FormattedMessage
            defaultMessage="Our focus is currently on expanding our question base. New coding and system design questions are added to the platform on a weekly basis."
            description="Question base section subtitle - first paragraph"
            id="QJaxVF"
          />
        </Text>
        <Text
          className="relative mt-10 block max-w-5xl text-base md:text-xl"
          color="secondary">
          <FormattedMessage
            defaultMessage="We are also looking to include more framework-specific questions like React, Vue, Angular, etc."
            description="Question base section subtitle - second paragraph"
            id="Im9sPX"
          />
        </Text>
      </InterviewsMarketingContinuousUpdates>
      <InterviewsMarketingGeneralFAQSection />
      <MarketingContactUs />
    </>
  );
}
