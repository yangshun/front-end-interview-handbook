import InterviewsMarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialsSection';
import { useInterviewsMarketingTestimonials } from '~/components/interviews/marketing/testimonials/useInterviewsMarketingTestimonials';

export default function InterviewsMarketingHomePageBottomNew() {
  const testimonials = useInterviewsMarketingTestimonials();

  return <InterviewsMarketingTestimonialsSection testimonials={testimonials} />;
}
