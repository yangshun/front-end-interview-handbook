import { useState } from 'react';
import { TbColumns3 } from 'react-icons/tb';
import { VscDebugConsole, VscLayout } from 'react-icons/vsc';

import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import Button from '~/components/ui/Button';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import {
  getUserInterfaceCodingWorkspaceLayout,
  getUserInterfaceCodingWorkspaceLayoutAdvanced,
} from './UserInterfaceCodingWorkspaceLayouts';
import type { CodingWorkspaceLayoutItem } from '../common/CodingWorkspaceLayoutDialog';
import CodingWorkspaceLayoutDialog from '../common/CodingWorkspaceLayoutDialog';

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
  const [isOpen, setIsOpen] = useState(false);

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
        setIsOpen(false);
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
