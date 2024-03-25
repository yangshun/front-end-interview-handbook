'use client';

import type { ProjectsSkillMetadata } from 'contentlayer/generated';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeMdxContent from '~/components/projects/common/ProjectsChallengeMdxContent';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import ProjectsChallengeList from '../../challenges/lists/ProjectsChallengeList';
import ProjectsChallengeProgressTag from '../../challenges/metadata/ProjectsChallengeProgressTag';
import ProjectsChallengeReputationTag from '../../challenges/metadata/ProjectsChallengeReputationTag';

type Props = Readonly<{
  skillMetadata: ProjectsSkillMetadata;
}>;

export default function ProjectsSkillRoadmapDetails({ skillMetadata }: Props) {
  const challengesQuery = trpc.projects.challenges.listForSkills.useQuery({
    locale: 'en-US',
    skillSlug: skillMetadata.slug,
  });

  const [totalRoadmapPoints, completedChallenges] =
    challengesQuery.data != null
      ? [
          challengesQuery.data.challenges.reduce(
            (acc, item) => item.metadata.points + acc,
            0,
          ),
          challengesQuery.data.challenges.reduce(
            (acc, item) => Number(item.status === 'COMPLETED') + acc,
            0,
          ),
        ]
      : [null, null];

  return (
    <div className="flex flex-col gap-y-8 pb-12">
      <div className="flex flex-col gap-y-4">
        <Heading level="heading6" tag="h1">
          {skillMetadata.title}
        </Heading>
        <div className="flex flex-wrap gap-x-6">
          <ProjectsChallengeReputationTag points={1200} />
          {challengesQuery.data?.challenges != null &&
            completedChallenges != null && (
              <ProjectsChallengeProgressTag
                completed={completedChallenges}
                showProgress={false}
                total={challengesQuery.data.challenges.length}
                variant="skills-roadmap"
              />
            )}
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
            {totalRoadmapPoints != null && (
              <ProjectsChallengeReputationTag points={totalRoadmapPoints} />
            )}
            {challengesQuery.data?.challenges != null &&
              completedChallenges != null && (
                <ProjectsChallengeProgressTag
                  completed={completedChallenges}
                  total={challengesQuery.data.challenges.length}
                />
              )}
          </div>
          {challengesQuery.data?.challenges == null ? (
            <Spinner display="block" size="md" />
          ) : (
            <ProjectsChallengeList
              challenges={challengesQuery.data.challenges}
            />
          )}
        </div>
      </Section>
    </div>
  );
}
