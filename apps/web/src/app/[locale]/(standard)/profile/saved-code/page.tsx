'use client';

import clsx from 'clsx';
import { Highlight, themes } from 'prism-react-renderer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RiDeleteBin6Line, RiInboxLine } from 'react-icons/ri';

import { useToast } from '~/components/global/toasts/useToast';
import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionFormatLabel from '~/components/interviews/questions/metadata/QuestionFormatLabel';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Dialog from '~/components/ui/Dialog';
import EmptyState from '~/components/ui/EmptyState';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';
import {
  JAVASCRIPT_KEY_PATTERN,
  USER_INTERFACE_KEY_PATTERN,
} from '~/components/workspace/common/constants';
import type { Payload as StoredJavaScriptCode } from '~/components/workspace/javascript/JavaScriptCodingWorkspaceCodeStorage';
import type { PayloadV2 as StoredUICode } from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceCodeStorage';

import type { SandpackFile } from '@codesandbox/sandpack-react';

function getFilenameFromPath(path: string): string {
  const parts = path.split('/');

  return parts[parts.length - 1];
}

function CodeViewerDialog({
  isShown,
  onClose,
  savedCode,
}: {
  isShown: boolean;
  onClose: () => void;
  savedCode: SavedCode | null;
}) {
  const [codeData, setCodeData] = useState<
    StoredJavaScriptCode | StoredUICode | null
  >(null);
  const [selectedTab, setSelectedTab] = useState<string>('');

  const getLanguageFromFilename = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    const extensionMap: Record<string, string> = {
      css: 'css',
      html: 'html',
      js: 'javascript',
      json: 'json',
      jsx: 'jsx',
      md: 'markdown',
      svelte: 'html',

      ts: 'typescript',

      tsx: 'tsx',
      vue: 'markup',
    };

    return extensionMap[extension] || 'jsx'; // Default to jsx
  };

  const { files: codeFiles, tabs: fileTabs } = useMemo(() => {
    if (!codeData) {
      return { files: {}, tabs: [] };
    }

    // For JavaScript/TypeScript code
    if ('code' in codeData) {
      return {
        files: { 'code.js': codeData.code },
        tabs: ['code.js'],
      };
    }

    // For UI code with multiple files
    if ('files' in codeData) {
      const fileEntries = Object.entries(codeData.files) as Array<
        [string, SandpackFile]
      >;
      const filenames = fileEntries.map(([path]) => getFilenameFromPath(path));

      const fileContents = fileEntries.reduce(
        (acc, [path, { code }]) => {
          acc[getFilenameFromPath(path)] = code;

          return acc;
        },
        {} as Record<string, string>,
      );

      return { files: fileContents, tabs: filenames };
    }

    return { files: {}, tabs: [] };
  }, [codeData]);

  useEffect(() => {
    if (isShown && savedCode) {
      try {
        const storedData = localStorage.getItem(savedCode.key);

        if (storedData) {
          const parsedData = JSON.parse(storedData);

          setCodeData(parsedData);

          if ('files' in parsedData) {
            const firstKey = Object.keys(parsedData.files)[0];

            setSelectedTab(getFilenameFromPath(firstKey));
          } else {
            setSelectedTab('code.js'); // Code.js is the default tab for v1 javascript code workspace
          }
        }
      } catch (error) {
        console.error('Failed to parse saved code:', error);
      }
    } else {
      setCodeData(null);
      setSelectedTab('');
    }
  }, [isShown, savedCode]);

  const displayCode = useMemo(
    () => codeFiles[selectedTab] || '',
    [codeFiles, selectedTab],
  );
  const language = useMemo(
    () => getLanguageFromFilename(selectedTab),
    [selectedTab],
  );

  return (
    <Dialog
      isShown={isShown}
      scrollable={true}
      title={savedCode?.questionSlug || 'Code Viewer'}
      width="screen-lg"
      onClose={onClose}>
      <div className="flex flex-col gap-y-4">
        {fileTabs.length > 1 && (
          <TabsUnderline
            label="Files"
            size="xs"
            tabs={fileTabs.map((filename) => ({
              label: filename,
              value: filename,
            }))}
            value={selectedTab}
            onSelect={setSelectedTab}
          />
        )}
        <div className="relative">
          <Highlight
            code={displayCode.trim()}
            language={language}
            theme={themes.dracula}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={clsx(
                  className,
                  'h-[40vh] overflow-auto rounded-md p-4',
                )}
                style={{
                  ...style,
                  // @ts-expect-error: CSS variable
                  '--code-bg-color': style.backgroundColor,
                  '--code-color': style.color,
                }}>
                {tokens.map((line, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`line-${i}`}
                    {...getLineProps({ line })}>
                    <span className="mr-4 inline-block w-8 select-none text-right opacity-50">
                      {i + 1}
                    </span>
                    {line.map((token, key) => (
                      <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={`token-${i}-${key}`}
                        {...getTokenProps({ token })}
                      />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    </Dialog>
  );
}

type SavedCode = {
  framework?: string;
  key: string;
  language?: string;
  questionSlug: string;
  type: 'javascript' | 'user-interface';
};

function DeleteAllButton() {
  const intl = useIntl();
  const { showToast } = useToast();
  const [isDeleteAllDialogShown, setIsDeleteAllDialogShown] = useState(false);

  const handleDeleteAll = useCallback(() => {
    const keysToDelete: Array<string> = [];

    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);

      if (!key) {
        continue;
      }

      if (
        key.match(JAVASCRIPT_KEY_PATTERN) ||
        key.match(USER_INTERFACE_KEY_PATTERN)
      ) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => {
      window.localStorage.removeItem(key);
    });

    showToast({
      title: intl.formatMessage({
        defaultMessage: 'All saved code has been deleted',
        description: 'Message shown when all code deletion succeeds',
        id: '5GaoPj',
      }),
      variant: 'success',
    });

    window.location.reload();
  }, [intl, showToast]);

  return (
    <>
      <Button
        addonPosition="start"
        icon={RiDeleteBin6Line}
        label={intl.formatMessage({
          defaultMessage: 'Delete all',
          description: 'Delete all saved code button',
          id: 'tMLx51',
        })}
        size="sm"
        variant="danger"
        onClick={() => setIsDeleteAllDialogShown(true)}
      />
      <Dialog
        isShown={isDeleteAllDialogShown}
        primaryButton={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Delete',
              description: 'Label for button to confirm code deletion',
              id: 'h/0pr/',
            })}
            variant="danger"
            onClick={() => {
              handleDeleteAll();
            }}
          />
        }
        secondaryButton={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description: 'Label for button to cancel action',
              id: 'rfI2w+',
            })}
            variant="secondary"
            onClick={() => setIsDeleteAllDialogShown(false)}
          />
        }
        title={intl.formatMessage({
          defaultMessage: 'Delete all saved code',
          description: 'Title for delete all confirmation dialog',
          id: 'PM7TAj',
        })}
        onClose={() => setIsDeleteAllDialogShown(false)}>
        <Text className="block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="All your saved code will be deleted. This is an irreversible action, are you sure you want to proceed?"
            description="Warning message in delete all confirmation dialog"
            id="6/PYvE"
          />
        </Text>
      </Dialog>
    </>
  );
}

