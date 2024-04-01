'use client';

import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiFlashlightLine,
  RiRocketLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import GradientProgressBar from '~/components/ui/GradientProgressBar/GradientProgressBar';
import Heading from '~/components/ui/Heading';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
  themeGradientPinkPurple,
  themeIconColor,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';

const trackGradient = themeGradientPinkPurple;

const limit = 2;

export default function ProjectsDashboardTrackAndSkillsSection() {
  const intl = useIntl();

  const { isLoading, data: tracks } =
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
                        trackName: track.metadata.title,
                      },
                    )}
                  </Anchor>
                  <div className="flex flex-row gap-2 sm:gap-4 md:gap-6">
                    <div className="flex flex-row items-center gap-1.5">
                      <RiFlashlightLine className={clsx(themeIconColor)} />
                      <Text color="success" size="body3">
                        {intl.formatMessage(
                          {
                            defaultMessage: '{difficulty}',
                            description:
                              'Difficulty for track in Continue tracks and skills section on Projects dashboard page',
                            id: 'w5+zQe',
                          },
                          {
                            difficulty: 'Starter', // TODO(projects): get difficulty
                          },
                        )}
                      </Text>
                    </div>
                    <div className="flex flex-row items-center gap-1.5">
                      <RiRocketLine className={clsx(themeIconColor)} />
                      <Text color="secondary" size="body3">
                        <FormattedMessage
                          defaultMessage="<bold>{completed}</bold>/{totalCount} challenges"
                          description="Line describing the number of questions completed by user over the total number of questions"
                          id="q4Qfra"
                          values={{
                            bold: (chunks) => (
                              <Text size="body2">{chunks}</Text>
                            ),
                            completed: track.numChallengesCompleted,
                            totalCount: track.numChallenges,
                          }}
                        />
                      </Text>
                    </div>
                  </div>
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
              aria-label={track.metadata.title}
              className="absolute inset-0"
              href={track.metadata.href}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
