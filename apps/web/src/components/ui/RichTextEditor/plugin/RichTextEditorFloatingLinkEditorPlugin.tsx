import {
  $createLinkNode,
  $isAutoLinkNode,
  $isLinkNode,
  TOGGLE_LINK_COMMAND,
  toggleLink,
} from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $findMatchingParent, mergeRegister } from '@lexical/utils';
import clsx from 'clsx';
import type { BaseSelection, LexicalEditor } from 'lexical';
import {
  $createTextNode,
  $getSelection,
  $isLineBreakNode,
  $isRangeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import type { Dispatch } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { createPortal } from 'react-dom';
import {
  RiCheckboxCircleFill,
  RiDeleteBin6Line,
  RiPencilLine,
} from 'react-icons/ri';
import { useOnClickOutside } from 'usehooks-ts';

import { urlAddHttpsIfMissing } from '~/lib/urlValidation';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import TextInput from '~/components/ui/TextInput';
import {
  themeBackgroundColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

import { textVariants } from '../../Text';
import { getSelectedNode } from '../utils/getSelectedNode';
import { setFloatingElemPositionForLinkEditor } from '../utils/setFloatingElemPositionForLinkEditor';
import { sanitizeUrl, validateUrl } from '../utils/url';

function FloatingLinkEditor({
  anchorElem,
  editor,
  isLinkEditMode,
  isOpenLinkEditor,
  setIsLinkEditMode,
  setIsOpenLinkEditor,
}: {
  anchorElem: HTMLElement;
  editor: LexicalEditor;
  isLinkEditMode: boolean;
  isOpenLinkEditor: boolean;
  setIsLinkEditMode: Dispatch<boolean>;
  setIsOpenLinkEditor: Dispatch<boolean>;
}): JSX.Element {
  const intl = useIntl();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [linkUrl, setLinkUrl] = useState('');
  const [editedLinkUrl, setEditedLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [lastSelection, setLastSelection] = useState<BaseSelection | null>(
    null,
  );

  const handleCloseLinkEditor = useCallback(() => {
    setEditedLinkUrl('');
    setIsLinkEditMode(false);
    setIsOpenLinkEditor(false);
    setLinkText('');
  }, [setIsLinkEditMode, setIsOpenLinkEditor]);

  useOnClickOutside(editorRef, handleCloseLinkEditor);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const linkParent = $findMatchingParent(node, $isLinkNode);

      if (linkParent) {
        setLinkUrl(linkParent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
      if (isLinkEditMode) {
        setEditedLinkUrl(linkUrl);
        if (linkParent || $isLinkNode(node)) {
          setLinkText(
            linkParent ? linkParent?.getTextContent() : node.getTextContent(),
          );
        } else {
          // Get link text via anchor and focus since no specific node is present
          const { anchor, focus } = selection;
          const isBackward = selection.isBackward();
          const text = node.getTextContent();

          setLinkText(
            isBackward
              ? text.slice(focus.offset, anchor.offset)
              : text.slice(anchor.offset, focus.offset),
          );
        }
      }
    }

    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const { activeElement } = document;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();

    if (
      selection !== null &&
      nativeSelection !== null &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode) &&
      editor.isEditable()
    ) {
      const domRect: DOMRect | undefined =
        nativeSelection.focusNode?.parentElement?.getBoundingClientRect();

      if (domRect) {
        domRect.y += 40;
        setFloatingElemPositionForLinkEditor(domRect, editorElem, anchorElem);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement !== inputRef.current) {
      if (rootElement !== null) {
        setFloatingElemPositionForLinkEditor(null, editorElem, anchorElem);
      }
      setLastSelection(null);
      setIsLinkEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [anchorElem, editor, setIsLinkEditMode, isLinkEditMode, linkUrl]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        updateLinkEditor();
      });
    };

    window.addEventListener('resize', update);

    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update);
    }

    return () => {
      window.removeEventListener('resize', update);

      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update);
      }
    };
  }, [anchorElem.parentElement, editor, updateLinkEditor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();

          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isOpenLinkEditor) {
            handleCloseLinkEditor();

            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
  }, [editor, updateLinkEditor, isOpenLinkEditor, handleCloseLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isLinkEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLinkEditMode, isOpenLinkEditor]);

  function monitorInputInteraction(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLinkSubmission();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setEditedLinkUrl('');
      setLinkText('');
      setIsLinkEditMode(false);
    }
  }

  function handleLinkSubmission() {
    if (lastSelection === null) {
      return;
    }

    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const node = getSelectedNode(selection);
        const parent = node.getParent();

        if (!editedLinkUrl) {
          if ($isLinkNode(parent) || $isLinkNode(node)) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
          }

          return;
        }

        const finalUrl = validateUrl(editedLinkUrl)
          ? sanitizeUrl(editedLinkUrl)
          : urlAddHttpsIfMissing(editedLinkUrl);

        if ($isLinkNode(parent) || $isLinkNode(node)) {
          // If link node already present
          const format = node.getFormat();
          const linkNode = $createLinkNode(finalUrl).append(
            $createTextNode(linkText || editedLinkUrl).setFormat(format),
          );

          node.replace(linkNode);
          linkNode.select();
        } else {
          // If link node is not present
          const { anchor, focus } = selection;

          selection.insertText(linkText || editedLinkUrl);

          anchor.offset -= linkText.length;
          focus.offset = anchor.offset + linkText.length;
          toggleLink(finalUrl);
        }
      }
    });

    setEditedLinkUrl('');
    setLinkText('');
    setIsLinkEditMode(false);
  }

  return (
    <div ref={editorRef} className="absolute left-0 top-0">
      {!isOpenLinkEditor ? null : (
        <div
          className={clsx(
            'flex items-center',
            isLinkEditMode ? 'gap-1 p-2' : 'gap-4 px-3 py-1',
            'max-w-[400px]',
            'rounded',
            'z-popover',
            themeBackgroundColor,
            ['border', themeBorderElementColor],
          )}>
          {isLinkEditMode ? (
            <>
              <div
                className="flex flex-col gap-2"
                onKeyDown={monitorInputInteraction}>
                <TextInput
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'Link text',
                    description: 'Label for link title',
                    id: 'YRIsJs',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter link text',
                    description: 'Placeholder for link title',
                    id: '+xOnIx',
                  })}
                  value={linkText}
                  onChange={(value) => setLinkText(value)}
                />
                <TextInput
                  ref={inputRef}
                  isLabelHidden={true}
                  label={intl.formatMessage({
                    defaultMessage: 'Link URL',
                    description: 'Label for link URL',
                    id: '74BSpM',
                  })}
                  placeholder="https://example.com"
                  value={editedLinkUrl}
                  onChange={(value) => {
                    setEditedLinkUrl(value);
                  }}
                />
              </div>
              <div>
                <Button
                  icon={RiCheckboxCircleFill}
                  isLabelHidden={true}
                  label="Done"
                  variant="tertiary"
                  onClick={handleLinkSubmission}
                />
              </div>
            </>
          ) : (
            <>
              <Anchor
                className={textVariants({
                  className: 'grow truncate',
                  color: 'inherit',
                  size: 'body2',
                })}
                href={linkUrl ? sanitizeUrl(linkUrl) : undefined}
                rel="noopener noreferrer"
                target="_blank"
                variant="flat">
                {linkUrl}
              </Anchor>
              <div className="-mr-2 shrink-0">
                <Button
                  icon={RiPencilLine}
                  isLabelHidden={true}
                  label="Edit link"
                  variant="tertiary"
                  onClick={() => {
                    setEditedLinkUrl(linkUrl);
                    setIsLinkEditMode(true);
                  }}
                />
                <Button
                  icon={RiDeleteBin6Line}
                  isLabelHidden={true}
                  label="Delete link"
                  variant="tertiary"
                  onClick={() => {
                    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                  }}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function useFloatingLinkEditorToolbar(
  editor: LexicalEditor,
  anchorElem: HTMLElement,
  isLinkEditMode: boolean,
  setIsLinkEditMode: Dispatch<boolean>,
  isOpenLinkEditor: boolean,
  setIsOpenLinkEditor: Dispatch<boolean>,
): JSX.Element | null {
  const [activeEditor, setActiveEditor] = useState(editor);

  useEffect(() => {
    function updateToolbar() {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const focusNode = getSelectedNode(selection);
        const focusLinkNode = $findMatchingParent(focusNode, $isLinkNode);
        const focusAutoLinkNode = $findMatchingParent(
          focusNode,
          $isAutoLinkNode,
        );

        if (!(focusLinkNode || focusAutoLinkNode)) {
          setIsOpenLinkEditor(false);

          return;
        }

        const badNode = selection.getNodes().find((node) => {
          const linkNode = $findMatchingParent(node, $isLinkNode);
          const autoLinkNode = $findMatchingParent(node, $isAutoLinkNode);

          if (
            !linkNode?.is(focusLinkNode) &&
            !autoLinkNode?.is(focusAutoLinkNode) &&
            !linkNode &&
            !autoLinkNode &&
            !$isLineBreakNode(node)
          ) {
            return node;
          }
        });

        if (!badNode) {
          setIsOpenLinkEditor(true);
        } else {
          setIsOpenLinkEditor(false);
        }
      }
    }

    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          setActiveEditor(newEditor);

          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        CLICK_COMMAND,
        (payload) => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const linkNode = $findMatchingParent(node, $isLinkNode);

            if ($isLinkNode(linkNode) && (payload.metaKey || payload.ctrlKey)) {
              window.open(linkNode.getURL(), '_blank');

              return true;
            }
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, setIsOpenLinkEditor]);

  return createPortal(
    <FloatingLinkEditor
      anchorElem={anchorElem}
      editor={activeEditor}
      isLinkEditMode={isLinkEditMode}
      isOpenLinkEditor={isOpenLinkEditor}
      setIsLinkEditMode={setIsLinkEditMode}
      setIsOpenLinkEditor={setIsOpenLinkEditor}
    />,
    anchorElem,
  );
}

export default function RichTextEditorFloatingLinkEditorPlugin({
  anchorElem = document.body,
  isLinkEditMode,
  isOpenLinkEditor,
  setIsLinkEditMode,
  setIsOpenLinkEditor,
}: {
  anchorElem?: HTMLElement;
  isLinkEditMode: boolean;
  isOpenLinkEditor: boolean;
  setIsLinkEditMode: Dispatch<boolean>;
  setIsOpenLinkEditor: Dispatch<boolean>;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  return useFloatingLinkEditorToolbar(
    editor,
    anchorElem,
    isLinkEditMode,
    setIsLinkEditMode,
    isOpenLinkEditor,
    setIsOpenLinkEditor,
  );
}
