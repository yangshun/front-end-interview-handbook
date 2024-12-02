import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

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
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeGradientHeading,
  themeMarketingHeadingSize,
} from '~/components/ui/theme';

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

export default function InterviewsPurchaseFAQSection() {
  const intl = useIntl();

  return (
    <Container className={clsx('py-16 sm:py-20')} width="marketing">
      <div className="flex flex-col gap-x-2 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
        <Heading
          className={clsx(
            themeMarketingHeadingSize,
            themeGradientHeading,
            'max-w-lg pb-1',
          )}
          level="custom"
          weight="medium">
          <FormattedMessage
            defaultMessage="Your commonly asked questions, answered"
            description="Title for marketing page section"
            id="cOyhbp"
          />
        </Heading>
        <div className="flex flex-col lg:items-end">
          <Text
            className={clsx(
              'block xl:mt-6',
              'text-base lg:text-lg',
              'lg:font-medium',
              'max-w-md lg:max-w-2xl',
            )}
            color="secondary"
            size="inherit"
            weight="inherit">
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
                  <Anchor
                    className="inline-flex items-center gap-1"
                    href="/interviews/faq">
                    {chunks} <RiArrowRightLine className="size-4.5 shrink-0" />
                  </Anchor>
                ),
              }}
            />
          </Text>
        </div>
      </div>
      <Section>
        <div className="mt-12 lg:mt-16">
          <MarketingFAQSection
            accordionTriggerClassName="py-8 text-lg"
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
