'use client';

import InterviewsMarketingContactSection from '~/components/interviews/marketing/InterviewsMarketingContactSection';
import InterviewsMarketingDreamJobSection from '~/components/interviews/marketing/InterviewsMarketingDreamJobSection';
import { FormattedMessage } from '~/components/intl';
import MarketingCommunitySection from '~/components/marketing/contact/MarketingCommunitySection';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function MarketingContactPage() {
  return (
    <div className="flex flex-col">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Contact Us"
          description="Page title for contact page"
          id="wOddZ+"
        />
      </Heading>
      <Section>
        <InterviewsMarketingContactSection />
        <MarketingCommunitySection />
        <InterviewsMarketingDreamJobSection />
      </Section>
    </div>
  );
}
