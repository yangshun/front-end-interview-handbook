import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiFontSize2, RiH1, RiH2, RiH3 } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import DropdownMenu from '~/components/ui/DropdownMenu';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';

export type RichTextEditorTextType = 'h1' | 'h2' | 'h3' | 'paragraph';

export default function RichTextEditorTextTypePlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [headingType, setHeadingType] = useState('normal');

  const typeOptions: Array<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: RichTextEditorTextType;
  }> = [
    {
      icon: RiFontSize2,
      label: intl.formatMessage({
        defaultMessage: 'Paragraph',
        description: 'Label for Normal',
        id: 'GI36TV',
      }),
      value: 'paragraph',
    },
    {
      icon: RiH1,
      label: intl.formatMessage({
        defaultMessage: 'Heading 1',
        description: 'Label for heading 1',
        id: 'td/xb6',
      }),
      value: 'h1',
    },
    {
      icon: RiH2,
      label: intl.formatMessage({
        defaultMessage: 'Heading 2',
        description: 'Label for heading 2',
        id: 'gAcM0t',
      }),
      value: 'h2',
    },
    {
      icon: RiH3,
      label: intl.formatMessage({
        defaultMessage: 'Heading 3',
        description: 'Label for heading 3',
        id: 'F4qs12',
      }),
      value: 'h3',
    },
  ];

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

    const type = $isHeadingNode(element) ? element.getTag() : element.getType();

    setHeadingType(type);
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

  const selectedValue = typeOptions.find((type) => type.value === headingType);

  function onFormatHeading(type: RichTextEditorTextType) {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        if (type === 'paragraph') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(type));
        }
      }
    });
  }

  return (
    <DropdownMenu
      icon={selectedValue?.icon ?? RiFontSize2}
      isDisabled={!editor.isEditable()}
      label={
        selectedValue?.label ??
        intl.formatMessage({
          defaultMessage: 'Normal',
          description: 'Label for Normal',
          id: 'hYp7sF',
        })
      }
      labelColor="inherit"
      size="xs"
      variant="tertiary">
      {typeOptions.map(({ label, value, icon }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={headingType === value}
          label={label}
          onClick={() => onFormatHeading(value)}
        />
      ))}
    </DropdownMenu>
  );
}
