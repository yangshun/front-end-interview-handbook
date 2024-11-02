'use client';

import InterviewsMarketingTestimonialsSection from './InterviewsMarketingTestimonialsSection';
import { useInterviewsMarketingTestimonials } from './useInterviewsMarketingTestimonials';

const columns = 4;

export default function InterviewsMarketingTestimonialPage() {
  const testimonials = useInterviewsMarketingTestimonials(true, columns);

  return (
    <InterviewsMarketingTestimonialsSection
      columns={columns}
      showSeeAllLink={false}
      testimonials={testimonials}
      width="marketing"
    />
  );
}
