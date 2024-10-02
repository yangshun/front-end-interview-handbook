import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsMarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialsSection';
import { useInterviewsMarketingTestimonials } from '~/components/interviews/marketing/testimonials/useInterviewsMarketingTestimonials';
import InterviewsPricingSectionLocalizedContainer from '~/components/interviews/purchase/InterviewsPricingSectionLocalizedContainer';

export default function InterviewsMarketingHomePageBottomNew() {
  const { userProfile } = useUserProfile();
  const testimonials = useInterviewsMarketingTestimonials();

  return (
    <>
      {!(
        userProfile?.isInterviewsPremium && userProfile?.plan === 'lifetime'
      ) && <InterviewsPricingSectionLocalizedContainer />}
      <InterviewsMarketingTestimonialsSection testimonials={testimonials} />
    </>
  );
}
