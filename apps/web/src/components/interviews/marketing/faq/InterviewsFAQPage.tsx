'use client';

import type { FAQItems } from '~/data/faqs/FAQs';
import {
  generalBuying,
  generalFreeUpdates,
  generalSeniority,
  generalTarget,
  generalUnique,
  generalWhatsIncluded,
  generalWorthIt,
} from '~/data/faqs/InterviewsGeneralFAQs';
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
import { supportHow, supportTechnical } from '~/data/faqs/SupportFAQs';

import { useIntl } from '~/components/intl';
import MarketingFAQSection from '~/components/marketing/faqs/MarketingFAQSection';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

const generalFaqs: FAQItems = [
  generalTarget,
  generalUnique,
  generalWorthIt,
  generalBuying,
  generalWhatsIncluded,
  generalFreeUpdates,
  generalSeniority,
];

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

const supportFaqs: FAQItems = [supportTechnical, supportHow];

export default function InterviewsFAQPage() {
  const intl = useIntl();

  return (
    <Container className="my-20 flex flex-col gap-y-8" width="marketing">
      <Heading level="heading2" weight="medium">
        GreatFrontEnd Interviews FAQs
      </Heading>
      <Section>
        <Text color="secondary">
          This page answers questions related to GreatFrontEnd Interviews.
        </Text>
        <Divider />
        <MarketingFAQSection
          faqs={generalFaqs}
          title={intl.formatMessage({
            defaultMessage: 'General',
            description: 'Title for FAQ section',
            id: 'FRg+qa',
          })}
        />
        <Divider />
        <MarketingFAQSection
          faqs={purchaseFaqs}
          title={intl.formatMessage({
            defaultMessage: 'Purchase',
            description: 'Title for FAQ section',
            id: 'UWucPu',
          })}
        />
        <Divider />
        <MarketingFAQSection
          faqs={supportFaqs}
          title={intl.formatMessage({
            defaultMessage: 'Support',
            description: 'Title for FAQ section',
            id: '2SDdF5',
          })}
        />
      </Section>
    </Container>
  );
}
