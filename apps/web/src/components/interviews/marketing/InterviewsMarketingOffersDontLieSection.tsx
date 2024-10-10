import clsx from 'clsx';

import InterviewsTestimonialsSlider from '~/components/interviews/common/InterviewsTestimonialsSlider';
import { useInterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

export default function InterviewsMarketingOffersDontLieSection() {
  const testimonials = useInterviewsMarketingTestimonialsDict();

  // TODO(interviews): remove hardcoded data
  const testimonialsData = [
    {
      ...testimonials.lunghaoLee,
      compensationIncreased: '4x',
      offers: [
        {
          logoUrl: '/img/company-logos/dropbox-logomark.svg',
          name: 'Dropbox',
        },
        {
          logoUrl: '/img/company-logos/lyft-logomark.svg',
          name: 'Lyft',
        },
        {
          logoUrl: '/img/company-logos/google-logomark.svg',
          name: 'Google',
        },
        {
          logoUrl: '/img/company-logos/airbnb-logomark.svg',
          name: 'Airbnb',
        },
      ],
    },
    {
      ...testimonials.locChuong,
      compensationIncreased: '2x',
      offers: [
        {
          logoUrl: '/img/company-logos/airbnb-logomark.svg',
          name: 'Airbnb',
        },
        {
          logoUrl: '/img/company-logos/lyft-logomark.svg',
          name: 'Lyft',
        },
      ],
    },
  ];

  return (
    <Container className={clsx('flex flex-col gap-6 md:gap-12', 'py-20')}>
      <div>
        <Heading
          className={themeGradientHeading}
          level="heading2"
          weight="medium">
          <FormattedMessage
            defaultMessage="The offers don't lie"
            description="Title for the offers don't lie section"
            id="nqRMgW"
          />
        </Heading>
        <Text
          className={clsx(
            'mt-6 block',
            'text-base lg:text-lg',
            'lg:font-medium',
            'max-w-md lg:max-w-2xl',
          )}
          color="secondary"
          size="inherit"
          weight="inherit">
          <FormattedMessage
            defaultMessage="Scores of our users have landed multiple offers at the world's top companies with substantial TC gains. Be the next."
            description="Subtitle for the offers don't lie section"
            id="wBeFIk"
          />
        </Text>
      </div>
      <Section>
        <InterviewsTestimonialsSlider
          brandSlider={false}
          data={testimonialsData}
        />
      </Section>
    </Container>
  );
}
