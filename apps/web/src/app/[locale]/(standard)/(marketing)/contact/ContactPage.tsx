'use client';

import MarketingContactUs from '~/components/marketing/contact/MarketingContactUs';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Heading className="sr-only" level="custom">
        {/* TODO: i18n */}
        Contact Us
      </Heading>
      <Section>
        <MarketingContactUs />
      </Section>
    </div>
  );
}
