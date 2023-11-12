import { TbColumns3 } from 'react-icons/tb';
import { VscDebugConsole } from 'react-icons/vsc';

import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';

import {
  getUserInterfaceCodingWorkspaceLayout,
  getUserInterfaceCodingWorkspaceLayoutAdvanced,
} from './UserInterfaceCodingWorkspaceLayouts';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';
import type { CodingWorkspaceLayoutItem } from '../common/CodingWorkspaceLayoutDialog';
import CodingWorkspaceLayoutDialog from '../common/CodingWorkspaceLayoutDialog';

import { useSandpack } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  frameworkSolutionPath: string;
  isOpen: boolean;
  mode: QuestionUserInterfaceMode;
  onClose: () => void;
}>;

export default function UserInterfaceCodingWorkspaceLayoutButton({
  mode,
  frameworkSolutionPath,
  isOpen,
  onClose,
}: Props) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { dispatch } = useUserInterfaceCodingWorkspaceTilesContext();

  const layouts: ReadonlyArray<CodingWorkspaceLayoutItem> = [
    {
      description: (
        <>
          Three-column layout showing the basic essentials for user interface
          questions.
        </>
      ),
      icon: TbColumns3,
      id: 'three-column',
      name: 'Three-column layout (default)',
      onClick: () => {
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
        onClose();
      },
    },
    {
      description: (
        <>
          Additional tabs shown by default. Suitable for large displays and
          users who are already familiar with the question. Great for questions
          involving multiple files.
        </>
      ),
      icon: VscDebugConsole,
      id: 'coding-focused',
      name: 'Coding-focused',
      onClick: () => {
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
