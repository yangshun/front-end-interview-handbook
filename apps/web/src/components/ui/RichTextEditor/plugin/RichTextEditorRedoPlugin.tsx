import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  CAN_REDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
} from 'lexical';
import { useEffect, useState } from 'react';
import { RiArrowGoForwardLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';

export default function RichTextEditorRedoPlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    return editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);

        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  return (
    <RichTextEditorToolbarActionNode
      icon={RiArrowGoForwardLine}
      isDisabled={!canRedo}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Redo',
        description: 'Redo tooltip for Richtext toolbar',
        id: 'u2wpqq',
      })}
      onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
    />
  );
}
