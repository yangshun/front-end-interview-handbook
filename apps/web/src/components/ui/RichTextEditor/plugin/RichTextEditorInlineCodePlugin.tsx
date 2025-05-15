import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiCodeLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';

export default function RichTextEditorInlineCodePlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [isCode, setIsCode] = useState(false);

  const $updateState = useCallback(() => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return;
    }

    setIsCode(selection.hasFormat('code'));
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateState();

          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateState();
        });
      }),
    );
  }, [editor, $updateState]);

  return (
    <RichTextEditorToolbarActionNode
      icon={RiCodeLine}
      isActive={isCode}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Insert inline code',
        description: 'Inline code tooltip for Richtext toolbar',
        id: 'p8zMao',
      })}
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
      }}
    />
  );
}
