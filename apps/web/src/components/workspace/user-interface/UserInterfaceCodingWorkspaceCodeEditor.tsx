import clsx from 'clsx';
import { useCallback } from 'react';
import { RiFolder3Line } from 'react-icons/ri';

import CodingWorkspaceEditorShortcutsButton from '~/components/questions/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/questions/editor/CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from '~/components/questions/editor/CodingWorkspaceThemeSelect';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeDivideColor } from '~/components/ui/theme';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import { useSandpack } from '@codesandbox/sandpack-react';

export default function UserInterfaceCodingWorkspaceCodeEditor({
  filePath,
  showNotSavedBanner,
}: Readonly<{
  filePath: string;
  showNotSavedBanner: boolean;
}>) {
  const { sandpack } = useSandpack();
  const { files, updateFile, setActiveFile, resetFile } = sandpack;
  const { dispatch } = useTilesContext();

  const onFocus = useCallback(() => {
    setActiveFile(filePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  return (
    <div
      className={clsx('flex w-full flex-col', ['divide-y', themeDivideColor])}>
      <div className="flex items-center justify-between gap-x-2 px-3 py-1.5">
        <div className="-ml-1">
          <Button
            icon={RiFolder3Line}
            isLabelHidden={true}
            label="File explorer"
            size="xs"
            tooltip="File explorer"
            variant="tertiary"
            onClick={() => {
              dispatch({
                payload: {
                  tabId: 'file_explorer',
                },
                type: 'tab-set-active',
              });
            }}
          />
        </div>
        <div className="-mr-2 flex items-center gap-x-1.5">
          <CodingWorkspaceThemeSelect />
          <CodingWorkspaceEditorShortcutsButton />
          <CodingWorkspaceResetButton
            onClick={() => {
              if (!confirm('Reset code to original? Changes will be lost!')) {
                return;
              }
              resetFile(filePath);
            }}
          />
        </div>
      </div>
      {showNotSavedBanner && (
        <Text
          className={clsx('bg-brand-dark p-2 text-center')}
          color="light"
          size="body3">
          You are viewing the solution code. Changes will not be saved.
        </Text>
      )}
      <MonacoCodeEditor
        filePath={filePath}
        value={files[filePath].code}
        onChange={(val) => {
          updateFile(filePath, val ?? '');
        }}
        onFocus={onFocus}
      />
    </div>
  );
}
