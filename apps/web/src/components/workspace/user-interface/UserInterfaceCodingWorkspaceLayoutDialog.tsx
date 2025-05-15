'use client';

import { useSandpack } from '@codesandbox/sandpack-react';
import { TbColumns3 } from 'react-icons/tb';
import { VscDebugConsole } from 'react-icons/vsc';

import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import { useIntl } from '~/components/intl';

import type { CodingWorkspaceLayoutItem } from '../common/CodingWorkspaceLayoutDialog';
import CodingWorkspaceLayoutDialog from '../common/CodingWorkspaceLayoutDialog';
import {
  getUserInterfaceCodingWorkspaceLayout,
  getUserInterfaceCodingWorkspaceLayoutAdvanced,
} from './UserInterfaceCodingWorkspaceLayouts';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';

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
  const intl = useIntl();
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { dispatch } = useUserInterfaceCodingWorkspaceTilesContext();

  const layouts: ReadonlyArray<CodingWorkspaceLayoutItem> = [
    {
      description: (
        <>
          {intl.formatMessage({
            defaultMessage:
              'Three-column layout showing the basic essentials for user interface questions.',
            description: 'Coding workspace layout description',
            id: 'Tvygkb',
          })}
        </>
      ),
      icon: TbColumns3,
      id: 'three-column',
      name: intl.formatMessage({
        defaultMessage: 'Three-column layout (default)',
        description: 'Coding workspace layout name',
        id: 'vhHkbS',
      }),
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
          {intl.formatMessage({
            defaultMessage:
              'Additional tabs shown by default. Suitable for large displays and users who are already familiar with the question. Great for questions involving multiple files.',
            description: 'Coding workspace layout description',
            id: '0Dz3oU',
          })}
        </>
      ),
      icon: VscDebugConsole,
      id: 'coding-focused',
      name: intl.formatMessage({
        defaultMessage: 'Coding-focused',
        description: 'Coding workspace layout name',
        id: '38b6CQ',
      }),
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
