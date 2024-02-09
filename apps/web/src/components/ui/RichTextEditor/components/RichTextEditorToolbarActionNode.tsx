import clsx from 'clsx';

import Tooltip from '~/components/ui/Tooltip';

import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeTextBrandColor,
} from '../../theme';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type ActionNodeProps = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  tooltipLabel: string;
}>;

export default function RichTextEditorToolbarActionNode({
  icon: Icon,
  onClick,
  tooltipLabel,
  isDisabled,
  isActive,
}: ActionNodeProps) {
  const [editor] = useLexicalComposerContext();

  const node = (
    <button
      aria-label={tooltipLabel}
      className={clsx(
        'p-1.5',
        'rounded-full',
        isActive && themeTextBrandColor,
        isActive && themeBackgroundElementEmphasizedStateColor,
        'disabled:text-neutral-300 dark:disabled:text-neutral-700',
        'disabled:cursor-not-allowed',
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementPressedStateColor_Active,
      )}
      disabled={isDisabled || !editor.isEditable()}
      type="button"
      onClick={onClick}>
      <Icon className="size-4" />
    </button>
  );

  return (
    <Tooltip asChild={true} label={tooltipLabel} side="top">
      {node}
    </Tooltip>
  );
}
