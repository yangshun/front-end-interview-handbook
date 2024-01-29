import clsx from 'clsx';

import Tooltip from '~/components/ui/Tooltip';

import {
  themeBackgroundElementHoverStateColor,
  themeBackgroundElementPressedStateColor,
} from '../../theme';

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
        'p-1.5',
        'rounded-full',
        isActive && 'text-brand-dark dark:text-brand',
        isActive && 'bg-neutral-100 dark:bg-neutral-800/70',
        'disabled:text-neutral-300 dark:disabled:text-neutral-700',
        'disabled:cursor-not-allowed',
        themeBackgroundElementHoverStateColor,
        themeBackgroundElementPressedStateColor,
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
