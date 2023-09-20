import { useState } from 'react';
import { RiLayout2Line, RiLayoutGridLine } from 'react-icons/ri';
import { TbColumns3 } from 'react-icons/tb';
import { VscLayout } from 'react-icons/vsc';

import Button from '~/components/ui/Button';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import {
  getJavaScriptCodingWorkspaceLayoutGrid,
  getJavaScriptCodingWorkspaceLayoutThreeColumns,
  getJavaScriptCodingWorkspaceLayoutTwoColumns,
} from './JavaScriptCodingWorkspaceLayouts';
import type { CodingWorkspaceLayoutItem } from '../common/CodingWorkspaceLayoutDialog';
import CodingWorkspaceLayoutDialog from '../common/CodingWorkspaceLayoutDialog';

import { useSandpack } from '@codesandbox/sandpack-react';

export default function JavaScriptCodingWorkspaceLayoutButton() {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { dispatch } = useTilesContext();
  const { workspace } = useJavaScriptCodingWorkspaceContext();
  const [isOpen, setIsOpen] = useState(false);

  const layouts: ReadonlyArray<CodingWorkspaceLayoutItem> = [
    {
      description: (
        <>
          Three-column layout showing the basic essentials for JavaScript
          questions.
        </>
      ),
      icon: TbColumns3,
      id: 'three-column',
      name: 'Three-column layout (default)',
      onClick: () => {
        dispatch({
          payload: {
            panels: getJavaScriptCodingWorkspaceLayoutThreeColumns(
              activeFile,
              visibleFiles,
            ),
          },
          type: 'layout-change',
        });
        setIsOpen(false);
      },
    },
    {
      description: (
        <>
          Classic layout that prioritizes readability of question description
          and solution.
        </>
      ),
      icon: RiLayout2Line,
      id: 'two-column',
      name: 'Two-column layout',
      onClick: () => {
        dispatch({
          payload: {
            panels: getJavaScriptCodingWorkspaceLayoutTwoColumns(
              activeFile,
              visibleFiles,
            ),
          },
          type: 'layout-change',
        });
        setIsOpen(false);
      },
    },
    {
      description: (
        <>Additional tabs shown by default. Suitable for large displays.</>
      ),
      icon: RiLayoutGridLine,
      id: 'grid',
      name: 'Grid layout',
      onClick: () => {
        dispatch({
          payload: {
            panels: getJavaScriptCodingWorkspaceLayoutGrid(
              workspace.main,
              workspace.run,
            ),
          },
          type: 'layout-change',
        });
        setIsOpen(false);
      },
    },
  ];

  return (
    <div>
      <Button
        addonPosition="start"
        icon={VscLayout}
        label="Layout"
        size="xs"
        variant="secondary"
        onClick={() => setIsOpen(true)}
      />
      <CodingWorkspaceLayoutDialog
        isShown={isOpen}
        layouts={layouts}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}
