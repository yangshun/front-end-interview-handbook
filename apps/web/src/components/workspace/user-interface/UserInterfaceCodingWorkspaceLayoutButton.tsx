import { VscLayout } from 'react-icons/vsc';

import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import {
  getUserInterfaceCodingWorkspaceLayout,
  getUserInterfaceCodingWorkspaceLayoutAdvanced,
} from './UserInterfaceCodingWorkspaceLayouts';

import { useSandpack } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  frameworkSolutionPath: string;
  mode: QuestionUserInterfaceMode;
}>;

export default function UserInterfaceCodingWorkspaceLayoutButton({
  mode,
  frameworkSolutionPath,
}: Props) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { dispatch } = useTilesContext();

  return (
    <DropdownMenu
      align="end"
      icon={VscLayout}
      isLabelHidden={true}
      label="Layout"
      size="xs">
      {[
        {
          label: 'Default layout',
          value: 'default',
        },
        {
          label: 'Coding-focused',
          value: 'coding-focused',
        },
      ].map(({ label, value }) => (
        <DropdownMenu.Item
          key={value}
          isSelected={false}
          label={label}
          onClick={() => {
            if (value === 'default') {
              dispatch({
                payload: {
                  panels: getUserInterfaceCodingWorkspaceLayout(
                    mode,
                    activeFile,
                    visibleFiles,
                    frameworkSolutionPath,
                  ),
                },
                type: 'layout-change',
              });
            }
            if (value === 'coding-focused') {
              dispatch({
                payload: {
                  panels: getUserInterfaceCodingWorkspaceLayoutAdvanced(
                    mode,
                    activeFile,
                    visibleFiles,
                    frameworkSolutionPath,
                  ),
                },
                type: 'layout-change',
              });
            }
          }}
        />
      ))}
    </DropdownMenu>
  );
}
