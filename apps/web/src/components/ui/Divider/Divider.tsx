import clsx from 'clsx';

type DividerColor = 'default' | 'emphasized';
type DividerDirection = 'horizontal' | 'vertical';

type Props = Readonly<{
  className?: string;
  color?: DividerColor;
  direction?: DividerDirection;
}>;

const dividerColorClass: Record<DividerColor, string> = {
  default: 'bg-neutral-200 dark:bg-neutral-800',
  emphasized: 'bg-neutral-300 dark:bg-neutral-700',
};

const dividerDirectionClass: Record<DividerDirection, string> = {
  horizontal: 'h-px w-full',
  vertical: 'w-px',
};

export default function Divider({
  className,
  color = 'default',
  direction = 'horizontal',
}: Props) {
  return (
    <div
      className={clsx(
        dividerDirectionClass[direction],
        dividerColorClass[color],
        className,
      )}
    />
  );
}
