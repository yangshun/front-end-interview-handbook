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

const limit = 3;

export default function ProjectsContinueProjectsSection() {
  const intl = useIntl();
  const { data: recentProjects } =
    trpc.projects.sessions.getMostRecentlyStarted.useQuery({ limit });

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
        {recentProjects?.map((project, index) => (
          <li
            key={project.id}
            className={clsx(
              'group relative flex py-4 px-5',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              'bg-white dark:bg-neutral-800/40',
              'transition-colors',
              themeBackgroundEmphasizedHover,
              index === 0 && 'rounded-t-lg',
              index === recentProjects.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex flex-row gap-4 items-center">
              <img
                alt={project.title}
                className="object-cover rounded w-1/4"
                src={project.imageUrl}
              />
              <div className="flex flex-col gap-1 w-full">
                <Text size="body1" weight="medium">
                  <Anchor
                    className="focus:outline-none"
                    href={`${project.href}`}
                    variant="unstyled">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {project.title}
                  </Anchor>
                </Text>
                <div className="flex flex-row gap-6">
                  <div className="flex flex-row gap-1.5 items-center">
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
                            project.createdAt,
                          ),
                        },
                      )}
                    </Text>
                  </div>
                  <div className="flex flex-row gap-1.5 items-center">
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
                          points: project.points,
                        },
                      )}
                    </Text>
                  </div>
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
