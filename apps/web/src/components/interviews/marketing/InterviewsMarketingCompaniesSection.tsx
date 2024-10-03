import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

export default function InterviewsMarketingCompaniesSection() {
  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-lg pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Leverage insider tips from leading companies"
          description="Title for marketing page section"
          id="7UW/T/"
        />
      </Heading>
      <Section>
        <Text
          className="mt-6 block max-w-xl text-base lg:text-lg"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Practicing company-specific questions is the quickest way to ace specific interviews. We regularly survey and update lists for known questions tested in top companies around the world."
            description="Marketing page section subtitle"
            id="z9lq1x"
          />
        </Text>
      </Section>
    </Container>
  );
}
