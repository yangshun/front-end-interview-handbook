import clsx from 'clsx';

import {
  themeBorderBrandColor_GroupHover,
  themeBorderEmphasizeColor,
  themeTextBrandColor_GroupHover,
  themeTextSecondaryColor,
} from '../theme';

type Props =
  | Readonly<{
      icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    }>
  | Readonly<{
      imageUrl: string;
    }>;

export default function NavbarFeatureIcon(props: Props) {
  return (
    <div
      className={clsx(
        'rounded-full p-3',
        'icon' in props ? 'dark:bg-neutral-800/70' : 'bg-white',
        'transition-colors',
        ['border', themeBorderEmphasizeColor, themeBorderBrandColor_GroupHover],
        themeTextSecondaryColor,
      )}>
      {'icon' in props ? (
        <props.icon
          aria-hidden="true"
          className={clsx('size-6 shrink-0', themeTextBrandColor_GroupHover)}
        />
      ) : (
        <img
          alt=""
          className="size-6 object-fit shrink-0"
          // eslint-disable-next-line react/destructuring-assignment
          src={props.imageUrl}
        />
      )}
    </div>
  );
}
