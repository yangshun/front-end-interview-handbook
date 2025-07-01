'use client';

import clsx from 'clsx';
import { RiArrowRightLine, RiTimeLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Img from '~/components/ui/Img';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
  themeIconColor,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';

import ProjectsChallengeReputationTag from '../challenges/metadata/ProjectsChallengeReputationTag';

function getDaysSinceStartedProject(createdAt: Date) {
  return Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
}

const limit = 2;

export default function ProjectsDashboardContinueProjectsSection() {
  const intl = useIntl();
  const { data: recentSessions, isLoading } =
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
          'rounded-lg',
          ['divide-y', themeDivideColor],
          ['border', themeBorderColor],
        )}>
        {recentSessions?.map((session, index) => (
          <li
            key={session.id}
            className={clsx(
              'relative isolate',
              'group flex',
              'py-4 pl-5 pr-8',
              themeBackgroundCardWhiteOnLightColor,
              themeBackgroundEmphasized_Hover,
              'transition-colors',
              index === 0 && 'rounded-t-lg',
              index === recentSessions.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex w-full items-center gap-4">
              <Img
                alt={session.challenge.info.title}
                className="h-[70px] w-[90px] rounded object-cover"
                decoding="async"
                loading="lazy"
                src={session.challenge.metadata.coverImage}
              />
              <div className="flex grow flex-col gap-1">
                <Anchor
                  className={textVariants({
                    className: 'z-[1] self-start',
                    size: 'body1',
                    weight: 'medium',
                  })}
                  href={session.challenge.metadata.href}
                  variant="flat">
                  {session.challenge.info.title}
                </Anchor>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <ProjectsChallengeReputationTag
                    points={session.challenge.metadata.points}
                  />
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
            <Anchor
              aria-label={session.challenge.info.title}
              className="absolute inset-0"
              href={session.challenge.metadata.href}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
