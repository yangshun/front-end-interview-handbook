import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

export default function InterviewsMarketingPracticeQuestionBankSection() {
  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="A practice question bank with everything you'd ever need"
          description="Title for marketing page section"
          id="scZfxP"
        />
      </Heading>
      <Section>
        <Text
          className="mt-6 block max-w-2xl text-base lg:text-lg"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="We have questions in every critical topic, interview format and framework / language. Every question comes with solutions and test cases."
            description="Subtitle for marketing page section"
            id="2vJhW9"
          />
        </Text>
      </Section>
    </Container>
  );
}
