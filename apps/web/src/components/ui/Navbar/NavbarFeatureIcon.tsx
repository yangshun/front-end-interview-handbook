import clsx from 'clsx';

import {
  themeBorderBrandColor_GroupHover,
  themeBorderEmphasizeColor,
  themeTextBrandColor_GroupHover,
  themeTextSecondaryColor,
} from '../theme';

type Props = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>;

export default function NavbarFeatureIcon({ icon: Icon }: Props) {
  return (
    <div
      className={clsx(
        'rounded-full p-3 dark:bg-neutral-800/70',
        'transition-colors',
        ['border', themeBorderEmphasizeColor, themeBorderBrandColor_GroupHover],
        themeTextSecondaryColor,
      )}>
      <Icon
        aria-hidden="true"
        className={clsx('size-6 shrink-0', themeTextBrandColor_GroupHover)}
      />
    </div>
  );
}
