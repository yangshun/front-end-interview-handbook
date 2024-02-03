import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  KEY_MODIFIER_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiLink, RiRulerLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import DropdownMenu from '~/components/ui/DropdownMenu';

import RichTextEditorFloatingLinkEditorPlugin from './RichTextEditorFloatingLinkEditorPlugin';
import { getSelectedNode } from '../utils/getSelectedNode';
import { sanitizeUrl } from '../utils/url';

import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { mergeRegister } from '@lexical/utils';

type RichTextEditorInsertType = 'horizontal' | 'image' | 'link';

type Props = Readonly<{
  floatingAnchorElem: HTMLDivElement | null;
}>;

export default function RichTextEditorInsertPlugin({
  floatingAnchorElem,
}: Props) {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();

  const [isLink, setIsLink] = useState(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState(false);
  const insertOptions: Array<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: RichTextEditorInsertType;
  }> = [
    {
      icon: RiLink,
      label: intl.formatMessage({
        defaultMessage: 'Link',
        description: 'Label for link',
        id: 'ftK9zU',
      }),
      value: 'link',
    },
    {
      icon: RiRulerLine,
      label: intl.formatMessage({
        defaultMessage: 'Horizontal rule',
        description: 'Label for horizontal rule',
        id: 'RuN/vS',
      }),
      value: 'horizontal',
    },
    // {
    //   icon: RiImageLine,
    //   label: intl.formatMessage({
    //     defaultMessage: 'Image',
    //     description: 'Label for image',
    //     id: 'nw9bBh',
    //   }),
    //   value: 'image',
    // },
  ];

  const $updateState = useCallback(() => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return;
    }

    // Update links
    const node = getSelectedNode(selection);
    const parent = node.getParent();

    if ($isLinkNode(parent) || $isLinkNode(node)) {
      setIsLink(true);
    } else {
      setIsLink(false);
    }
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

  useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === 'KeyK' && (ctrlKey || metaKey)) {
          event.preventDefault();

          let url: string | null = null;

          if (!isLink) {
            setIsLinkEditMode(true);
            url = sanitizeUrl('https://');
          } else {
            setIsLinkEditMode(false);
            url = null;
          }

          return editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }

        return false;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor, isLink, setIsLinkEditMode]);

  const onInsertAction = (value: RichTextEditorInsertType) => {
    if (value === 'link') {
      if (!isLink) {
        setIsLinkEditMode(true);
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
      } else {
        setIsLinkEditMode(false);
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      }
    }
    if (value === 'horizontal') {
      editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
    }
  };

  return (
    <>
      <DropdownMenu
        align="start"
        isDisabled={!editor.isEditable()}
        label="Insert"
        labelColor="inherit"
        size="xs"
        variant="flat">
        {insertOptions.map(({ label, value, icon }) => (
          <DropdownMenu.Item
            key={value}
            icon={icon}
            isSelected={false}
            label={label}
            onClick={() => onInsertAction(value)}
          />
        ))}
      </DropdownMenu>
      {floatingAnchorElem && (
        <RichTextEditorFloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      )}
    </>
  );
}
