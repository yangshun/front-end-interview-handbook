import InterviewsTestimonialsSlider from '~/components/interviews/common/InterviewsTestimonialsSlider';
import useInterviewsMarketingSliderTestimonials from '~/components/interviews/marketing/testimonials/useInterviewsMarketingSliderTestimonials';
import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

export default function InterviewsStudyPlanTestimonialsSection() {
  const testimonials = useInterviewsMarketingSliderTestimonials();

  return (
    <Section>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Hear it from our users"
              description="Testimonials section heading of study plans page"
              id="jZFgzW"
            />
          </Heading>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="With our study plans, many users have secured multiple offers at leading companies with substantial TC gains. You could be next."
              description="Testimonials section description of study plans page"
              id="VBLk5q"
            />
          </Text>
        </div>
        <InterviewsTestimonialsSlider data={testimonials} />
      </div>
    </Section>
  );
}
