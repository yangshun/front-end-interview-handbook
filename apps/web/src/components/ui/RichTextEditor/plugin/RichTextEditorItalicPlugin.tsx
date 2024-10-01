import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiItalic } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';

export default function RichTextEditorItalicPlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [isItalic, setIsItalic] = useState(false);

  const $updateState = useCallback(() => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return;
    }

    setIsItalic(selection.hasFormat('italic'));
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
      icon={RiItalic}
      isActive={isItalic}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Italic',
        description: 'Italic tooltip for Richtext toolbar',
        id: '4uXotU',
      })}
      onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
    />
  );
}
