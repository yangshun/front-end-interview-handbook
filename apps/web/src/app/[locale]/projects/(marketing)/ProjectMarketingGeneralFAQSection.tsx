import clsx from 'clsx';

import type { FAQItems } from '~/data/faqs/FAQs';
import {
  projectComponentUsage,
  projectModular,
  projectPortfolio,
  projectPricingModel,
  projectsBeginner,
  projectsOffering,
  projectsSenior,
  projectsUnique,
  projectSupport,
  projectUsefulness,
  worthBuyingProjects,
} from '~/data/faqs/ProjectsGeneralFAQs';

import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingFAQSection from '~/components/marketing/faqs/MarketingFAQSection';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

const generalFaqs: FAQItems = [
  projectPricingModel,
  projectsOffering,
  projectsUnique,
  worthBuyingProjects,
  projectsBeginner,
  projectsSenior,
  projectUsefulness,
  projectModular,
  projectPortfolio,
  projectComponentUsage,
  projectSupport,
];

export default function ProjectMarketingGeneralFAQSection() {
  const intl = useIntl();

  return (
    <div id="faq">
      <Container
        className={clsx(
          'relative isolate flex flex-col gap-y-12',
          'py-12 lg:py-24',
        )}
        width="marketing">
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
            <MarketingFAQSection
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
    </div>
  );
}
