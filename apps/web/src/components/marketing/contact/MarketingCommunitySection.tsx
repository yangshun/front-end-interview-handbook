'use client';

import clsx from 'clsx';

import gtag from '~/lib/gtag';

import { SocialLinks } from '~/data/SocialLinks';

import MetricCard from '~/components/common/MetricCard';
import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

export default function MarketingCommunitySection() {
  return (
    <Container
      className={clsx(
        'flex flex-col items-center justify-center gap-[64px] self-stretch py-20 md:items-start',
      )}>
      <div>
        <Heading
          className={clsx(
            themeGradientHeading,
            'max-w-lg pb-1 xl:max-w-3xl',
            '!text-balance',
          )}
          level="heading2"
          weight="medium">
          <FormattedMessage
            defaultMessage="Join the community"
            description="Title for marketing page section"
            id="IHwyWr"
          />
        </Heading>
        <Text
          className={clsx(
            'w-full',
            'mt-6',
            'block',
            'text-base lg:text-lg',
            'lg:font-medium',
            'w-full',
          )}
          color="secondary"
          size="inherit"
          weight="inherit">
          <FormattedMessage
            defaultMessage="Be part of our large community of passionate Front End Engineers across the world."
            description="Marketing page section subtitle"
            id="IWhajc"
          />
        </Text>
      </div>

      <Section>
        <div className="w-full">
          <CardContainer className="grid w-full grid-cols-2 gap-4 md:grid-cols-4  lg:gap-6">
            {[
              SocialLinks.linkedin,
              SocialLinks.discord,
              SocialLinks.github,
              SocialLinks.x,
            ].map((platform) => (
              <Anchor
                key={platform.key}
                aria-label={platform.name}
                href={platform.href}
                variant="unstyled"
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
                <MetricCard
                  count={platform.userCount ?? 0}
                  icon={platform.icon}
                  label={platform.name}
                />
              </Anchor>
            ))}
          </CardContainer>
        </div>
      </Section>
    </Container>
  );
}
