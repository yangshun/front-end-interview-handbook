import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

export default function InterviewsMarketingTestCodeSection() {
  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Test your code automatically with a single click"
          description="Title for marketing page section"
          id="JV1NXV"
        />
      </Heading>
      <Section>
        <Text
          className="mt-6 block max-w-2xl text-base lg:text-lg"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Polish your answers with a comprehensive test suite that covers all the important edge cases that interviewers will look out for."
            description="Marketing page section subtitle"
            id="fr4Vl4"
          />
        </Text>
      </Section>
    </Container>
  );
}
