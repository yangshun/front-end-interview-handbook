'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderColor,
  themeBorderElementColor,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';

import ProjectsTrackChallengeStatusChip from './ProjectsTrackChallengeStatusChip';
import ProjectsTrackPageHeader from './ProjectsTrackPageHeader';
import {
  projectsTrackCountCompleted,
  projectsTrackDetermineChallengeStatus,
} from './ProjectsTrackUtils';
import ProjectsChallengeDifficultyTag from '../challenges/metadata/ProjectsChallengeDifficultyTag';

type Props = Readonly<{
  isViewerPremium: boolean;
  track: ProjectsTrackItem;
  userId: string | null;
}>;

export default function ProjectsTrackDetailsPage({
  isViewerPremium,
  track,
  userId,
}: Props) {
  const { challenges, points, metadata } = track;
  const { data: challengeStatuses } =
    trpc.projects.challenges.progress.useQuery(
      { trackSlug: metadata.slug, userId: userId! },
      {
        enabled: userId != null,
      },
    );

  const completionCount = projectsTrackCountCompleted(
    challengeStatuses ?? {},
    challenges,
  );

  return (
    <div className="flex flex-col gap-12">
      <ProjectsTrackPageHeader
        completedCount={completionCount}
        isViewerPremium={isViewerPremium}
        metadata={metadata}
        points={points}
        showProgress={true}
        totalCount={challenges.length}
      />
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
                    <Text size="body1" weight="medium">
                      {challenge.title}
                    </Text>
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
