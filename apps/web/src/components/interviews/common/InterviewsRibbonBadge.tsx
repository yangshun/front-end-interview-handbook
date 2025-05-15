import clsx from 'clsx';

import { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBackgroundInfoColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

type RibbonTagVariant = 'info' | 'primary';

const classes: Record<
  RibbonTagVariant,
  {
    badgeClassName: string;
    svgClassName: string;
  }
> = {
  info: {
    badgeClassName: clsx(themeTextInvertColor, themeBackgroundInfoColor),
    svgClassName: clsx('dark:fill-info fill-info-dark'),
  },
  primary: {
    badgeClassName: clsx(
      'border border-brand-lighter dark:border-neutral-700',
      'text-neutral-700 dark:text-neutral-900',
      themeBackgroundBrandColor,
    ),
    svgClassName: clsx(
      'stroke-brand-lighter dark:stroke-neutral-700 dark:fill-brand fill-brand-dark',
    ),
  },
};

type Props = Readonly<{
  className?: string;
  label: string;
  variant?: RibbonTagVariant;
}>;

export default function InterviewsRibbonBadge({
  className,
  label,
  variant = 'info',
}: Props) {
  const { badgeClassName, svgClassName } = classes[variant];

  return (
    <span className={clsx('absolute -right-2 top-2 isolate', className)}>
      <span
        className={clsx(
          'relative z-[1]',
          'px-2 py-0.5',
          'rounded-l',
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
