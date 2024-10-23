'use client';

import MarketingCommunitySection from '~/components/marketing/contact/MarketingCommunitySection';
import MarketingContactUs from '~/components/marketing/contact/MarketingContactUs';
import MarketingEmailSubscribe from '~/components/marketing/contact/MarketingEmailSubscribe';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function MarketingContactPage() {
  return (
    <div className="flex flex-col gap-12 py-12 md:py-16">
      <Heading className="sr-only" level="custom">
        {/* TODO: i18n */}
        Contact Us
      </Heading>
      <Section>
        <MarketingContactUs />
        <MarketingCommunitySection />
        <div className="mt-12" />
        <MarketingEmailSubscribe />
      </Section>
    </div>
  );
}
