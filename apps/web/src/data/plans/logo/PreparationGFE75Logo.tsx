import clsx from 'clsx';

import GrayedOutLogoMark from '~/components/global/logos/GrayedOutLogoMark';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

export type GFE75LogoSize = 'lg' | 'md' | 'sm';

const classes: Record<
  GFE75LogoSize,
  Readonly<{
    logoClass: string;
    outerClass: string;
    radialClass: string;
    textClass: string;
  }>
> = {
  lg: {
    logoClass: 'w-12 h-10 top-[8%]',
    outerClass: 'size-20',
    radialClass: 'before:h-20',
    textClass: 'text-4xl',
  },
  md: {
    logoClass: 'w-[41px] h-8 top-[8%]',
    outerClass: 'size-16',
    radialClass: 'before:h-16',
    textClass: 'text-[2.125rem] leading-8',
  },
  sm: {
    logoClass: 'h-5 w-[26px] top-[3px]',
    outerClass: 'size-10',
    radialClass: 'before:h-10',
    textClass: 'text-[1.328rem] leading-5',
  },
};

type Props = Readonly<{
  size?: GFE75LogoSize;
}>;

export default function PreparationGFE75Logo({ size = 'md' }: Props) {
  const { logoClass, outerClass, radialClass, textClass } = classes[size];

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
      <GrayedOutLogoMark className={clsx('-z-1 absolute', logoClass)} />
      <span
        className={clsx(
          'font-extrabold tracking-tight',
          'absolute top-[30%]',
          'from-brand-light to-brand  bg-gradient-to-b bg-clip-text text-transparent',
          textClass,
        )}>
        75
      </span>
      <div className="absolute inset-0">
        <div
          className={clsx(
            'theme-bg-radial-glow before:opacity-30',
            radialClass,
          )}
        />
      </div>
    </div>
  );
}
