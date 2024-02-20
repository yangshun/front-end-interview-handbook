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
import Text from '~/components/ui/Text';
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
          'isolate rounded-lg',
          ['divide-y', themeDivideColor],
          ['border', themeBorderColor],
        )}>
        {tracks?.map((track, index) => (
          <li
            key={track.metadata._id}
            className={clsx(
              'group relative flex py-4 pl-5 pr-8',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              themeBackgroundCardWhiteOnLightColor,
              'transition-colors',
              themeBackgroundEmphasized_Hover,
              index === 0 && 'rounded-t-lg',
              index === tracks.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex w-full flex-row items-center gap-2">
              <div className="flex items-center px-4 lg:px-8">
                <GradientProgressBar
                  className="size-20"
                  gradient={trackGradient}
                  progressPercentage={track.percentageCompleted}
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <Text size="body1" weight="medium">
                  <Anchor href={track.metadata.href} variant="unstyled">
                    <span aria-hidden="true" className="absolute inset-0" />
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
                </Text>
                <div className="flex flex-row gap-6">
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
                          difficulty: 'Starter', // TODO: get difficulty
                        },
                      )}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center gap-1.5">
                    <RiRocketLine className={clsx(themeIconColor)} />
                    <div className="flex flex-row items-center">
                      <Text size="body1">
                        {intl.formatMessage(
                          {
                            defaultMessage: '{challengesCompleted}',
                            description:
                              'Challenges completed for track in Continue tracks and skills section on Projects dashboard page',
                            id: 'G2qoEJ',
                          },
                          {
                            challengesCompleted: track.numChallengesCompleted,
                          },
                        )}
                      </Text>
                      <Text color="secondary" size="body3">
                        {intl.formatMessage(
                          {
                            defaultMessage: '/{totalChallenges} recommended',
                            description:
                              'Total challenges recommended for track in Continue tracks and skills section on Projects dashboard page',
                            id: 'yyJnKs',
                          },
                          {
                            totalChallenges: track.numChallenges,
                          },
                        )}
                      </Text>
                    </div>
                  </div>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
