import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  className?: string;
  serverDuration: number;
}>;

export default function StatisticsPanel({ className, serverDuration }: Props) {
  const searchParams = useSearchParams();
  const { pathname } = useI18nPathname();

  useEffect(() => {
    // Hack to ensure the current window location is logged.
    setTimeout(() => {
      if (process.env.NODE_ENV === 'production' || searchParams?.get('debug')) {
        // Only log in production or when there's a debug flag.
        fetch(`/api/logging/performance`, {
          body: JSON.stringify({
            clientSHA: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '',
            duration: Math.round(serverDuration),
            event: 'questions.load.time_spent.server',
            url: window.location.href,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
      }
    }, 100);
  }, [pathname, searchParams, serverDuration]);

  if (!searchParams?.get('debug')) {
    return null;
  }

  return (
    <div className={clsx('border border-neutral-200 p-3 text-xs', className)}>
      {serverDuration && <>Duration: {Math.round(serverDuration)}ms</>}
    </div>
  );
}
