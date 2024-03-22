'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import ProjectsSkillRoadmapSection from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapSection';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';

import { useI18nRouter } from '~/next-i18nostic/src';

type Props = Readonly<{
  children: ReactNode;
}>;

export default function ProjectsSkillRoadmapPage({ children }: Props) {
  const router = useI18nRouter();
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex flex-col gap-9">
      <div className="flex max-w-prose flex-col gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Skills roadmap"
            description="Title of Projects skill roadmap page"
            id="exLMBi"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Build your way up to a well-rounded front end / full stack skillset. Hone a specific skill, or follow our skills progression starting from zero."
              description="Description of Projects skill tree page"
              id="E9mfba"
            />
          </Text>
        </Section>
      </div>
      <Section>
        <ProjectsSkillRoadmapSection />
        <SlideOut
          enterFrom="end"
          isShown={segment != null}
          size="md"
          title="Lorem Ipsum"
          onClose={() => {
            router.push('/projects/skills', {
              scroll: false,
            });
          }}>
          {children}
        </SlideOut>
      </Section>
    </div>
  );
}
