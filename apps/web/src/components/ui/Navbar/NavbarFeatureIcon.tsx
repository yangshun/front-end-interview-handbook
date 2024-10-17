import clsx from 'clsx';

import { themeGlassyBorder } from '~/components/ui/theme';

import { themeTextSecondaryColor } from '../theme';

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
        'inline-flex shrink-0 items-center justify-center',
        'size-8',
        'rounded-md',
        'icon' in props ? 'dark:bg-neutral-800/70' : 'bg-white',
        'transition-colors',
        themeGlassyBorder,
        themeTextSecondaryColor,
      )}>
      {'icon' in props ? (
        <props.icon aria-hidden="true" className={clsx('size-4 shrink-0')} />
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
