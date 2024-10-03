import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

export default function InterviewsMarketingFAQSection() {
  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Your commonly asked questions, answered"
          description="Title for marketing page section"
          id="cOyhbp"
        />
      </Heading>
      <Section>
        <Text
          className="mt-6 block max-w-xl text-base lg:text-lg"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Can't find the answer you are looking for?"
            description="Marketing page section subtitle"
            id="QJTIr/"
          />
        </Text>
        <Text
          className="block max-w-xl text-base lg:text-lg"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="View all <link>frequently asked questions</link>"
            description="Marketing page section subtitle"
            id="yiXkEL"
            values={{
              link: (chunks) => (
                <Anchor href="/interviews/faq">{chunks}</Anchor>
              ),
            }}
          />
        </Text>
      </Section>
    </Container>
  );
}
