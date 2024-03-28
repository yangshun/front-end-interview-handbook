'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';
import Anchor from '~/components/ui/Anchor';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';

import ProjectsTrackPageHeader from './ProjectsTrackPageHeader';
import ProjectsChallengeDifficultyTag from '../challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsChallengeStatusChip from '../challenges/metadata/ProjectsChallengeStatusChip';
import { projectsChallengeCountCompletedIncludingHistorical } from '../challenges/utils/ProjectsChallengeUtils';
import ProjectsPremiumBadge from '../common/ProjectsPremiumBadge';

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
  const { data: challengeProgressHistorical } =
    trpc.projects.challenges.historicalProgress.useQuery(
      { trackSlug: metadata.slug, userId: userId! },
      {
        enabled: userId != null,
      },
    );

  const completionCount = projectsChallengeCountCompletedIncludingHistorical(
    challengeProgressHistorical ?? {},
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
          <div key={challenge.metadata.slug} className="flex w-full gap-4">
            <div
              className={clsx(
                'relative flex flex-col justify-center self-stretch',
              )}>
              <ProjectsChallengeStatusChip
                label={index + 1}
                status={challenge.status ?? 'NOT_STARTED'}
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
                'relative isolate',
                'group flex grow items-center gap-6',
                'rounded-lg',
                // 'overflow-hidden',
                themeBackgroundCardColor,
                ['border', themeBorderColor],
                'pe-6',
                themeOutlineElement_FocusVisible,
                themeOutlineElementBrandColor_FocusVisible,
              )}>
              <img
                alt={challenge.metadata.title}
                className={clsx(
                  'h-full w-[104px] md:w-[130px]',
                  'object-cover',
                  'rounded-s-lg',
                )}
                src={challenge.metadata.imageUrl}
              />
              <div className="flex grow flex-col items-start gap-4 py-4">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex gap-2.5">
                    <Anchor
                      className={textVariants({
                        className: 'z-[1]',
                        size: 'body1',
                        weight: 'medium',
                      })}
                      href={challenge.metadata.href}
                      variant="flat">
                      <Text size="body1" weight="medium">
                        {challenge.metadata.title}
                      </Text>
                    </Anchor>
                    {challenge.metadata.access === 'premium' && (
                      <span>
                        <ProjectsPremiumBadge
                          size="sm"
                          unlocked={challenge.userUnlocked}
                        />
                      </span>
                    )}
                  </div>
                  <Text
                    className="hidden lg:block"
                    color="secondary"
                    size="body3">
                    {challenge.metadata.description}
                  </Text>
                </div>
                <div className="z-[1]">
                  <ProjectsChallengeDifficultyTag
                    difficulty={challenge.metadata.difficulty}
                    variant="inline"
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
              <Anchor
                aria-label={challenge.metadata.title}
                className="absolute inset-0"
                href={challenge.metadata.href}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
