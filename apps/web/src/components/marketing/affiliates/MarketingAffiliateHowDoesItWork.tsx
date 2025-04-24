import clsx from 'clsx';
import { useInView } from 'motion/react';
import { useRef } from 'react';

import { FormattedMessage } from '~/components/intl';
import MarketingSectionTitleLabel from '~/components/marketing/MarketingSectionTitleLabel';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import MarketingAffiliateSteps from './MarketingAffiliateSteps';

export default function MarketingAffiliateHowDoesItWork() {
  const sectionMarkerRef = useRef(null);
  const isInView = useInView(sectionMarkerRef, {
    amount: 'all',
    once: true,
  });

  return (
    <div>
      <Container width="marketing">
        <div
          className={clsx(
            'relative py-24 transition-opacity duration-1000 ease-in-out lg:pt-16',
            isInView ? 'opacity-100' : 'opacity-0',
          )}
          id="how-does-it-work">
          <div className="pb-10 lg:pb-12">
            <MarketingSectionTitleLabel className="py-6">
              <FormattedMessage
                defaultMessage="How does it work?"
                description="Section label for 'How does it work' section on the 'Become an Affiliate'  page to explain how the affiliate program works"
                id="QggKKV"
              />
            </MarketingSectionTitleLabel>
            <Heading className="max-w-4xl" level="heading2">
              <FormattedMessage
                defaultMessage="3 simple steps to start earning"
                description="Title for 'How does it work' section on the 'Become an Affiliate'  page to explain how the affiliate program works"
                id="/jCLBS"
              />
            </Heading>
            <div ref={sectionMarkerRef} />
          </div>
          <Section>
            <MarketingAffiliateSteps />
            <Text className="mt-12 block" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="<strong>Note</strong>: We have some basic policies on affiliate conduct. Please read the agreement carefully in the sign up process."
                description="Tip at the bottom of the 'How does it work' section on the 'Become an Affiliate' page to highlight the affiliate agreement"
                id="H94EnK"
                values={{
                  strong: (chunks) => (
                    <strong className="font-medium">{chunks}</strong>
                  ),
                }}
              />
            </Text>
          </Section>
        </div>
      </Container>
    </div>
  );
}
