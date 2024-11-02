import type { FAQItems } from '~/data/faqs/FAQs';
import {
  projectsAccess,
  purchaseDiscounts,
  purchaseIssues,
  purchaseLifetimeAccess,
  purchaseLifetimeExpensive,
  purchaseOptions,
  purchaseRefund,
  purchaseSubscriptionCancel,
  purchaseSubscriptionCancelled,
  purchaseSubscriptionRenew,
} from '~/data/faqs/InterviewsPurchaseFAQs';

import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import MarketingFAQSection from '../../marketing/faqs/MarketingFAQSection';

const purchaseFaqs: FAQItems = [
  purchaseOptions,
  purchaseLifetimeAccess,
  purchaseLifetimeExpensive,
  purchaseDiscounts,
  purchaseRefund,
  purchaseSubscriptionRenew,
  purchaseSubscriptionCancel,
  purchaseSubscriptionCancelled,
  purchaseIssues,
  projectsAccess,
];

export default function InterviewsPricingFAQSection() {
  const intl = useIntl();

  return (
    <Container
      className="max-lg:theme-bg-radial-glow relative isolate flex flex-col gap-y-12 py-24 max-lg:rounded-t-3xl lg:py-32"
      width="6xl">
      <MarketingSectionHeader
        description={
          <FormattedMessage
            defaultMessage="Can't find the answer you are looking for? View all <link>frequently-asked questions</link>."
            description="Subtitle of Homepage's FAQ section, encouraging users to contact us if none of the FAQs resolve their problems"
            id="yWnRZS"
            values={{
              link: (chunks) => (
                <Anchor
                  className="whitespace-nowrap"
                  href="/interviews/faq"
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
          <MarketingFAQSection
            faqs={purchaseFaqs}
            hideTitle={true}
            title={intl.formatMessage({
              defaultMessage: 'Purchase',
              description: 'Title for FAQ section',
              id: 'UWucPu',
            })}
          />
        </div>
      </Section>
    </Container>
  );
}
