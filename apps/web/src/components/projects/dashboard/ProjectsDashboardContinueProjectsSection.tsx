'use client';

import clsx from 'clsx';
import { RiArrowRightLine, RiFireLine, RiTimeLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
  themeIconColor,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';

function getDaysSinceStartedProject(createdAt: Date) {
  return Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
}

const limit = 2;

export default function ProjectsDashboardContinueProjectsSection() {
  const intl = useIntl();
  const { isLoading, data: recentSessions } =
    trpc.projects.sessions.listRecent.useQuery({ limit });

  if (isLoading || recentSessions?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Continue projects"
          description="Title for Continue projects section on Projects dashboard page"
          id="MgVI6L"
        />
      </Heading>
      <ul
        className={clsx(
          'isolate rounded-lg',
          ['divide-y', themeDivideColor],
          ['border', themeBorderColor],
        )}>
        {recentSessions?.map((session, index) => (
          <li
            key={session.id}
            className={clsx(
              'group relative flex py-4 pl-5 pr-8',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              themeBackgroundCardWhiteOnLightColor,
              'transition-colors',
              themeBackgroundEmphasized_Hover,
              index === 0 && 'rounded-t-lg',
              index === recentSessions.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex w-full items-center gap-4">
              {session.challenge && (
                <img
                  alt={session.challenge.title}
                  className="h-[70px] w-[90px] rounded object-cover"
                  src={session.challenge.imageUrl}
                />
              )}
              <div className="flex grow flex-col gap-1">
                {session.challenge && (
                  <Text size="body1" weight="medium">
                    <Anchor href={session.challenge.href} variant="unstyled">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {session.challenge.title}
                    </Anchor>
                  </Text>
                )}
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <div className="flex items-center gap-1.5">
                    <RiTimeLine className={clsx(themeIconColor)} />
                    <Text color="secondary" size="body3">
                      {intl.formatMessage(
                        {
                          defaultMessage: 'Started: {daysSinceStarted} days',
                          description:
                            'Days since started for Continue projects section on Projects dashboard page',
                          id: 'EflBca',
                        },
                        {
                          daysSinceStarted: getDaysSinceStartedProject(
                            session.createdAt,
                          ),
                        },
                      )}
                    </Text>
                  </div>
                  {session.challenge && (
                    <div className="flex items-center gap-1.5">
                      <RiFireLine className={clsx(themeIconColor)} />
                      <Text color="secondary" size="body3">
                        {intl.formatMessage(
                          {
                            defaultMessage: '+ {points} rep',
                            description:
                              'Points for Continue projects section on Projects dashboard page',
                            id: 'q8/ZEc',
                          },
                          {
                            points: session.challenge.points,
                          },
                        )}
                      </Text>
                    </div>
                  )}
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
