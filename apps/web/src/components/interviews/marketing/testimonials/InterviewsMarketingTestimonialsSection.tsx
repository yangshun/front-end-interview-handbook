import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import {
  themeGradientHeading,
  themeMarketingHeadingSize,
} from '~/components/ui/theme';

import type { InterviewsMarketingTestimonial } from './InterviewsMarketingTestimonialCard';
import TestimonialCard from './InterviewsMarketingTestimonialCard';

type Props = Readonly<{
  columns?: number;
  showSeeAllLink?: boolean;
  testimonials: ReadonlyArray<InterviewsMarketingTestimonial>;
  width: ComponentProps<typeof Container>['width'];
}>;

export default function InterviewsMarketingTestimonialsSection({
  width,
  columns = 3,
  showSeeAllLink = true,
  testimonials,
}: Props) {
  const intl = useIntl();

  return (
    <Container
      className={clsx(
        'flex flex-col gap-12 lg:gap-16',
        'isolate',
        'py-16 sm:py-20',
      )}
      width={width}>
      <div className="max-w-xl">
        <Heading
          className={clsx(
            themeMarketingHeadingSize,
            themeGradientHeading,
            'pb-1',
          )}
          level="custom"
          weight="medium">
          <FormattedMessage
            defaultMessage="{count} engineers trust us with their job interviews"
            description="Testimonial section title"
            id="wm6L7K"
            values={{
              count: '500k+',
            }}
          />
        </Heading>
      </div>
      <Section>
        <div className={clsx('mx-auto md:mx-0', 'flow-root')}>
          <CardContainer
            className={clsx(
              '-mt-6 sm:-mx-3 sm:columns-2 sm:text-[0]',
              columns === 3 && 'xl:columns-3',
              columns === 4 && 'xl:columns-3 2xl:columns-4',
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
        {showSeeAllLink && (
          <div className="text-center">
            <Button
              href="/interviews/testimonials"
              icon={RiArrowRightLine}
              label={intl.formatMessage({
                defaultMessage: 'See all testimonials',
                description:
                  'Label for view all testimonials button in homepage',
                id: 'gU6oac',
              })}
              prefetch={null}
              size="md"
              variant="secondary"
            />
          </div>
        )}
      </Section>
    </Container>
  );
}
