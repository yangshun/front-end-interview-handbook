import {
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  UNDO_COMMAND,
} from 'lexical';
import { useEffect, useState } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function RichTextEditorUndoPlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);

  useEffect(() => {
    return editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);

        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  return (
    <RichTextEditorToolbarActionNode
      icon={RiArrowGoBackLine}
      isDisabled={!canUndo}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Undo',
        description: 'Undo tooltip for richtext toolbar',
        id: 'KQfZUe',
      })}
      onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
    />
  );
}
