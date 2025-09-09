'use client';

import { TbColumns3 } from 'react-icons/tb';
import { VscDebugConsole } from 'react-icons/vsc';

import { useIntl } from '~/components/intl';
import type { CodingWorkspaceLayoutItem } from '~/components/workspace/common/CodingWorkspaceLayoutDialog';
import CodingWorkspaceLayoutDialog from '~/components/workspace/common/CodingWorkspaceLayoutDialog';

import { useUserInterfaceCodingWorkspaceSelector } from './store/hooks';
import {
  getUserInterfaceCodingWorkspaceLayout,
  getUserInterfaceCodingWorkspaceLayoutAdvanced,
} from './UserInterfaceCodingWorkspaceLayouts';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';

type Props = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export default function UserInterfaceCodingWorkspaceLayoutButton({
  isOpen,
  onClose,
}: Props) {
  const intl = useIntl();
  const activeFile = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.activeFile,
  );
  const visibleFiles = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.visibleFiles,
  );
  const { tilesDispatch } = useUserInterfaceCodingWorkspaceTilesContext();

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
        tilesDispatch({
          payload: {
            panels: getUserInterfaceCodingWorkspaceLayout(
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
        tilesDispatch({
          payload: {
            panels: getUserInterfaceCodingWorkspaceLayoutAdvanced(
              activeFile,
              visibleFiles,
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
