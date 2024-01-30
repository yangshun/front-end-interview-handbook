import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';
import type { RichTextEditorEventType } from '~/components/ui/RichTextEditor/types';

import {
  $createCodeNode,
  $isCodeNode,
  getCodeLanguages,
  getDefaultCodeLanguage,
} from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';

const priority = COMMAND_PRIORITY_CRITICAL;

export default function useRichTextEditorOnClickListener() {
  const [editor] = useLexicalComposerContext();

  const [isCode, setIsCode] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null,
  );

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
        if ($isCodeNode(element)) {
          setIsCode(true);
          setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
        } else {
          setIsCode(false);
        }
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
    );
  }, [editor, updateToolbar]);

  const onClick = (event: RichTextEditorEventType) => {
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
    codeLanguage,
    codeLanguages,
    isCode,
    onClick,
    onCodeLanguageSelect,
  };
}