export default function SavedCodePage() {
  const intl = useIntl();
  const { showToast } = useToast();
  const [savedCodes, setSavedCodes] = useState<Array<SavedCode>>([]);
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set());
  const [currentlyViewingCode, setCurrentlyViewingCode] =
    useState<SavedCode | null>(null);
  const [isCodeViewerOpen, setIsCodeViewerOpen] = useState(false);
  const [showDeleteSelectedDialog, setShowDeleteSelectedDialog] =
    useState(false);

  const loadSavedCodes = useCallback(() => {
    const codes: Array<SavedCode> = [];

    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);

      if (!key) {
        continue;
      }

      // Match JavaScript questions
      const jsMatch = key.match(JAVASCRIPT_KEY_PATTERN);

      if (jsMatch) {
        codes.push({
          key,
          language: key.endsWith(':ts') ? 'ts' : 'js',
          questionSlug: jsMatch[1],
          type: 'javascript',
        });
        continue;
      }

      // Match User Interface questions
      const uiMatch = key.match(USER_INTERFACE_KEY_PATTERN);

      if (uiMatch) {
        codes.push({
          framework: uiMatch[1],
          key,
          questionSlug: uiMatch[2],
          type: 'user-interface',
        });
      }
    }

    setSavedCodes(codes);
  }, []);

  useEffect(() => {
    loadSavedCodes();
  }, [loadSavedCodes]);

  const handleToggleSelect = useCallback((key: string) => {
    setSelectedCodes((prev) => {
      const next = new Set(prev);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedCodes(new Set(savedCodes.map((code) => code.key)));
  }, [savedCodes]);

  const handleDeselectAll = useCallback(() => {
    setSelectedCodes(new Set());
  }, []);

  const handleDeleteSelected = useCallback(() => {
    selectedCodes.forEach((key) => {
      window.localStorage.removeItem(key);
    });
    setSelectedCodes(new Set());
    loadSavedCodes();
    showToast({
      title: intl.formatMessage({
        defaultMessage: 'Selected saved code has been deleted',
        description: 'Message shown when selected code deletion succeeds',
        id: '8CGpxx',
      }),
      variant: 'success',
    });
  }, [selectedCodes, loadSavedCodes, intl, showToast]);

  const handleViewCode = useCallback((code: SavedCode) => {
    setCurrentlyViewingCode(code);
    setIsCodeViewerOpen(true);
  }, []);

  const handleCloseCodeViewer = useCallback(() => {
    setIsCodeViewerOpen(false);
    setCurrentlyViewingCode(null);
  }, []);

  if (savedCodes.length === 0) {
    return (
      <EmptyState
        icon={RiInboxLine}
        subtitle={
          <FormattedMessage
            defaultMessage="Your saved code from the editor will appear here."
            description="Subtext when no code is saved."
            id="gg6865"
          />
        }
        title={
          <FormattedMessage
            defaultMessage="No saved code"
            description="Text shown when no code is saved."
            id="KBMxvc"
          />
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-2">
          <Heading
            className={clsx('flex flex-row justify-between', themeBorderColor)}
            level="heading6">
            <FormattedMessage
              defaultMessage="Saved Code"
              description="Heading for list of saved code."
              id="Z7YvHU"
            />
          </Heading>

          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Manage your automatically saved code from the editor locally stored on this device."
              description="Subtext for list of saved code."
              id="J6uo0d"
            />
          </Text>
        </div>
        <div
          className={clsx(
            'flex items-end justify-between gap-4',
            'relative pt-1',
          )}>
          <div className="pl-4">
            <CheckboxInput
              label={intl.formatMessage({
                defaultMessage: 'Select all',
                description: 'Label for checkbox to select all saved code',
                id: 'Nw1F0J',
              })}
              value={
                selectedCodes.size > 0 &&
                selectedCodes.size === savedCodes.length
              }
              onChange={(isChecked) => {
                if (isChecked) {
                  handleSelectAll();
                } else {
                  handleDeselectAll();
                }
              }}
            />
          </div>
          <div className="flex items-center gap-x-2">
            {selectedCodes.size > 0 && (
              <Button
                addonPosition="start"
                icon={RiDeleteBin6Line}
                isDisabled={selectedCodes.size === 0}
                label={intl.formatMessage(
                  {
                    defaultMessage:
                      'Delete {count, plural, one {# item} other {# items}}',
                    description: 'Delete selected saved codes button',
                    id: 'etONbq',
                  },
                  { count: selectedCodes.size },
                )}
                size="sm"
                variant="secondary"
                onClick={() => setShowDeleteSelectedDialog(true)}
              />
            )}
            <DeleteAllButton />
          </div>
        </div>

        <Section>
          <ul
            className={clsx(
              'rounded-md',
              ['border', themeBorderColor],
              ['divide-y', themeDivideColor],
            )}
            role="list">
            {savedCodes.map((code) => (
              <li
                key={code.key}
                className={clsx(
                  'relative px-4 py-3',
                  themeBackgroundCardWhiteOnLightColor,
                  themeBackgroundEmphasized_Hover,
                  'overflow-hidden',
                  'cursor-pointer',
                )}
                onClick={(e) => {
                  // Don't trigger when clicking the checkbox
                  if (
                    (e.target as HTMLElement).closest('.checkbox-container')
                  ) {
                    return;
                  }
                  handleViewCode(code);
                }}>
                <div className="flex items-center gap-x-3">
                  <div className="checkbox-container">
                    <CheckboxInput
                      aria-label={intl.formatMessage(
                        {
                          defaultMessage: 'Select {question} for deletion',
                          description:
                            'Aria label for checkbox to select code for deletion',
                          id: 'CfMmxQ',
                        },
                        { question: code.questionSlug },
                      )}
                      isLabelHidden={true}
                      value={selectedCodes.has(code.key)}
                      onChange={() => handleToggleSelect(code.key)}
                    />
                  </div>
                  <div className="flex grow flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-3">
                    <Text
                      className="line-clamp-2 w-1/2"
                      size="body2"
                      weight="medium">
                      {code.questionSlug}
                    </Text>
                    <div className="flex w-1/4">
                      <QuestionFormatLabel
                        showIcon={true}
                        value={code.type as QuestionFormat}
                      />
                    </div>
                    <div className="flex w-1/4">
                      <Text
                        className="capitalize"
                        color="secondary"
                        size="body2">
                        {code.type === 'javascript'
                          ? code.language?.toUpperCase()
                          : code.framework}
                      </Text>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <CodeViewerDialog
        isShown={isCodeViewerOpen}
        savedCode={currentlyViewingCode}
        onClose={handleCloseCodeViewer}
      />

      <Dialog
        isShown={showDeleteSelectedDialog}
        primaryButton={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Delete',
              description: 'Label for button to confirm selected code deletion',
              id: '3oxN4J',
            })}
            variant="danger"
            onClick={() => {
              handleDeleteSelected();
              setShowDeleteSelectedDialog(false);
            }}
          />
        }
        secondaryButton={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description: 'Label for button to cancel selected code deletion',
              id: 'tOQNw1',
            })}
            variant="secondary"
            onClick={() => setShowDeleteSelectedDialog(false)}
          />
        }
        title={intl.formatMessage({
          defaultMessage: 'Delete selected saved code',
          description: 'Title for delete selected confirmation dialog',
          id: 'EzJjsH',
        })}
        onClose={() => setShowDeleteSelectedDialog(false)}>
        <Text className="block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="The selected saved code will be deleted. This is an irreversible action, are you sure you want to proceed?"
            description="Warning message in delete selected confirmation dialog"
            id="yAgEw6"
          />
        </Text>
      </Dialog>
    </>
  );
}
