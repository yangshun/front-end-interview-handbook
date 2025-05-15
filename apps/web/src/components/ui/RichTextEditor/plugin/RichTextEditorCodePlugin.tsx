import type { CODE_LANGUAGE_MAP } from '@lexical/code';
import { CODE_LANGUAGE_FRIENDLY_NAME_MAP } from '@lexical/code';
import { $createCodeNode, $isCodeNode } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect } from 'react';
import { RiCodeSSlashLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';
import Select from '~/components/ui/Select';

type Props = Readonly<{
  codeLanguage: string;
  isCode: boolean;
  selectedElementKey: string | null;
  setCodeLanguage: (value: string) => void;
  setIsCode: (value: boolean) => void;
  setSelectedElementKey: (value: string) => void;
}>;

export default function RichTextEditorCodePlugin({
  isCode,
  setIsCode,
  codeLanguage,
  setCodeLanguage,
  setSelectedElementKey,
  selectedElementKey,
}: Props) {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();

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
    setSelectedElementKey(elementKey);
    if ($isCodeNode(element)) {
      setIsCode(true);

      const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;

      setCodeLanguage(language);
    } else {
      setIsCode(false);
    }
  }, [editor, setIsCode, setCodeLanguage, setSelectedElementKey]);

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

  function getCodeLanguageOptions(): Array<{ label: string; value: string }> {
    const options: Array<{ label: string; value: string }> = [];

    for (const [lang, friendlyName] of Object.entries(
      CODE_LANGUAGE_FRIENDLY_NAME_MAP,
    )) {
      options.push({ label: friendlyName, value: lang });
    }

    return options;
  }

  const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

  const onFormatCode = () => {
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
  };

  return (
    <>
      <RichTextEditorToolbarActionNode
        icon={RiCodeSSlashLine}
        isActive={isCode}
        tooltipLabel={intl.formatMessage({
          defaultMessage: 'Insert code block',
          description: 'Insert code block tooltip for Richtext toolbar',
          id: 'm2WYh/',
        })}
        onClick={onFormatCode}
      />
      {isCode && (
        <Select
          isLabelHidden={true}
          label="Code"
          options={CODE_LANGUAGE_OPTIONS}
          size="xs"
          value={codeLanguage}
          onChange={onCodeLanguageSelect}
        />
      )}
    </>
  );
}
