import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import InterviewsTestimonialsSlider from '~/components/interviews/common/InterviewsTestimonialsSlider';
import { useInterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
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
          name: 'Dropbox logo',
        },
        {
          logoUrl: '/img/company-logos/lyft-logomark.svg',
          name: 'Lyft logo',
        },
        {
          logoUrl: '/img/company-logos/google-logomark.svg',
          name: 'Google logo',
        },
        {
          logoUrl: '/img/company-logos/airbnb-logomark.svg',
          name: 'Airbnb logo',
        },
      ],
    },
    {
      ...testimonials.locChuong,
      compensationIncreased: '2x',
      offers: [
        {
          logoUrl: '/img/company-logos/airbnb-logomark.svg',
          name: 'Airbnb logo',
        },
        {
          logoUrl: '/img/company-logos/lyft-logomark.svg',
          name: 'Lyft logo',
        },
      ],
    },
  ];

  return (
    <Section>
      <Container
        className={clsx(
          'px-6 py-20 lg:px-[168px]',
          'flex flex-col gap-6 md:gap-12',
        )}>
        <div className="flex flex-col gap-6">
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
            className="text-base lg:max-w-xl lg:text-lg"
            color="secondary"
            size="inherit"
            weight="medium">
            <FormattedMessage
              defaultMessage="Scores of our users have landed multiple offers at the world's top companies with substantial TC gains. Be the next."
              description="Subtitle for the offers don't lie section"
              id="wBeFIk"
            />
          </Text>
        </div>
        <InterviewsTestimonialsSlider
          brandSlider={false}
          data={testimonialsData}
        />
      </Container>
    </Section>
  );
}
