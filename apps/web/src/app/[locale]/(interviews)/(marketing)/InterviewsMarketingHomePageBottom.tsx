import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsMarketingContinuousUpdates from '~/components/interviews/marketing/InterviewsMarketingContinuousUpdates';
import InterviewsMarketingGeneralFAQSection from '~/components/interviews/marketing/InterviewsMarketingGeneralFAQSection';
import InterviewsMarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialsSection';
import { useInterviewsMarketingTestimonials } from '~/components/interviews/marketing/testimonials/useInterviewsMarketingTestimonials';
import InterviewsPricingSectionLocalizedContainer from '~/components/interviews/purchase/InterviewsPricingSectionLocalizedContainer';
import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingCommunitySection from '~/components/marketing/contact/MarketingCommunitySection';
import MarketingContactUs from '~/components/marketing/contact/MarketingContactUs';
import MarketingEmailSubscribe from '~/components/marketing/contact/MarketingEmailSubscribe';
import Text from '~/components/ui/Text';

export default function InterviewsMarketingHomePageBottom() {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const testimonials = useInterviewsMarketingTestimonials();

  return (
    <>
      {!(
        userProfile?.isInterviewsPremium && userProfile?.plan === 'lifetime'
      ) && <InterviewsPricingSectionLocalizedContainer />}
      <InterviewsMarketingTestimonialsSection testimonials={testimonials} />
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
      <MarketingEmailSubscribe />
      <div className="mt-12 md:mt-24 lg:mt-36" />
      <MarketingCommunitySection />
      <div className="mt-12 md:mt-24 lg:mt-36" />
      <MarketingContactUs />
    </>
  );
}
