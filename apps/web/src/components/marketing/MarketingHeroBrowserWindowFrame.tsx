import clsx from 'clsx';
import type { ReactNode } from 'react';

import { themeBackgroundColor } from '~/components/ui/theme';

type Props = Readonly<{
  children: ReactNode;
}>;

export default function MarketingHeroBrowserWindowFrame({ children }: Props) {
  return (
    <div
      className={clsx(
        'w-full overflow-hidden rounded-lg shadow-xl ring-1 ring-neutral-900/5 sm:rounded-xl',
        themeBackgroundColor,
      )}>
      <div
        className="grid items-center gap-6 bg-neutral-800 py-2.5 px-4"
        style={{
          gridTemplateColumns: '4rem 1fr 4rem',
        }}>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#EC6A5F]" />
          <div className="h-3 w-3 rounded-full bg-[#F4BF50]" />
          <div className="h-3 w-3 rounded-full bg-[#61C454]" />
        </div>
        <div>
          <div className="mx-auto flex items-center justify-center rounded-full bg-neutral-700 py-1 text-xs font-medium leading-6 text-neutral-200 ring-1 ring-inset ring-neutral-900/5 sm:w-3/5">
            <svg
              className="mr-1.5 h-3.5 w-3.5 text-neutral-300"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                fillRule="evenodd"></path>
            </svg>
            greatfrontend.com
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
