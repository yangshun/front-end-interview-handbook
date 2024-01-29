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
import type { RichTextEditorHeadingType } from '~/components/ui/RichTextEditor/types';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';

export default function RichTextEditorTextTypePlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [headingType, setHeadingType] = useState('normal');

  const typeOptions: Array<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: RichTextEditorHeadingType;
  }> = [
    {
      icon: RiFontSize2,
      label: intl.formatMessage({
        defaultMessage: 'Normal',
        description: 'Label for Normal',
        id: 'hYp7sF',
      }),
      value: 'normal',
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

  const onFormatHeading = (type: RichTextEditorHeadingType) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        if (type === 'normal') {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(type));
        }
      }
    });
  };

  return (
    <DropdownMenu
      align="end"
      icon={selectedValue?.icon ?? RiFontSize2}
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
      variant="flat">
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
