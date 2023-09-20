import { VscLayout } from 'react-icons/vsc';

import DropdownMenu from '~/components/ui/DropdownMenu';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import {
  getJavaScriptCodingWorkspaceLayout,
  getJavaScriptCodingWorkspaceLayoutGrid,
  getJavaScriptCodingWorkspaceLayoutThreeColumns,
} from './JavaScriptCodingWorkspaceLayouts';

import { useSandpack } from '@codesandbox/sandpack-react';

export default function JavaScriptCodingWorkspaceLayoutButton() {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { dispatch } = useTilesContext();
  const { workspace } = useJavaScriptCodingWorkspaceContext();

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
          label: 'Three-column layout',
          value: 'three-column',
        },
        {
          label: 'Grid layout',
          value: 'grid',
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
                  panels: getJavaScriptCodingWorkspaceLayout(
                    activeFile,
                    visibleFiles,
                  ),
                },
                type: 'layout-change',
              });
            }
            if (value === 'three-column') {
              dispatch({
                payload: {
                  panels: getJavaScriptCodingWorkspaceLayoutThreeColumns(
                    activeFile,
                    visibleFiles,
                  ),
                },
                type: 'layout-change',
              });
            }
            if (value === 'grid') {
              dispatch({
                payload: {
                  panels: getJavaScriptCodingWorkspaceLayoutGrid(
                    workspace.main,
                    workspace.run,
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
