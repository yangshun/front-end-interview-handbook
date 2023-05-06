'use client';

import MarketingContactPlatforms from '~/components/marketing/contact/MarketingContactPlatforms';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function ResumeReviewContact() {
  return (
    <div className=" bg-gray-900  pt-28 pb-72 xl:pt-32 xl:pb-80">
      <Container>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div>
            <Heading className="text-3xl font-bold text-white sm:text-4xl sm:tracking-tight">
              Have questions, feedback or anything to say?
            </Heading>
            <div className="mt-4">
              <p className="mx-auto mt-6 text-left text-base  leading-8  text-gray-300">
                Email us at{' '}
                <Anchor href="mailto:contact@greatfrontend.com">
                  contact@greatfrontend.com
                </Anchor>{' '}
                or use one of the options below. We usually get back within a
                day or two.
              </p>
            </div>
          </div>
          <Section>
            <MarketingContactPlatforms />
          </Section>
        </div>
      </Container>
    </div>
  );
}
