import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiUnderline } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';

export default function RichTextEditorUnderlinePlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [isUnderline, setIsUnderline] = useState(false);

  const $updateState = useCallback(() => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return;
    }

    setIsUnderline(selection.hasFormat('underline'));
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
      icon={RiUnderline}
      isActive={isUnderline}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Underline',
        description: 'Underline tooltip for Richtext toolbar',
        id: '7tztU9',
      })}
      onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
    />
  );
}
