import { FormattedMessage } from 'react-intl';

import type { Testimonial } from '~/data/Testimonials';
import { useTestimonials } from '~/data/Testimonials';

import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import TestimonialCard from './TestimonialCard';
import MarketingSectionHeader from '../MarketingSectionHeader';

export default function MarketingTestimonialsSection() {
  const testimonialsObjects = useTestimonials();

  const testimonials: ReadonlyArray<Testimonial> = [
    testimonialsObjects.alan,
    testimonialsObjects.larry,
    testimonialsObjects.gouse,
    testimonialsObjects.delhi,
    testimonialsObjects.luke,
    testimonialsObjects.prashanth,
    testimonialsObjects.anand,
    testimonialsObjects.vietnam,
    testimonialsObjects.jacky,
    testimonialsObjects.ryan,
    testimonialsObjects.nafis,
    testimonialsObjects.zhenchao,
    testimonialsObjects.india,
  ];

  return (
    <Container className="max-lg:rounded-t-3xl max-lg:theme-bg-radial-glow isolate py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <MarketingSectionHeader
          heading={
            <FormattedMessage
              defaultMessage="We have helped thousands of Software Engineers"
              description="Testimonial section heading"
              id="E7SqUY"
            />
          }
          title={
            <FormattedMessage
              defaultMessage="Testimonials"
              description="Testimonial section title"
              id="MCqeck"
            />
          }
        />
      </div>
      <Section>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <CardContainer className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="pt-6 sm:inline-block sm:w-full sm:px-3">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </CardContainer>
        </div>
      </Section>
    </Container>
  );
}
