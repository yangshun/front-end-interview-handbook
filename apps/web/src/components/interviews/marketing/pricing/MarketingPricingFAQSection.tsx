import { FormattedMessage, useIntl } from 'react-intl';

import type { FAQItems } from '~/data/faqs/FAQs';
import {
  purchaseDiscounts,
  purchaseIssues,
  purchaseLifetimeAccess,
  purchaseLifetimeExpensive,
  purchaseOptions,
  purchaseRefund,
  purchaseSubscriptionCancel,
  purchaseSubscriptionCancelled,
  purchaseSubscriptionRenew,
} from '~/data/faqs/PurchaseFAQs';

import MarketingSectionHeader from '~/components/common/marketing/MarketingSectionHeader';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import FAQSection from '../faqs/FAQSection';

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
];

export default function MarketingPricingFAQSection() {
  const intl = useIntl();

  return (
    <Container
      className="max-lg:theme-bg-radial-glow relative isolate flex flex-col gap-y-12 py-24 max-lg:rounded-t-3xl lg:py-32"
      variant="narrow">
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
                  href="/faq"
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
