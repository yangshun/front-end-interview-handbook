import clsx from 'clsx';
import type { PanelGroupProps } from 'react-resizable-panels';

type Props = Readonly<{
  direction: PanelGroupProps['direction'];
}>;

export function CodingWorkspaceDividerWrapperClassname(
  direction: PanelGroupProps['direction'],
) {
  return clsx(
    'relative bg-transparent group',
    direction === 'horizontal' && 'h-3',
    direction === 'vertical' && 'w-3',
  );
}

export default function CodingWorkspaceDivider({ direction }: Props) {
  return (
    <div
      className={clsx(
        'absolute rounded-full',
        'dark:group-hover:bg-brand group-hover:bg-neutral-500',
        'transition-color ease-in-out',
        direction === 'horizontal' && 'inset-x-0 inset-y-1',
        direction === 'vertical' && 'inset-x-1 inset-y-0',
      )}
    />
  );
}
