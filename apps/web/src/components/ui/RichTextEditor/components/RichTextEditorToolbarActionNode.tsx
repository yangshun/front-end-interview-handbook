import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import clsx from 'clsx';

import Tooltip from '~/components/ui/Tooltip';

import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeTextBrandColor,
} from '../../theme';

type ActionNodeProps = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  tooltipLabel: string;
}>;

export default function RichTextEditorToolbarActionNode({
  icon: Icon,
  isActive,
  isDisabled,
  onClick,
  tooltipLabel,
}: ActionNodeProps) {
  const [editor] = useLexicalComposerContext();

  return (
    <Tooltip asChild={true} label={tooltipLabel} side="top">
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
    </Tooltip>
  );
}
