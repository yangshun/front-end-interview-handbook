import clsx from 'clsx';
import type { ReactNode } from 'react';

import Heading from '~/components/ui/Heading';
import {
  themeBackgroundColor,
  themeBorderColor,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

type Props = Readonly<{
  addOnLabel?: ReactNode;
  discountLabel: string;
  footer?: ReactNode;
  header?: ReactNode;
  showGlow?: boolean;
}>;

export default function PromotionCard({
  header,
  discountLabel,
  footer,
  addOnLabel,
  showGlow,
}: Props) {
  return (
    <div
      className={clsx(
        'rounded-xl',
        'p-6',
        'isolate overflow-hidden',
        themeBackgroundColor,
        ['border', themeBorderColor],
        showGlow && [
          themeWhiteGlowCardBackground,
          'before:-top-[100px] before:left-1/2 before:h-[180px] before:w-[300px] before:-translate-x-1/2',
        ],
        'flex flex-col items-start gap-6',
      )}>
      {header}
      <div
        className={clsx(
          'flex flex-row sm:flex-col',
          'items-end justify-between sm:items-start sm:justify-normal',
          'gap-x-2 gap-y-3',
          'w-full',
        )}>
        <div className="flex items-baseline gap-1">
          <Heading level="heading2">{discountLabel}</Heading>
          {addOnLabel}
        </div>
        {footer}
      </div>
    </div>
  );
}
