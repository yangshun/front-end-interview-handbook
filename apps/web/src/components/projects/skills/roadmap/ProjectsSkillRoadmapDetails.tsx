'use client';

import type { ProjectsSkillMetadata } from 'contentlayer/generated';
import { useIntl } from 'react-intl';

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
import ProjectsChallengesCompletedTag from '../../challenges/metadata/ProjectsChallengesCompletedTag';

type Props = Readonly<{
  skillMetadata: ProjectsSkillMetadata;
  viewerId?: string;
}>;

export default function ProjectsSkillRoadmapDetails({
  skillMetadata,
  viewerId,
}: Props) {
  const intl = useIntl();
  const challengesQuery = trpc.projects.challenges.listForSkills.useQuery({
    locale: 'en-US',
    skillSlug: skillMetadata.slug,
  });
  const countSubmissionsUsingSkills =
    trpc.projects.challenges.countUniqueUsingSkill.useQuery(
      {
        skill: skillMetadata.slug,
      },
      {
        enabled: viewerId != null,
      },
    );

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
    <div className="flex flex-col gap-y-8 pb-8">
      <div className="flex flex-col gap-y-4">
        <Heading level="heading6" tag="h1">
          {skillMetadata.title}
        </Heading>
        <div className="flex flex-wrap gap-x-6">
          {/* TODO(projects): fetch actual rep */}
          <ProjectsChallengeReputationTag
            points={1200}
            tooltip={intl.formatMessage({
              defaultMessage:
                'Reputation you have gained from completing challenges using this skill, including challenges not in the recommended skill plan',
              description: 'Tooltip for reputation label',
              id: 'sU6jXI',
            })}
          />
          {countSubmissionsUsingSkills.data && (
            <ProjectsChallengesCompletedTag
              count={countSubmissionsUsingSkills.data}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Number of challenges completed using this skill, including challenges not in the recommended skill plan',
                description: 'Tooltip for completed challenges label',
                id: '4KjsB6',
              })}
            />
          )}
          {challengesQuery.data?.challenges != null &&
            completedChallenges != null && (
              <ProjectsChallengeProgressTag
                completed={completedChallenges}
                showProgress={false}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Number of challenges in the recommended skill plan of this skill',
                  description: 'Tooltip for skill plan challenges label',
                  id: 'Q5Ta4B',
                })}
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
            {/* TODO(projects): Add in skill plan completion rep */}
            {totalRoadmapPoints != null && (
              <ProjectsChallengeReputationTag
                points={totalRoadmapPoints}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Reputation that can be gained from completing the entire skill plan',
                  description: 'Tooltip for reputation label',
                  id: 'vd036v',
                })}
              />
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