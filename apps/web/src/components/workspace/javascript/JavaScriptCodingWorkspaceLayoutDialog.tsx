import { RiLayout2Line, RiLayoutGridLine } from 'react-icons/ri';
import { TbColumns3 } from 'react-icons/tb';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import {
  getJavaScriptCodingWorkspaceLayoutGrid,
  getJavaScriptCodingWorkspaceLayoutThreeColumns,
  getJavaScriptCodingWorkspaceLayoutTwoColumns,
} from './JavaScriptCodingWorkspaceLayouts';
import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';
import type { CodingWorkspaceLayoutItem } from '../common/CodingWorkspaceLayoutDialog';
import CodingWorkspaceLayoutDialog from '../common/CodingWorkspaceLayoutDialog';

import { useSandpack } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export default function JavaScriptCodingWorkspaceLayoutButton({
  isOpen,
  onClose,
}: Props) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { dispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const { workspace } = useJavaScriptCodingWorkspaceContext();

  const layouts: ReadonlyArray<CodingWorkspaceLayoutItem> = [
    {
      description: (
        <>
          Classic layout that prioritizes readability of question description
          and solution.
        </>
      ),
      icon: RiLayout2Line,
      id: 'two-column',
      name: 'Two-column layout (default)',
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
        onClose();
      },
    },
    {
      description: (
        <>
          Three-column layout showing the basic essentials for JavaScript
          questions.
        </>
      ),
      icon: TbColumns3,
      id: 'three-column',
      name: 'Three-column layout',
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
        onClose();
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
        onClose();
      },
    },
  ];

  return (
    <CodingWorkspaceLayoutDialog
      isShown={isOpen}
      layouts={layouts}
      onClose={onClose}
    />
  );
}
