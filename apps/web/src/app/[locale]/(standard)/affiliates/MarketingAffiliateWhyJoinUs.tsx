import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import { FormattedMessage } from '~/components/intl';
import MarketingSectionTitleLabel from '~/components/marketing/MarketingSectionTitleLabel';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import MarketingAffiliateWhySections from './MarketingAffiliateWhySections';

export default function MarketingAffiliateWhyJoinUs() {
  const sectionMarkerRef = useRef(null);
  const isInView = useInView(sectionMarkerRef, {
    amount: 'all',
    once: true,
  });

  return (
    <div>
      <Container variant="narrow">
        <div
          className={clsx(
            'relative py-24 transition-opacity duration-1000 ease-in-out lg:pt-16',
            isInView ? 'opacity-100' : 'opacity-0',
          )}>
          <div className="pb-10 lg:pb-12">
            <MarketingSectionTitleLabel className="py-6">
              <FormattedMessage
                defaultMessage="Why join us?"
                description="Section label for the 'Why become an affiliate' section on the 'Become an Affiliate' page"
                id="C7tiFm"
              />
            </MarketingSectionTitleLabel>
            <Heading className="max-w-4xl" level="heading2">
              <FormattedMessage
                defaultMessage="Why be a GreatFrontEnd Affiliate?"
                description="Title for the 'Why become an affiliate' section on the 'Become an Affiliate' page"
                id="hQa+4K"
              />
            </Heading>
            <div ref={sectionMarkerRef} />
          </div>
          <Section>
            <MarketingAffiliateWhySections />
          </Section>
        </div>
      </Container>
    </div>
  );
}
