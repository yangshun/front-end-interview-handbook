import { VscLayout } from 'react-icons/vsc';

import DropdownMenu from '~/components/ui/DropdownMenu';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import {
  getJavaScriptCodingWorkspaceLayoutGrid,
  getJavaScriptCodingWorkspaceLayoutThreeColumns,
  getJavaScriptCodingWorkspaceLayoutTwoColumns,
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
          label: 'Two-column layout',
          value: 'two-column',
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
            if (value === 'two-column') {
              return dispatch({
                payload: {
                  panels: getJavaScriptCodingWorkspaceLayoutTwoColumns(
                    activeFile,
                    visibleFiles,
                  ),
                },
                type: 'layout-change',
              });
            }
            if (value === 'three-column') {
              return dispatch({
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
              return dispatch({
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
