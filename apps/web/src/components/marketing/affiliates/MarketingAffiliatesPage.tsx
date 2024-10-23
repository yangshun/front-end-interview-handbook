'use client';

import Section from '~/components/ui/Heading/HeadingContext';

import MarketingAffiliateCTABanner from './MarketingAffiliateCTABanner';
import MarketingAffiliateFAQ from './MarketingAffiliateFAQ';
import MarketingAffiliateHero from './MarketingAffiliateHero';
import MarketingAffiliateHowDoesItWork from './MarketingAffiliateHowDoesItWork';
import MarketingAffiliateWhyJoinUs from './MarketingAffiliateWhyJoinUs';

export default function MarketingAffiliatesPage() {
  return (
    <div className="bg-[#070708]" data-color-scheme="dark">
      <MarketingAffiliateHero />
      <Section>
        <MarketingAffiliateHowDoesItWork />
        <MarketingAffiliateWhyJoinUs />
        <MarketingAffiliateFAQ />
        <MarketingAffiliateCTABanner />
      </Section>
    </div>
  );
}
