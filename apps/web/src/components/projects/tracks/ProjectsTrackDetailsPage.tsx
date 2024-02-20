'use client';

import clsx from 'clsx';
import { RiArrowLeftLine, RiArrowRightLine, RiLock2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsTrackProgressTag from '~/components/projects/tracks/ProjectsTrackProgressTag';
import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderColor,
  themeBorderElementColor,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';

import ProjectsTrackChallengeStatusChip from './ProjectsTrackChallengeStatusChip';
import {
  projectsTrackCountCompleted,
  projectsTrackDetermineChallengeStatus,
} from './ProjectsTrackUtils';
import ProjectsChallengeDifficultyTag from '../challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsChallengeStatusBadgeCompleted from '../challenges/status/ProjectsChallengeStatusBadgeCompleted';

type Props = Readonly<{
  track: ProjectsTrackItem;
  userId: string | null;
}>;

export default function ProjectsTrackDetailsPage({ track, userId }: Props) {
  const { challenges, points, metadata } = track;
  const { data: challengeStatuses } =
    trpc.projects.challenges.progress.useQuery(
      { trackSlug: track.metadata.slug, userId: userId! },
      {
        enabled: userId != null,
      },
    );

  const { title, description } = metadata;
  const completionCount = projectsTrackCountCompleted(
    challengeStatuses ?? {},
    challenges,
  );
  const completedTrack = completionCount === challenges.length;

  const intl = useIntl();

  return (
    <div className="flex flex-col">
      <Button
        addonPosition="start"
        className="-ms-4 -mt-2 self-start"
        href="/projects/tracks"
        icon={RiArrowLeftLine}
        label={intl.formatMessage({
          defaultMessage: 'Back to all tracks',
          description: 'Button label to go back to all projects tracks',
          id: 'zpsjf3',
        })}
        variant="tertiary"
      />
      <div className="mb-12 mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="bg-red size-16 rounded-lg" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading level="heading5">{title}</Heading>
              {metadata.premium && (
                <Badge
                  icon={RiLock2Line}
                  label={intl.formatMessage({
                    defaultMessage: 'Premium',
                    description:
                      'Label on Premium badge to indicate premium-only access',
                    id: 'aWL34G',
                  })}
                  size="sm"
                  variant="special"
                />
              )}
              {completedTrack && <ProjectsChallengeStatusBadgeCompleted />}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <ProjectsChallengeReputationTag points={points} variant="flat" />
              <ProjectsTrackProgressTag
                completed={completionCount}
                total={challenges.length}
              />
            </div>
          </div>
        </div>
        <Text color="secondary" size="body2">
          {description}
        </Text>
      </div>
      <div className={clsx('relative flex flex-col gap-4')}>
        {challenges.map((challenge, index) => (
          <div key={challenge.slug} className="flex w-full gap-4">
            <div
              className={clsx(
                'relative flex flex-col justify-center self-stretch',
              )}>
              <ProjectsTrackChallengeStatusChip
                label={index + 1}
                status={projectsTrackDetermineChallengeStatus(
                  challengeStatuses ?? {},
                  challenge.slug,
                )}
              />
              {index < challenges.length - 1 && (
                <div
                  className={clsx(
                    'absolute top-1/2 -z-10 h-[90%] w-px translate-y-3 self-center border-l border-dashed',
                    themeBorderElementColor,
                  )}
                />
              )}
            </div>
            <div
              className={clsx(
                'group flex grow items-center gap-6 overflow-hidden',
                'rounded-lg',
                'relative',
                themeBackgroundCardColor,
                ['border', themeBorderColor],
                'pe-6',
              )}>
              <img
                alt={challenge.title}
                className={clsx(
                  'h-[100%] w-[104px] md:w-[130px]',
                  'object-cover',
                )}
                src={challenge.imageUrl}
              />
              <div className="flex grow flex-col items-start gap-4 py-4">
                <div className="flex flex-col items-start gap-2">
                  <Anchor href={challenge.href} variant="unstyled">
                    <span aria-hidden="true" className="absolute inset-0" />
                    <Text weight="medium">{challenge.title}</Text>
                  </Anchor>
                  <Text
                    className="hidden lg:block"
                    color="secondary"
                    size="body3">
                    {challenge.description}
                  </Text>
                </div>
                <div>
                  <ProjectsChallengeDifficultyTag
                    difficulty={challenge.difficulty}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <RiArrowRightLine
                  aria-hidden="true"
                  className={clsx(
                    'size-6 shrink-0',
                    themeTextFaintColor,
                    themeTextBrandColor_GroupHover,
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
