'use client';

import type { ProjectsSkillMetadata } from 'contentlayer/generated';

import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import ProjectsSkillRoadmapItemPaywall from './ProjectsSkillRoadmapItemPaywall';

type Props = Readonly<{
  skillMetadata: ProjectsSkillMetadata;
}>;

export default function ProjectsSkillRoadmapItemLockedPage({
  skillMetadata,
}: Props) {
  return (
    <div className="flex flex-col gap-y-8 pb-8">
      <div className="flex flex-col gap-y-4">
        <Heading level="heading6" tag="h1">
          {skillMetadata.title}
        </Heading>
        <Text className="block" color="secondary" size="body3">
          {skillMetadata.description}
        </Text>
      </div>
      <Section level={2}>
        <Divider color="emphasized" />
        <ProjectsSkillRoadmapItemPaywall />
      </Section>
    </div>
  );
}
