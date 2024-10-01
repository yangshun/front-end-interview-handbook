'use client';

import clsx from 'clsx';
import { RiRocketLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/datetime/Timestamp';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';
import Heading from '~/components/ui/Heading';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';

export default function ProjectsSettingsActivityPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Challenges activity"
            description="Title for challenge activity page"
            id="tBeimS"
          />
        </Heading>
        <Text className="block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Challenges you have started before or completed will appear here."
            description="Subtitle for challenge activity page"
            id="T9XIQX"
          />
        </Text>
      </div>
      <ProjectsSettingsActivitySection />
    </div>
  );
}

function ProjectsSettingsActivitySection() {
  const intl = useIntl();
  const { data: sessions, isLoading } = trpc.projects.sessions.list.useQuery({
    orderBy: 'desc',
  });

  if (isLoading) {
    return (
      <div className="py-20">
        <Spinner display="block" />
      </div>
    );
  }

  if (sessions?.length === 0) {
    return (
      <EmptyState
        icon={({ className, ...props }) => (
          <RiRocketLine
            className={clsx('-translate-y-0.5 rotate-45', className)}
            {...props}
          />
        )}
        subtitle={
          <FormattedMessage
            defaultMessage="Start your first <link>project</link>."
            description="Label to start a project"
            id="Kp+YJx"
            values={{
              link: (chunks) => (
                <Anchor href="/projects/challenges">{chunks}</Anchor>
              ),
            }}
          />
        }
        title={intl.formatMessage({
          defaultMessage: 'No challenges started yet',
          description: 'Title of empty state on projects activity page',
          id: 'ojo22x',
        })}
      />
    );
  }

  return (
    <ul
      className={clsx(
        'relative rounded-md',
        ['border', themeBorderColor],
        ['divide-y', themeDivideColor],
      )}
      role="list">
      {sessions?.map((session) => (
        <li
          key={session.createdAt.toDateString()}
          className={clsx(
            'relative px-4 py-3',
            themeBackgroundCardWhiteOnLightColor,
            themeBackgroundEmphasized_Hover,
            'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
            'overflow-hidden',
          )}>
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex w-3/4 flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-3">
              <Text className="block" size="body2" weight="medium">
                <Anchor
                  href={session.challenge?.metadata.href}
                  variant="unstyled">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {session.challenge?.info.title}
                </Anchor>
              </Text>
            </div>
            <Text
              className="block whitespace-nowrap"
              color="secondary"
              size="body3">
              {session.status === 'IN_PROGRESS' && (
                <span>
                  <Text color="warning" weight="medium">
                    In progress
                  </Text>{' '}
                  &middot; Started at <Timestamp date={session.createdAt} />
                </span>
              )}
              {session.status === 'COMPLETED' &&
                (session.stoppedAt ? (
                  <span>
                    <Text color="success" weight="medium">
                      Completed
                    </Text>{' '}
                    &middot; Completed at <Timestamp date={session.stoppedAt} />
                  </span>
                ) : (
                  <span className={themeTextSuccessColor}>Completed</span>
                ))}
              {session.status === 'STOPPED' &&
                (session.stoppedAt ? (
                  <span>
                    <Text color="error" weight="medium">
                      Stopped
                    </Text>{' '}
                    &middot; Stopped at <Timestamp date={session.stoppedAt} />
                  </span>
                ) : (
                  <span>Stopped</span>
                ))}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
}
