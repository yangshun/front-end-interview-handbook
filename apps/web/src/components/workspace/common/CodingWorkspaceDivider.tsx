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
    direction === 'horizontal' && 'h-2',
    direction === 'vertical' && 'w-2',
  );
}

export default function CodingWorkspaceDivider({ direction }: Props) {
  return (
    <div
      className={clsx(
        'absolute rounded-full',
        'group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100',
        'transition-color ease-in-out',
        direction === 'horizontal' && 'inset-x-0 inset-y-[3px]',
        direction === 'vertical' && 'inset-x-[3px] inset-y-0',
      )}
    />
  );
}
