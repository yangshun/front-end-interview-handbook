import clsx from 'clsx';
import type { ReactNode } from 'react';

import { themeBackgroundColor } from '~/components/ui/theme';

type Props = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export default function InterviewsMarketingHeroBrowserWindowFrame({
  children,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        'w-full overflow-hidden',
        'rounded-lg sm:rounded-xl',
        'border border-neutral-300 dark:border-white/10',
        'bg-white dark:bg-neutral-800/40',
        'shadow-xl',
        className,
      )}>
      <div
        className={clsx(
          'grid grid-cols-[3rem_1fr_3rem] md:grid-cols-[3rem_1fr_3rem]',
          'items-center gap-6 px-4 py-2',
        )}>
        <div className="flex items-center gap-x-2">
          <div
            className={clsx(
              'size-3 rounded-full',
              'bg-[#2D3039]/15 dark:bg-white/15',
            )}
          />
          <div
            className={clsx(
              'size-3 rounded-full',
              'bg-[#2D3039]/15 dark:bg-white/15',
            )}
          />
          <div
            className={clsx(
              'size-3 rounded-full',
              'bg-[#2D3039]/15 dark:bg-white/15',
            )}
          />
        </div>
        <div>
          <div
            className={clsx(
              'mx-auto flex items-center justify-center gap-1 py-0.5 md:w-[50%]',
              'bg-[#2D3039]/10 dark:bg-white/10',
              'rounded-lg',
              'text-xs font-medium leading-6',
              'text-[#2D3039]/70 dark:text-neutral-200',
            )}>
            <svg className="size-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                fillRule="evenodd"></path>
            </svg>
            greatfrontend.com
          </div>
        </div>
      </div>
      <div className={themeBackgroundColor}>{children}</div>
    </div>
  );
}
