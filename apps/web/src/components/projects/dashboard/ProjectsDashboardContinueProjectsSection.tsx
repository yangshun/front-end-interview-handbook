'use client';

import clsx from 'clsx';
import { RiArrowRightLine, RiFireLine, RiTimeLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeBorderColor,
  themeDivideColor,
  themeIconColor,
  themeTextBrandGroupHoverColor,
  themeTextFaintColor,
} from '~/components/ui/theme';

function getDaysSinceStartedProject(createdAt: Date) {
  return Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
}

const limit = 2;

export default function ProjectsDashboardContinueProjectsSection() {
  const intl = useIntl();
  const { isLoading, data: recentSessions } =
    trpc.projects.sessions.getMostRecentlyStarted.useQuery({ limit });

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
              'group relative flex py-4 px-5',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              'bg-white dark:bg-neutral-800/40',
              'transition-colors',
              themeBackgroundEmphasizedHover,
              index === 0 && 'rounded-t-lg',
              index === recentSessions.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex gap-4 items-center">
              {session.challenge && (
                <img
                  alt={session.challenge.title}
                  className="object-cover rounded w-1/4"
                  src={session.challenge.imageUrl}
                />
              )}
              <div className="flex flex-col gap-1 w-full">
                {session.challenge && (
                  <Text size="body1" weight="medium">
                    <Anchor href={session.challenge.href} variant="unstyled">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {session.challenge.title}
                    </Anchor>
                  </Text>
                )}
                <div className="flex flex-wrap gap-y-2 gap-x-6">
                  <div className="flex gap-1.5 items-center">
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
                    <div className="flex gap-1.5 items-center">
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
                    'h-6 w-6 shrink-0',
                    themeTextFaintColor,
                    themeTextBrandGroupHoverColor,
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
