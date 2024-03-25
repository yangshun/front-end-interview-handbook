'use client';

import type { ProjectsSkillMetadata } from 'contentlayer/generated';

import ProjectsChallengeMdxContent from '~/components/projects/common/ProjectsChallengeMdxContent';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import ProjectsChallengeReputationTag from '../../challenges/metadata/ProjectsChallengeReputationTag';

type Props = Readonly<{
  skillMetadata: ProjectsSkillMetadata;
}>;

export default function ProjectsSkillRoadmapDetails({ skillMetadata }: Props) {
  return (
    <div className="flex flex-col gap-y-8 pb-12">
      <div className="flex flex-col gap-y-4">
        <Heading level="heading6" tag="h1">
          {skillMetadata.title}
        </Heading>
        <div className="flex flex-wrap gap-x-6">
          <ProjectsChallengeReputationTag points={1200} />
          <ProjectsChallengeReputationTag points={1200} />
        </div>
        <Text className="block" color="secondary" size="body3">
          {skillMetadata.description}
        </Text>
      </div>
      <Section level={2}>
        <Divider />
        <Prose textSize="sm">
          <ProjectsChallengeMdxContent mdxCode={skillMetadata.body.code} />
        </Prose>
        <Divider />
        <div className="flex flex-col gap-y-4">
          <Heading level="heading6">Skill plan</Heading>
          <Text className="block" color="secondary" size="body3">
            Recommended projects to do to advance this skill progressively.
          </Text>
          <div className="flex flex-wrap gap-x-6">
            <ProjectsChallengeReputationTag points={1200} />
            <ProjectsChallengeReputationTag points={1200} />
          </div>
        </div>
      </Section>
    </div>
  );
}
