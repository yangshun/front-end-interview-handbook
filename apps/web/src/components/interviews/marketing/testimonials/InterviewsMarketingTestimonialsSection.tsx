import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Button from '~/components/ui/Button';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import Marquee from '~/components/ui/Marquee';

import type { InterviewsMarketingTestimonial } from './InterviewsMarketingTestimonialCard';
import TestimonialCard from './InterviewsMarketingTestimonialCard';

type Props = Readonly<{
  columns?: number;
  containerVariant?: ComponentProps<typeof Container>['variant'];
  showSeeAllLink?: boolean;
  testimonials: ReadonlyArray<InterviewsMarketingTestimonial>;
}>;

export default function InterviewsMarketingTestimonialsSection({
  containerVariant,
  columns = 3,
  showSeeAllLink = true,
  testimonials,
}: Props) {
  return (
    <Container
      className={clsx(
        'max-lg:theme-bg-radial-glow',
        'max-lg:rounded-t-3xl',
        'isolate',
        'py-16 sm:py-24',
      )}
      variant={containerVariant}>
      <div className="mx-auto max-w-3xl">
        <MarketingSectionHeader
          heading={
            <FormattedMessage
              defaultMessage="We have helped tens of thousands of Software Engineers"
              description="Testimonial section heading"
              id="2bqhXu"
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
        <div
          className={clsx(
            'mx-auto mt-16 md:mx-0',
            'hidden sm:mt-20 sm:flow-root',
          )}>
          <CardContainer
            className={clsx(
              '-mt-8 sm:-mx-4 sm:text-[0] md:columns-2',
              columns === 3 && 'lg:columns-3',
              columns === 4 && 'lg:columns-3 xl:columns-4',
            )}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="pt-6 sm:inline-block sm:w-full sm:px-3">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </CardContainer>
        </div>
        <div className="mt-12 sm:hidden">
          <CardContainer className="relative h-[500px]">
            <Marquee periodSeconds={300} startEndGap={24}>
              <div className="grid w-max grid-flow-col grid-rows-1 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-auto max-w-[75vw]">
                    <div className="flex flex-col whitespace-normal">
                      <TestimonialCard {...testimonial} />
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </CardContainer>
        </div>
        {showSeeAllLink && (
          <div className="mt-8 text-center">
            <Button
              href="/interviews/testimonials"
              icon={RiArrowRightSLine}
              label="See all testimonials"
              size="md"
              variant="secondary"
            />
          </div>
        )}
      </Section>
    </Container>
  );
}
