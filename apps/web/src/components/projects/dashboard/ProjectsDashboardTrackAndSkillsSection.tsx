'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import GradientProgressBar from '~/components/ui/GradientProgressBar/GradientProgressBar';
import Heading from '~/components/ui/Heading';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
  themeGradientGreenYellow,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';

import ProjectsChallengeProgressTag from '../challenges/metadata/ProjectsChallengeProgressTag';

const trackGradient = themeGradientGreenYellow;

const limit = 2;

export default function ProjectsDashboardTrackAndSkillsSection() {
  const intl = useIntl();

  const { data: tracks, isLoading } =
    trpc.projects.sessions.tracksWithMostProgress.useQuery({ limit });

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Continue tracks and skills"
          description="Title for Continue tracks and skills section on Projects dashboard page"
          id="JIWdeN"
        />
      </Heading>
      <ul
        className={clsx(
          'rounded-lg',
          ['divide-y', themeDivideColor],
          ['border', themeBorderColor],
        )}>
        {tracks?.map((track, index) => (
          <li
            key={track.metadata._id}
            className={clsx(
              'relative isolate',
              'group flex',
              'py-4 pl-5 pr-8',
              themeBackgroundCardWhiteOnLightColor,
              themeBackgroundEmphasized_Hover,
              'transition-colors',
              index === 0 && 'rounded-t-lg',
              index === tracks.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex w-full flex-row items-center gap-6">
              <GradientProgressBar
                className="size-20"
                gradient={trackGradient}
                progressPercentage={track.percentageCompleted}>
                <div className="flex flex-col items-center px-3">
                  <Text
                    className={clsx(
                      'bg-clip-text text-transparent',
                      trackGradient.className,
                    )}
                    color="inherit"
                    size="body3">
                    <FormattedMessage
                      defaultMessage="<bold>{count}</bold>"
                      description="Number of incomplete challenges in projects dashboard"
                      id="OjLxYa"
                      values={{
                        bold: (chunks) => (
                          <Text
                            className="font-bold"
                            color="inherit"
                            size="body1"
                            weight="inherit">
                            {chunks}
                          </Text>
                        ),
                        count:
                          track.numChallenges - track.numChallengesCompleted,
                      }}
                    />
                  </Text>
                  <Text
                    className={clsx(
                      'bg-clip-text text-center text-transparent',
                      'text-3xs',
                      trackGradient.className,
                    )}
                    color="inherit">
                    <FormattedMessage
                      defaultMessage="more challenges"
                      description="Progress percentage label in Continue Learning section in preparation dashboard"
                      id="DJMUGB"
                    />
                  </Text>
                </div>
              </GradientProgressBar>
              <div className="flex w-full flex-row items-center gap-2">
                <div className="flex w-full flex-col gap-1">
                  <Anchor
                    className={textVariants({
                      className: 'z-[1] self-start',
                      size: 'body1',
                      weight: 'medium',
                    })}
                    href={track.metadata.href}
                    variant="flat">
                    {intl.formatMessage(
                      {
                        defaultMessage: '{trackName} Track',
                        description:
                          'Title for track in Continue tracks and skills section on Projects dashboard page',
                        id: 'S4nrpS',
                      },
                      {
                        trackName: track.info.title,
                      },
                    )}
                  </Anchor>
                  <ProjectsChallengeProgressTag
                    completed={track.numChallengesCompleted}
                    showProgress={false}
                    total={track.numChallenges}
                  />
                </div>
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
            <Anchor
              aria-label={track.info.title}
              className="absolute inset-0"
              href={track.metadata.href}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
