import NumberFlow from '@number-flow/react';
import clsx from 'clsx';
import type { ReactElement } from 'react';

import {
  themeBackgroundBrandColor,
  themeTextDarkColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  badgeClassName: string;
  children: ReactElement;
  numberOfFilters: number;
}>;

export default function QuestionListingFilterButtonBadgeWrapper({
  badgeClassName,
  numberOfFilters,
  children,
}: Props) {
  if (numberOfFilters <= 0) {
    return children;
  }

  return (
    <span className="relative inline-block">
      {children}
      <div
        className={clsx(
          badgeClassName,
          'flex items-center justify-center',
          'absolute',
          'rounded-full',
          themeBackgroundBrandColor,
          themeTextDarkColor,
          'font-bold',
        )}>
        <NumberFlow value={numberOfFilters} />
      </div>
    </span>
  );
}
