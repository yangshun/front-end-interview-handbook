import { FormattedMessage, useIntl } from 'react-intl';

import type { FAQItem, FAQItems } from '~/data/faqs/FAQs';
import { generalSeniority, generalWorthIt } from '~/data/faqs/GeneralFAQs';

import FAQSection from '~/components/interviews/marketing/faqs/FAQSection';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

const projectsPreparation: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage='Nothing at all! Just click "Start project", and we will take care of everything else and guide you along the way.'
        description="FAQ answer for projects platform"
        id="rzu02O"
      />
    </p>
  ),
  key: 'preparation',
  question: (
    <FormattedMessage
      defaultMessage="What do I need to prepare before starting a challenge?"
      description="FAQ question for projects platform"
      id="i1Qhhq"
    />
  ),
};

const projectsFAQs: FAQItems = [
  projectsPreparation,
  generalWorthIt,
  generalSeniority,
];

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
        {/* TODO(projects): Replace with real FAQ */}
        <FAQSection
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
