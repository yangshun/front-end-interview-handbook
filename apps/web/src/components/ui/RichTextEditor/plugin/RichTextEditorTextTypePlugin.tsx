import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiFontSize2, RiHeading } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

import RichTextEditorDropdownMenu from '../components/RichTextEditorDropdownMenu';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';

export type RichTextEditorTextType = 'heading' | 'paragraph';

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
      icon: RiHeading,
      label: intl.formatMessage({
        defaultMessage: 'Heading',
        description: 'Label for heading',
        id: 'e5o4mU',
      }),
      value: 'heading',
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
        $setBlocksType(selection, () =>
          type === 'heading'
            ? $createHeadingNode('h4')
            : $createParagraphNode(),
        );
      }
    });
    setTimeout(() => {
      editor.focus();
    }, 0);
  }

  return (
    <RichTextEditorDropdownMenu
      icon={selectedValue?.icon ?? RiFontSize2}
      label={
        selectedValue?.label ??
        intl.formatMessage({
          defaultMessage: 'Normal',
          description: 'Label for Normal',
          id: 'hYp7sF',
        })
      }>
      {typeOptions.map(({ label, value, icon }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={headingType === value}
          label={label}
          onClick={() => onFormatHeading(value)}
        />
      ))}
    </RichTextEditorDropdownMenu>
  );
}
