import clsx from 'clsx';

import Tooltip from '~/components/ui/Tooltip';

type ActionNodeProps = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  tooltipLabel?: string;
}>;

export default function RichTextEditorToolbarActionNode({
  icon: Icon,
  onClick,
  tooltipLabel,
  isDisabled,
  isActive,
}: ActionNodeProps) {
  const node = (
    <button
      className={clsx(
        'p-[6px]',
        isActive && 'text-brand-dark dark:text-brand',
        !isDisabled && 'hover:text-brand-dark dark:hover:text-brand',
        'disabled:text-white dark:disabled:text-neutral-700 disabled:cursor-not-allowed',
      )}
      disabled={isDisabled}
      type="button"
      onClick={onClick}>
      <Icon className="h-4 w-4" />
    </button>
  );

  return tooltipLabel && !isDisabled ? (
    <Tooltip label={tooltipLabel} position="above">
      {node}
    </Tooltip>
  ) : (
    node
  );
}
