import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import DropdownMenu from '~/components/ui/DropdownMenu';

type Props = Readonly<{
  children: React.ComponentProps<typeof DropdownMenu>['children'];
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isLabelHidden?: boolean;
  label: string;
}>;

export default function RichTextEditorDropdownMenu({
  children,
  isLabelHidden,
  icon,
  label,
}: Props) {
  const [editor] = useLexicalComposerContext();

  return (
    <DropdownMenu
      icon={icon}
      isDisabled={!editor.isEditable()}
      isLabelHidden={isLabelHidden}
      label={label}
      size="xs"
      tooltip={isLabelHidden ? label : undefined}
      variant="tertiary"
      onCloseAutoFocus={(event) => event.preventDefault()}>
      {children}
    </DropdownMenu>
  );
}
