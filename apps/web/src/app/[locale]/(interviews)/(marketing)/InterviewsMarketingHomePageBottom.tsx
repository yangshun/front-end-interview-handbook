import { useMediaQuery } from 'usehooks-ts';

import InterviewsMarketingContactSection from '~/components/interviews/marketing/InterviewsMarketingContactSection';
import InterviewsMarketingDreamJobSection from '~/components/interviews/marketing/InterviewsMarketingDreamJobSection';
import InterviewsMarketingFAQSection from '~/components/interviews/marketing/InterviewsMarketingFAQSection';
import InterviewsMarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialsSection';
import { useInterviewsMarketingTestimonials } from '~/components/interviews/marketing/testimonials/useInterviewsMarketingTestimonials';
import MarketingCommunitySection from '~/components/marketing/contact/MarketingCommunitySection';

export default function InterviewsMarketingHomePageBottom() {
  const testimonials = useInterviewsMarketingTestimonials();
  const isMobileAndBelow = useMediaQuery('(max-width: 640px)');

  return (
    <>
      <InterviewsMarketingTestimonialsSection
        testimonials={
          isMobileAndBelow ? testimonials.slice(0, 8) : testimonials
        }
        width="marketing"
      />
      <InterviewsMarketingFAQSection />
      <MarketingCommunitySection />
      <InterviewsMarketingContactSection />
      <InterviewsMarketingDreamJobSection />
    </>
  );
}
