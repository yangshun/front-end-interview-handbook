'use client';

import { useMemo } from 'react';
import {
  RiCheckboxMultipleLine,
  RiDiscussLine,
  RiNodeTree,
} from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import ProjectsMarketingFeaturedIcon from './ProjectsMarketingFeaturedIcon';

type ProjectMarketingHeroFeature = {
  content: React.ReactNode;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
};

export default function ProjectsMarketingFeaturesRow() {
  const intl = useIntl();
  const heroFeatures: Array<ProjectMarketingHeroFeature> = useMemo(
    () => [
      {
        content: (
          <FormattedMessage
            defaultMessage="Build projects to learn any front end skill using our <link>Skills roadmap</link>"
            description="Caption for Projects marketing hero section skills roadmap feature"
            id="rUKlWg"
            values={{
              link: (chunks) => (
                <Anchor href="/projects/skills" prefetch={null}>
                  {chunks}
                </Anchor>
              ),
            }}
          />
        ),
        icon: RiNodeTree,
        key: 'skills',
      },
      {
        content: (
          <FormattedMessage
            defaultMessage="Every project is part of <link>reusable component libraries</link> for your future projects"
            description="Caption for Projects marketing hero section component libraries feature"
            id="ES78kz"
            values={{
              link: (chunks) => (
                <Anchor href="/projects/tracks" prefetch={null}>
                  {chunks}
                </Anchor>
              ),
            }}
          />
        ),
        icon: RiCheckboxMultipleLine,
        key: 'component-libraries',
      },
      {
        content: (
          <FormattedMessage
            defaultMessage="Guides & solutions from Sr. Engineers and code reviews from <link>community</link>"
            description="Caption for Projects marketing hero section community feature"
            id="4uyrtd"
            values={{
              link: (chunks) => (
                <Anchor href="/projects/submissions" prefetch={null}>
                  {chunks}
                </Anchor>
              ),
            }}
          />
        ),
        icon: RiDiscussLine,
        key: 'community',
      },
    ],
    [],
  );

  return (
    <Container className="py-24">
      <Heading className="sr-only" level="custom">
        {intl.formatMessage({
          defaultMessage: 'Features',
          description: 'Features label',
          id: 'VIU+CM',
        })}
      </Heading>
      <Section>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
          {heroFeatures.map(({ content, icon, key }) => (
            <div key={key} className="flex flex-col items-center gap-y-4">
              <ProjectsMarketingFeaturedIcon icon={icon} />
              <Text
                className="text-balance max-w-72 text-center"
                color="subtitle"
                size="body2">
                {content}
              </Text>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}
