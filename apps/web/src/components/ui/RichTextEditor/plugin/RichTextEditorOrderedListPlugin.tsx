import {
  $handleListInsertParagraph,
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  insertList,
  ListNode,
  REMOVE_LIST_COMMAND,
  removeList,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  INSERT_PARAGRAPH_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiListOrdered2 } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';

export default function RichTextEditorOrderedListPlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [isOrderedList, setIsOrderedList] = useState(false);

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

    if (!$isListNode(element)) {
      setIsOrderedList(false);

      return;
    }

    const parentList = $getNearestNodeOfType(anchorNode, ListNode);
    const type = parentList ? parentList.getTag() : element.getTag();

    if (type === 'ol') {
      setIsOrderedList(true);
    } else {
      setIsOrderedList(false);
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_ORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'number');

          return true;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        REMOVE_LIST_COMMAND,
        () => {
          removeList(editor);
          setIsOrderedList(false);

          return true;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => {
          return $handleListInsertParagraph();
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateState();
        });
      }),
    );
  }, [editor, $updateState]);

  const onFormatOrderedList = () => {
    if (isOrderedList) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  return (
    <RichTextEditorToolbarActionNode
      icon={RiListOrdered2}
      isActive={isOrderedList}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Numbered list',
        description: 'Numbered list tooltip for Richtext toolbar',
        id: 'hkKaPn',
      })}
      onClick={onFormatOrderedList}
    />
  );
}
