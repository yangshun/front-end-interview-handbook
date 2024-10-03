import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

export default function InterviewsMarketingSolutionsByExInterviewersSection() {
  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Every question answered by ex-interviewers"
          description="Title for marketing page section"
          id="LMI4bA"
        />
      </Heading>
      <Section>
        <Text
          className="mt-6 block max-w-2xl text-base lg:text-lg"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Referencing good solutions is crucial to learning effectively. We've written our solutions with special care to include practical considerations and multiple approaches."
            description="Marketing page section subtitle"
            id="jGbCXt"
          />
        </Text>
      </Section>
    </Container>
  );
}
