import clsx from 'clsx';
import { useId } from 'react';

import {
  themeBackgroundCardColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

export type GFE75LogoSize = 'lg' | 'md' | 'sm';

const classes: Record<
  GFE75LogoSize,
  Readonly<{
    iconClass: string;
    outerClass: string;
  }>
> = {
  lg: {
    iconClass: 'size-12',
    outerClass: 'size-20',
  },
  md: {
    iconClass: 'size-10',
    outerClass: 'size-16',
  },
  sm: {
    iconClass: 'size-5',
    outerClass: 'size-10',
  },
};

type Props = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  size?: GFE75LogoSize;
  startColor: string;
  stopColor: string;
}>;

export default function InterviewsPageHeaderLogo({
  size = 'md',
  icon: Icon,
  startColor,
  stopColor,
}: Props) {
  const id = useId();
  const { iconClass, outerClass } = classes[size];

  return (
    <div
      className={clsx(
        'relative isolate',
        'rounded-lg',
        'overflow-hidden',
        'flex items-center justify-center',
        themeBackgroundCardColor,
        themeGlassyBorder,
        outerClass,
      )}>
      <svg height="0" width="0">
        <linearGradient id={id} x1="100%" x2="0%" y1="100%" y2="0%">
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={stopColor} />
        </linearGradient>
      </svg>
      <Icon
        className={clsx('absolute -z-[1]', iconClass)}
        style={{ fill: `url(#${id})` }}
      />
      <div className="absolute inset-0">
        <div
          className={clsx(
            'absolute -top-[27px] left-1/2 -translate-x-1/2',
            'size-8',
            'bg-neutral-900 opacity-40 mix-blend-normal blur-[20.25px] dark:bg-neutral-100',
          )}
        />
      </div>
    </div>
  );
}
