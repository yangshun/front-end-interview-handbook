import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import {
  RiFontSize,
  RiStrikethrough,
  RiSubscript,
  RiSuperscript,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

import RichTextEditorDropdownMenu from '../components/RichTextEditorDropdownMenu';

type RichTextEditorSpecialCase = 'strikethrough' | 'subscript' | 'superscript';

export default function RichTextEditorSpecialCasePlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();

  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);

  const caseOptions: Array<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: RichTextEditorSpecialCase;
  }> = [
    {
      icon: RiStrikethrough,
      label: intl.formatMessage({
        defaultMessage: 'Strikethrough',
        description: 'Label for strikethrough',
        id: 'j06fZl',
      }),
      value: 'strikethrough',
    },
    {
      icon: RiSubscript,
      label: intl.formatMessage({
        defaultMessage: 'Subscript',
        description: 'Label for subscript',
        id: 'ZqJYfb',
      }),
      value: 'subscript',
    },
    {
      icon: RiSuperscript,
      label: intl.formatMessage({
        defaultMessage: 'Superscript',
        description: 'Label for superscript',
        id: 'RsPxKM',
      }),
      value: 'superscript',
    },
  ];

  const $updateState = useCallback(() => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return;
    }

    setIsStrikethrough(selection.hasFormat('strikethrough'));
    setIsSubscript(selection.hasFormat('subscript'));
    setIsSuperscript(selection.hasFormat('superscript'));
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
    <RichTextEditorDropdownMenu
      icon={RiFontSize}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Special case for richtext editor',
        description: 'Special case action for richtext editor toolbar',
        id: '/CfHhU',
      })}>
      {caseOptions.map(({ label, value, icon }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={
            {
              strikethrough: isStrikethrough,
              subscript: isSubscript,
              superscript: isSuperscript,
            }[value]
          }
          label={label}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)}
        />
      ))}
    </RichTextEditorDropdownMenu>
  );
}
