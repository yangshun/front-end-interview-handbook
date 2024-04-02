'use client';

import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/datetime/Timestamp';
import Anchor from '~/components/ui/Anchor';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

export default function ProjectsSettingsActivityPage() {
  const { data: sessions, isLoading } = trpc.projects.sessions.list.useQuery({
    orderBy: 'desc',
  });

  if (isLoading) {
    return <Spinner display="block" size="lg" />;
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
                  {session.challenge?.metadata.title}
                </Anchor>
              </Text>
            </div>
            <Text
              className="block whitespace-nowrap"
              color="secondary"
              size="body3">
              {session.status === 'IN_PROGRESS' && (
                <span>
                  In progress (Started at <Timestamp date={session.createdAt} />
                  )
                </span>
              )}
              {session.status === 'COMPLETED' &&
                (session.stoppedAt ? (
                  <span>
                    {session.status} at <Timestamp date={session.stoppedAt} />
                  </span>
                ) : (
                  <span>Completed</span>
                ))}
              {session.status === 'STOPPED' &&
                (session.stoppedAt ? (
                  <span>
                    Stopped at <Timestamp date={session.stoppedAt} />
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
