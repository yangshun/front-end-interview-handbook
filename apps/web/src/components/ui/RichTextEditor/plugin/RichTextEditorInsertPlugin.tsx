import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  KEY_MODIFIER_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiAddLine, RiLink, RiRulerLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

import RichTextEditorFloatingLinkEditorPlugin from './RichTextEditorFloatingLinkEditorPlugin';
import RichTextEditorDropdownMenu from '../components/RichTextEditorDropdownMenu';
import { getSelectedNode } from '../utils/getSelectedNode';

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
  const [isOpenLinkEditor, setIsOpenLinkEditor] = useState(false);
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

          setIsLinkEditMode(true);
          setIsOpenLinkEditor(true);

          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor, isLink, setIsLinkEditMode]);

  const onInsertAction = (value: RichTextEditorInsertType) => {
    if (value === 'link') {
      if (!isLink) {
        // Add timeout so that link editor popup can opens up only after editor.focus() is triggered from dropdown menu
        setTimeout(() => {
          setIsOpenLinkEditor(!isOpenLinkEditor);
          setIsLinkEditMode(true);
        }, 10);
      } else {
        setIsLinkEditMode(false);
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      }

      return;
    }

    if (value === 'horizontal') {
      editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
    }
  };

  const isSelected = (value: RichTextEditorInsertType) => {
    if (value === 'link') {
      return isLink;
    }

    return false;
  };

  return (
    <>
      <RichTextEditorDropdownMenu
        icon={RiAddLine}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Insert an object',
          description: 'Rich text editor button label',
          id: 'DlfZrJ',
        })}>
        {insertOptions.map(({ label, value, icon }) => (
          <DropdownMenu.Item
            key={value}
            icon={icon}
            isSelected={isSelected(value)}
            label={label}
            onClick={() => onInsertAction(value)}
          />
        ))}
      </RichTextEditorDropdownMenu>
      {floatingAnchorElem && (
        <RichTextEditorFloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          isOpenLinkEditor={isOpenLinkEditor}
          setIsLinkEditMode={setIsLinkEditMode}
          setIsOpenLinkEditor={setIsOpenLinkEditor}
        />
      )}
    </>
  );
}
