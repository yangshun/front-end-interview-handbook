import clsx from 'clsx';

import GrayedOutLogoMark from '~/components/global/logos/GrayedOutLogoMark';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

export type GFE75LogoSize = 'lg' | 'md' | 'sm' | 'xl';

const classes: Record<
  GFE75LogoSize,
  Readonly<{
    logoClass: string;
    outerClass: string;
    textClass: string;
  }>
> = {
  lg: {
    logoClass: 'w-12 h-10',
    outerClass: 'size-14',
    textClass: 'text-3xl',
  },
  md: {
    logoClass: 'w-[38px] h-6',
    outerClass: 'size-12',
    textClass: 'text-[1.65rem] leading-8',
  },
  sm: {
    logoClass: 'h-5 w-[26px]',
    outerClass: 'size-10',
    textClass: 'text-[1.328rem] leading-5',
  },
  xl: {
    logoClass: 'w-12 h-10',
    outerClass: 'size-16',
    textClass: 'text-4xl',
  },
};

type Props = Readonly<{
  size?: GFE75LogoSize;
}>;

export default function PreparationGFE75Logo({ size = 'md' }: Props) {
  const { logoClass, outerClass, textClass } = classes[size];

  return (
    <div
      className={clsx(
        'relative',
        'rounded-lg',
        'overflow-hidden',
        'flex items-center justify-center',
        themeBackgroundCardColor,
        themeGlassyBorder,
        outerClass,
      )}>
      <GrayedOutLogoMark className={clsx('-z-1 absolute top-0', logoClass)} />
      <span
        className={clsx(
          'font-extrabold tracking-tight',
          'absolute top-[50%] -translate-y-1/2',
          themeTextSubtitleColor,
          textClass,
        )}>
        75
      </span>
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
