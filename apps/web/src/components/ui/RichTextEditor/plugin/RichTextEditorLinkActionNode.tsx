import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  KEY_MODIFIER_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { RiLink } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';

import { getSelectedNode } from '../utils/getSelectedNode';
import RichTextEditorFloatingLinkEditorPlugin from './RichTextEditorFloatingLinkEditorPlugin';

type Props = Readonly<{
  floatingAnchorElem: HTMLDivElement | null;
}>;

export default function RichTextEditorLinkActionNode({
  floatingAnchorElem,
}: Props) {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();
  const [isLink, setIsLink] = useState(false);
  const [isOpenLinkEditor, setIsOpenLinkEditor] = useState(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState(false);

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

  return (
    <>
      <RichTextEditorToolbarActionNode
        icon={RiLink}
        isActive={isLink}
        tooltipLabel={intl.formatMessage({
          defaultMessage: 'Link',
          description: 'Label for link',
          id: 'ftK9zU',
        })}
        onClick={() => {
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
        }}
      />
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
