'use client';

import MarketingContactPlatforms from '~/components/marketing/contact/MarketingContactPlatforms';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function ResumeReviewContact() {
  return (
    <div className="bg-pink-600 py-16 lg:py-24 xl:py-32">
      <Container className="text-center" variant="narrow">
        <Heading className="text-3xl font-bold text-white sm:text-4xl sm:tracking-tight">
          Have questions, feedback or anything to say?
        </Heading>
        <div className="mt-4">
          <p className="mx-auto mt-6 text-base leading-8 text-white">
            Email us at{' '}
            <Anchor
              className="text-white hover:text-white hover:underline"
              href="mailto:contact@greatfrontend.com?subject=GreatFrontEnd+Portfolio+Review">
              contact@greatfrontend.com
            </Anchor>{' '}
            or use one of the options below. We usually get back within a day or
            two.
          </p>
        </div>
        <Section>
          <MarketingContactPlatforms />
        </Section>
      </Container>
    </div>
  );
}
