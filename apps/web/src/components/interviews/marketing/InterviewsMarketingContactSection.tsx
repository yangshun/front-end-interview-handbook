import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

export default function InterviewsMarketingContactSection() {
  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Don't hesitate to reach out. We're always here to help."
          description="Title for marketing page section"
          id="RdVD3x"
        />
      </Heading>
      <Section>
        <Text
          className="mt-6 block max-w-2xl text-base lg:text-lg"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Have questions, feedback or anything to say? Contact us. We usually get back within a day or two."
            description="Marketing page section subtitle"
            id="TpWg4H"
          />
        </Text>
      </Section>
    </Container>
  );
}
