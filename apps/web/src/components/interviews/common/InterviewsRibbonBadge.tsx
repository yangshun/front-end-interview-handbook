import clsx from 'clsx';

import { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBackgroundColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

type RibbonTagVariant = 'neutral' | 'primary';

const classes: Record<
  RibbonTagVariant,
  {
    badgeClassName: string;
    svgClassName: string;
  }
> = {
  neutral: {
    badgeClassName: clsx(
      'border-[#cfcfd1] dark:border-neutral-800',
      themeBackgroundColor,
      themeTextSubtitleColor,
    ),
    svgClassName: clsx(
      'fill-white stroke-[#cfcfd1] dark:fill-neutral-950 dark:stroke-neutral-800',
    ),
  },
  primary: {
    badgeClassName: clsx(
      'border-brand-lighter border',
      'text-neutral-700 dark:text-neutral-900',
      themeBackgroundBrandColor,
    ),
    svgClassName: clsx('stroke-brand-lighter dark:fill-brand fill-brand-dark'),
  },
};

type Props = Readonly<{
  className?: string;
  label: string;
  variant?: RibbonTagVariant;
}>;

export default function InterviewsRibbonBadge({
  label,
  variant = 'neutral',
  className,
}: Props) {
  const { badgeClassName, svgClassName } = classes[variant];

  return (
    <span className={clsx('absolute -right-2 top-2 isolate', className)}>
      <span
        className={clsx(
          'relative z-[1]',
          'px-2 py-0.5',
          'rounded-l',
          'border',
          badgeClassName,
          textVariants({
            color: 'inherit',
            size: 'body3',
            weight: 'bold',
          }),
          'shadow-md',
        )}>
        {label}
      </span>
      <svg
        className={clsx('h-2.5 w-2', 'absolute right-0 -translate-y-0.5')}
        viewBox="0 0 8 10"
        xmlns="http://www.w3.org/2000/svg">
        <path className={svgClassName} d="M0.5 0.5H6.95969L0.5 8.57461V0.5Z" />
      </svg>
    </span>
  );
}
