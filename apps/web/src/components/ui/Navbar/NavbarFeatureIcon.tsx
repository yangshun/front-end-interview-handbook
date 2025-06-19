import clsx from 'clsx';

import Chip from '~/components/ui/Chip';
import {
  themeGlassyBorder,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  number?: number;
}> &
  (
    | Readonly<{
        icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
      }>
    | Readonly<{
        imageUrl: string;
      }>
  );

export default function NavbarFeatureIcon({ number, ...props }: Props) {
  if (number !== undefined) {
    return <Chip label={number.toString()} size="sm" variant="neutral" />;
  }

  return (
    <div
      className={clsx(
        'inline-flex shrink-0 items-center justify-center',
        'size-8',
        'rounded-md',
        'icon' in props ? 'dark:bg-neutral-800/70' : 'bg-white',
        'transition-colors',
        themeGlassyBorder,
        themeTextSubtitleColor,
      )}>
      {'icon' in props ? (
        <props.icon aria-hidden="true" className={clsx('size-4 shrink-0')} />
      ) : (
        <img
          alt=""
          className="size-6 object-fit shrink-0"
           
          src={props.imageUrl}
        />
      )}
    </div>
  );
}
