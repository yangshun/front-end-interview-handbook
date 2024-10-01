import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingFAQSection from '~/components/marketing/faqs/MarketingFAQSection';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { projectsFAQs } from './ProjectsChallengeBriefFAQItems';

export default function ProjectsChallengeBriefFAQSection() {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="FAQ"
          description="Title for FAQ section on Projects project page"
          id="6U52IB"
        />
      </Heading>
      <Section>
        <MarketingFAQSection
          faqs={projectsFAQs}
          hideTitle={true}
          title={intl.formatMessage({
            defaultMessage: 'General',
            description: 'Title for FAQ section',
            id: 'FRg+qa',
          })}
        />
      </Section>
    </div>
  );
}
