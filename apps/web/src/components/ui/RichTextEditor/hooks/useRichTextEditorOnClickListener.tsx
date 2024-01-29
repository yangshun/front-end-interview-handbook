import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';
import type {
  RichTextEditorEventType,
  RichTextEditorSpecialCase,
} from '~/components/ui/RichTextEditor/types';

import {
  $createCodeNode,
  $isCodeNode,
  getCodeLanguages,
  getDefaultCodeLanguage,
} from '@lexical/code';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  insertList,
  ListNode,
  REMOVE_LIST_COMMAND,
  removeList,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';

const priority = COMMAND_PRIORITY_CRITICAL;

export default function useRichTextEditorOnClickListener() {
  const [editor] = useLexicalComposerContext();

  const [isItalic, setIsItalic] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null,
  );
  const [headingType, setHeadingType] = useState('normal');
  const [specialCase, setSpecialCase] =
    useState<RichTextEditorSpecialCase | null>(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();

          if (type === 'ol') {
            setIsOrderedList(true);
          }
          if (type === 'ul') {
            setIsUnorderedList(true);
          }
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();

          if (type === 'paragraph') {
            setHeadingType('normal');
          }
          if (type === 'h1') {
            setHeadingType('h1');
          }
          if (type === 'h2') {
            setHeadingType('h2');
          }
          if (type === 'h3') {
            setHeadingType('h3');
          }
          setIsOrderedList(false);
          setIsUnorderedList(false);
          if ($isCodeNode(element)) {
            setIsCode(true);
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          } else {
            setIsCode(false);
          }
          if ($isQuoteNode(element)) {
            setIsQuote(true);
          } else {
            setIsQuote(false);
          }
        }
      }

      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      if (selection.hasFormat('strikethrough')) {
        setSpecialCase('strikethrough' as RichTextEditorSpecialCase);
      } else if (selection.hasFormat('subscript')) {
        setSpecialCase('subscript' as RichTextEditorSpecialCase);
      } else if (selection.hasFormat('superscript')) {
        setSpecialCase('superscript' as RichTextEditorSpecialCase);
      } else {
        setSpecialCase(null);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _) => {
          updateToolbar();

          return false;
        },
        priority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);

          return false;
        },
        priority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);

          return false;
        },
        priority,
      ),
      editor.registerCommand(
        INSERT_ORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'number');

          return true;
        },
        priority,
      ),
      editor.registerCommand(
        INSERT_UNORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'bullet');

          return true;
        },
        priority,
      ),
      editor.registerCommand(
        REMOVE_LIST_COMMAND,
        () => {
          removeList(editor);
          setIsOrderedList(false);
          setIsUnorderedList(false);

          return true;
        },
        priority,
      ),
    );
  }, [editor, updateToolbar]);

  const onClick = (
    event: RichTextEditorEventType | RichTextEditorSpecialCase,
  ) => {
    if (event === richTextEditorToolbarEventTypes.italic) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
    }
    if (event === richTextEditorToolbarEventTypes.undo) {
      editor.dispatchCommand(UNDO_COMMAND, undefined);
    }
    if (event === richTextEditorToolbarEventTypes.redo) {
      editor.dispatchCommand(REDO_COMMAND, undefined);
    }
    if (event === richTextEditorToolbarEventTypes.underline) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
    }
    if (event === richTextEditorToolbarEventTypes.ol) {
      if (isOrderedList) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      }
    }
    if (event === richTextEditorToolbarEventTypes.ul) {
      if (isUnorderedList) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      }
    }

    if (event === richTextEditorToolbarEventTypes.code) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (!isCode) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            $setBlocksType(selection, () => $createParagraphNode());
          }
        }
      });
    }

    if (event === richTextEditorToolbarEventTypes.quote) {
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
    }

    if (event === richTextEditorToolbarEventTypes.normal) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
    if (event === richTextEditorToolbarEventTypes.h1) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode('h1'));
        }
      });
    }
    if (event === richTextEditorToolbarEventTypes.h2) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode('h2'));
        }
      });
    }
    if (event === richTextEditorToolbarEventTypes.h3) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode('h3'));
        }
      });
    }

    if (event === richTextEditorToolbarEventTypes.strikethrough) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
      if (specialCase === richTextEditorToolbarEventTypes.strikethrough) {
        setSpecialCase(null);
      }
    }
    if (event === richTextEditorToolbarEventTypes.subscript) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
      if (specialCase === richTextEditorToolbarEventTypes.subscript) {
        setSpecialCase(null);
      }
    }
    if (event === richTextEditorToolbarEventTypes.superscript) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
      if (specialCase === richTextEditorToolbarEventTypes.superscript) {
        setSpecialCase(null);
      }
    }
  };

  const codeLanguages = useMemo(() => getCodeLanguages(), []);

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);

          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [editor, selectedElementKey],
  );

  return {
    canRedo,
    canUndo,
    codeLanguage,
    codeLanguages,
    headingType,
    isCode,
    isItalic,
    isOrderedList,
    isQuote,
    isUnderline,
    isUnorderedList,
    onClick,
    onCodeLanguageSelect,
    specialCase,
  };
}
