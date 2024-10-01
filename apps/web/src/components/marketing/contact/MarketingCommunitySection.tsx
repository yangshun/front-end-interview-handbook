'use client';

import gtag from '~/lib/gtag';

import { SocialLinks } from '~/data/SocialLinks';

import MetricCard from '~/components/common/MetricCard';
import { useIntl } from '~/components/intl';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Anchor from '~/components/ui/Anchor';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import logEvent from '~/logging/logEvent';

export default function MarketingCommunitySection() {
  const intl = useIntl();

  return (
    <Container variant="5xl">
      <Heading className="sr-only" level="custom">
        {/* TODO: i18n */}
        Community
      </Heading>
      <Section>
        <MarketingSectionHeader
          description={intl.formatMessage({
            defaultMessage:
              'Be part of our large community of passionate Front End Engineers across the world',
            description: 'Description of community page',
            id: 'CUTtb7',
          })}
          heading={intl.formatMessage({
            defaultMessage: 'Join the community',
            description: 'Title of community page',
            id: 'TO74hd',
          })}
          title="Community"
        />
        <div className="mt-12">
          <CardContainer className="grid grid-cols-2 gap-4 lg:gap-6 xl:grid-cols-4">
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
