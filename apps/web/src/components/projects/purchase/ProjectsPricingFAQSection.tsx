import type { FAQItems } from '~/data/faqs/FAQs';
import {
  institutionsOrgDiscounts,
  interviewsAccess,
  offerRefunds,
  purchaseSubscriptionRenew,
  studentDiscounts,
  subscriptionCancel,
  unspentCredits,
} from '~/data/faqs/ProjectsPurchaseFAQs';

import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingFAQSection from '~/components/marketing/faqs/MarketingFAQSection';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

const purchaseFaqs: FAQItems = [
  unspentCredits,
  studentDiscounts,
  institutionsOrgDiscounts,
  offerRefunds,
  subscriptionCancel,
  purchaseSubscriptionRenew,
  interviewsAccess,
];

export default function ProjectsPricingFAQSection() {
  const intl = useIntl();

  return (
    <Container
      className="relative isolate flex flex-col gap-y-12"
      variant="narrow">
      <MarketingSectionHeader
        description={
          <FormattedMessage
            defaultMessage="Can't find the answer you are looking for? <link>Reach out to us!</link>"
            description="Subtitle of projects pricing's FAQ section"
            id="11Z2Fw"
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
        <MarketingFAQSection
          faqs={purchaseFaqs}
          hideTitle={true}
          title={intl.formatMessage({
            defaultMessage: 'Purchase',
            description: 'Title for FAQ section',
            id: 'UWucPu',
          })}
        />
      </Section>
    </Container>
  );
}
