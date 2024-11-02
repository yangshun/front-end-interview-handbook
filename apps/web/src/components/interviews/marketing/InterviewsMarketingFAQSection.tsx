import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

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

import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingFAQSection from '~/components/marketing/faqs/MarketingFAQSection';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

const generalFaqs: FAQItems = [
  generalTarget,
  generalBuying,
  generalUnique,
  generalWhatsIncluded,
  generalFreeUpdates,
  generalWorthIt,
  generalSeniority,
];

export default function InterviewsMarketingFAQSection() {
  const intl = useIntl();

  return (
    <Container className={clsx('py-20')} width="marketing">
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
          className={clsx(
            'mt-6 block',
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

        <div className="mt-16">
          <MarketingFAQSection
            accordionTriggerClassName="py-8"
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
