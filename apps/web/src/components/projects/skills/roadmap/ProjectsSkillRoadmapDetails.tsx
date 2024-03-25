'use client';

import type { ProjectsSkillMetadata } from 'contentlayer/generated';

import ProjectsChallengeMdxContent from '~/components/projects/common/ProjectsChallengeMdxContent';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import ProjectsChallengeList from '../../challenges/lists/ProjectsChallengeList';
import ProjectsChallengeReputationTag from '../../challenges/metadata/ProjectsChallengeReputationTag';
import type { ProjectsChallengeItem } from '../../challenges/types';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  skillMetadata: ProjectsSkillMetadata;
}>;

export default function ProjectsSkillRoadmapDetails({
  challenges,
  skillMetadata,
}: Props) {
  const totalRoadmapPoints = challenges.reduce(
    (acc, item) => item.metadata.points + acc,
    0,
  );

  return (
    <div className="flex flex-col gap-y-8 pb-12">
      <div className="flex flex-col gap-y-4">
        <Heading level="heading6" tag="h1">
          {skillMetadata.title}
        </Heading>
        <div className="flex flex-wrap gap-x-6">
          <ProjectsChallengeReputationTag points={1200} />
        </div>
        <Text className="block" color="secondary" size="body3">
          {skillMetadata.description}
        </Text>
      </div>
      <Section level={2}>
        <Divider color="emphasized" />
        <Prose textSize="sm">
          <ProjectsChallengeMdxContent mdxCode={skillMetadata.body.code} />
        </Prose>
        <Divider color="emphasized" />
        <div className="flex flex-col gap-y-4">
          <Heading level="heading6">Skill plan</Heading>
          <Text className="block" color="secondary" size="body3">
            Recommended projects to do to advance this skill progressively.
          </Text>
          <div className="flex flex-wrap gap-x-6">
            <ProjectsChallengeReputationTag points={totalRoadmapPoints} />
          </div>
          <ProjectsChallengeList challenges={challenges} />
        </div>
      </Section>
    </div>
  );
}
