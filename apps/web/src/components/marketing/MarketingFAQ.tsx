import { FormattedMessage, useIntl } from 'react-intl';

import type { FAQItems } from '~/data/faqs/FAQs';
import {
  buying,
  freeUpdates,
  lifetimeAccess,
  questions,
  seniority,
  worthIt,
} from '~/data/faqs/GeneralFAQs';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import FAQSection from './faqs/FAQSection';
import MarketingSectionHeader from './MarketingSectionHeader';

const generalFaqs: FAQItems = [
  buying,
  questions,
  worthIt,
  seniority,
  lifetimeAccess,
  freeUpdates,
];

export default function FrequentlyAskedQuestions() {
  const intl = useIntl();

  return (
    <Container className="relative flex flex-col gap-y-12 py-32">
      <MarketingSectionHeader
        description={
          <FormattedMessage
            defaultMessage="Can't find the answer you are looking for? <link>Reach out to us!</link>"
            description="Subtitle of Homepage's FAQ section, encouraging users to contact us if none of the FAQs resolve their problems"
            id="JQa3Or"
            values={{
              link: (chunks) => (
                <Anchor
                  className="whitespace-nowrap"
                  href="mailto:contact@greatfrontend.com"
                  weight="medium">
                  {chunks}
                </Anchor>
              ),
            }}
          />
        }
        heading={
          <FormattedMessage
            defaultMessage="FAQs"
            description="Frequently Asked Questions"
            id="DIs2lU"
          />
        }
      />
      <Section>
        <div className="flex flex-col gap-y-6">
          <FAQSection
            faqs={generalFaqs}
            hideTitle={true}
            title={intl.formatMessage({
              defaultMessage: 'General',
              description: 'Title for FAQ section',
              id: 'FRg+qa',
            })}
          />
        </div>
      </Section>
    </Container>
  );
}
