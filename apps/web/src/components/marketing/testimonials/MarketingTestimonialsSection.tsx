import { FormattedMessage } from 'react-intl';

import type { Testimonial } from '~/data/Testimonials';
import { useTestimonials } from '~/data/Testimonials';

import CardContainer from '~/components/ui/Card/CardContainer';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import TestimonialCard from './TestimonialCard';

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
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Heading className="sr-only" level="custom">
            {/* TODO: i18n */}
            Testimonials
          </Heading>
          <Text
            className="text-center text-3xl font-bold leading-8 tracking-tight sm:text-4xl md:text-4xl lg:text-5xl"
            display="block"
            size="custom"
            weight="custom">
            <FormattedMessage
              defaultMessage="We have helped thousands of Software Engineers"
              description="Testimonial section subtitle"
              id="mST7/q"
            />
          </Text>
        </div>
        <Section>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <CardContainer className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.key}
                  className="pt-6 sm:inline-block sm:w-full sm:px-3">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </CardContainer>
          </div>
        </Section>
      </div>
    </div>
  );
}
