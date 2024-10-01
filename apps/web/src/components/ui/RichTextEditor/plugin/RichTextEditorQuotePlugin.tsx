import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiQuoteText } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createQuoteNode, $isQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';

export default function RichTextEditorQuotePlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [isQuote, setIsQuote] = useState(false);

  const $updateState = useCallback(() => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return;
    }

    const anchorNode = selection.anchor.getNode();
    const element =
      anchorNode.getKey() === 'root'
        ? anchorNode
        : anchorNode.getTopLevelElementOrThrow();
    const elementKey = element.getKey();
    const elementDOM = editor.getElementByKey(elementKey);

    if (elementDOM === null) {
      return;
    }

    if ($isQuoteNode(element)) {
      setIsQuote(true);
    } else {
      setIsQuote(false);
    }
  }, [editor]);

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

  const onFormatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        if (!isQuote) {
          $setBlocksType(selection, () => $createQuoteNode());
        } else {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      }
    });
  };

  return (
    <RichTextEditorToolbarActionNode
      icon={RiQuoteText}
      isActive={isQuote}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Quote',
        description: 'Quote tooltip for richtext toolbar',
        id: 'd4ZiFU',
      })}
      onClick={onFormatQuote}
    />
  );
}
