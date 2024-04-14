'use client';

import type {
  ProjectsSkillInfo,
  ProjectsSkillMetadata,
} from 'contentlayer/generated';
import { sumBy } from 'lodash-es';
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
  skillInfo: ProjectsSkillInfo;
  skillMetadata: ProjectsSkillMetadata;
  viewerId?: string;
}>;

export default function ProjectsSkillRoadmapItemDetails({
  skillInfo,
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
  const { data: skillPlanProgressData } =
    trpc.projects.challenges.skillPlanProgress.useQuery(
      { skillSlug: skillMetadata.slug, userId: viewerId! },
      {
        enabled: viewerId != null,
      },
    );

  const [totalRoadmapPoints, completedChallenges] =
    challengesQuery.data != null
      ? [
          sumBy(
            challengesQuery.data.challenges,
            (item) => item.metadata.points,
          ),
          sumBy(challengesQuery.data.challenges, (item) =>
            Number(item.status === 'COMPLETED'),
          ),
        ]
      : [null, null];

  return (
    <div className="flex flex-col gap-y-8 pb-8">
      <div className="flex flex-col gap-y-4">
        <Heading level="heading6" tag="h1">
          {skillInfo.title}
        </Heading>
        <div className="flex flex-wrap gap-x-6">
          {(skillPlanProgressData?.points ?? 0) > 0 && (
            <ProjectsChallengeReputationTag
              labelVariant="gained-skill"
              points={skillPlanProgressData?.points ?? 0}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Reputation you have gained from completing challenges using this skill, including challenges not in the recommended skill plan',
                description: 'Tooltip for reputation label',
                id: 'sU6jXI',
              })}
            />
          )}
          {countSubmissionsUsingSkills?.data != null &&
            countSubmissionsUsingSkills?.data > 0 && (
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
        </div>
        <Text className="block" color="secondary" size="body3">
          {skillInfo.description}
        </Text>
      </div>
      <Section level={2}>
        <Divider color="emphasized" />
        <Prose textSize="sm">
          <ProjectsChallengeMdxContent mdxCode={skillInfo.body.code} />
        </Prose>
        <Divider color="emphasized" />
        <div className="flex flex-col gap-y-4">
          <Heading level="heading6">Skill plan</Heading>
          <Text className="block" color="secondary" size="body3">
            Recommended projects to do to advance this skill progressively.
          </Text>
          <div className="flex flex-wrap gap-x-6">
            {totalRoadmapPoints != null && (
              <ProjectsChallengeReputationTag
                points={totalRoadmapPoints}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Reputation that can be gained from completing all challenges in the recommended skill plan of this skill',
                  description: 'Tooltip for reputation label',
                  id: 'IIctLn',
                })}
              />
            )}
            {challengesQuery.data?.challenges != null &&
              completedChallenges != null && (
                <ProjectsChallengeProgressTag
                  completed={completedChallenges}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Number of challenges completed in skill plan',
                    description: 'Tooltip for skill plan challenges label',
                    id: 'SlcOi4',
                  })}
                  total={challengesQuery.data.challenges.length}
                />
              )}
          </div>
          {challengesQuery.data?.challenges == null ? (
            <Spinner display="block" size="md" />
          ) : (
            <ProjectsChallengeList
              challengeStatuses={skillPlanProgressData?.challengeStatuses}
              challenges={challengesQuery.data.challenges}
            />
          )}
        </div>
      </Section>
    </div>
  );
}
