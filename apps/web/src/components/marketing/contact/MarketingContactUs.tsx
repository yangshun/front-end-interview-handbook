'use client';

import clsx from 'clsx';
import React from 'react';

import gtag from '~/lib/gtag';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

import MarketingContactPlatformsConfig from './MarketingContactPlatformsConfig';

export default function MarketingContactUs() {
  return (
    <Container variant="narrow">
      <div
        className={clsx(
          'p-8 px-4 md:p-16 lg:p-20',
          'rounded-2xl lg:rounded-[48px]',
          themeBackgroundEmphasized,
        )}>
        <div className="mx-auto grid max-w-3xl gap-y-8">
          <div className="grid gap-y-4">
            <Heading className="text-center" level="heading2">
              <FormattedMessage
                defaultMessage="Have questions, feedback or anything to say?"
                description="Title for contact us section"
                id="eyLjDz"
              />
            </Heading>
            <Text
              className="block text-center text-base md:text-xl"
              color="secondary">
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
            </Text>
          </div>
          <div className="flex items-center">
            <Divider className="grow" />
            <Text
              className="block px-4 text-center text-lg md:text-xl"
              color="secondary">
              <FormattedMessage
                defaultMessage="or"
                description="Alternative contact way"
                id="DAifYT"
              />
            </Text>
            <Divider className="grow" />
          </div>
          <Section>
            <div className={clsx('mx-auto inline-flex gap-x-6')}>
              {MarketingContactPlatformsConfig().map((platform) => (
                <Anchor
                  key={platform.key}
                  href={platform.href}
                  variant="secondary"
                  onClick={() => {
                    gtag.event({
                      action: `contact_us.${platform.key}.click`,
                      category: 'engagement',
                      label: platform.name,
                    });
                    logEvent('click', {
                      element: 'Social link',
                      label: platform.name,
                      namespace: 'marketing',
                    });
                  }}>
                  <platform.icon className="size-8" />
                  <span className="sr-only">{platform.name}</span>
                </Anchor>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </Container>
  );
}
