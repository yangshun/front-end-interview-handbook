import React from 'react';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import MarketingContactPlatforms from './MarketingContactPlatforms';
import MarketingEmailSubscribe from './MarketingEmailSubscribe';

export default function MarketingContactUs() {
  return (
    <div className="overflow-hidden bg-slate-50 pb-16 sm:bg-white sm:pb-24">
      <div className="relative sm:py-16">
        <div aria-hidden="true" className="hidden sm:block">
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-slate-50" />
          <svg
            className="absolute top-8 left-2/3 -ml-3"
            fill="none"
            height={392}
            viewBox="0 0 404 392"
            width={404}>
            <defs>
              <pattern
                height={20}
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                patternUnits="userSpaceOnUse"
                width={20}
                x={0}
                y={0}>
                <rect
                  className="text-slate-200"
                  fill="currentColor"
                  height={4}
                  width={4}
                  x={0}
                  y={0}
                />
              </pattern>
            </defs>
            <rect
              fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
              height={392}
              width={404}
            />
          </svg>
        </div>
        <div className="space-y-24">
          <Container className="relative" variant="narrow">
            <div className="space-y-10 py-6 md:grid md:grid-cols-2 md:gap-8">
              <div>
                <Heading level="heading3">
                  <FormattedMessage
                    defaultMessage="Have questions, feedback or anything to say?"
                    description="Title for contact us section"
                    id="eyLjDz"
                  />
                </Heading>
                <div className="mt-4">
                  <p className="text-lg text-slate-500">
                    <FormattedMessage
                      defaultMessage="Email us at <email>contact@greatfrontend.com</email> or use one of the options below. We usually get back within a day or two."
                      description="Subtitle for contact us section"
                      id="qjKLfH"
                      values={{
                        email: (chunks) => (
                          <Anchor href="mailto:contact@greatfrontend.com">
                            {chunks}
                          </Anchor>
                        ),
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
            <Section>
              <MarketingContactPlatforms />
            </Section>
          </Container>
          <Section>
            <MarketingEmailSubscribe />
          </Section>
        </div>
      </div>
    </div>
  );
}
