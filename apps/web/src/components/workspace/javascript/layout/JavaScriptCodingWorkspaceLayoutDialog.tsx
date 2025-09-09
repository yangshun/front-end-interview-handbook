'use client';

import { RiLayout2Line, RiLayoutGridLine } from 'react-icons/ri';
import { TbColumns3 } from 'react-icons/tb';

import { useIntl } from '~/components/intl';
import type { CodingWorkspaceLayoutItem } from '~/components/workspace/common/CodingWorkspaceLayoutDialog';
import CodingWorkspaceLayoutDialog from '~/components/workspace/common/CodingWorkspaceLayoutDialog';
import useJavaScriptCodingWorkspaceTilesContext from '~/components/workspace/javascript/hooks/useJavaScriptCodingWorkspaceTilesContext';
import { useJavaScriptCodingWorkspaceSelector } from '~/components/workspace/javascript/store/hooks';

import {
  getJavaScriptCodingWorkspaceLayoutGrid,
  getJavaScriptCodingWorkspaceLayoutThreeColumns,
  getJavaScriptCodingWorkspaceLayoutTwoColumns,
} from './JavaScriptCodingWorkspaceLayouts';

type Props = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export default function JavaScriptCodingWorkspaceLayoutButton({
  isOpen,
  onClose,
}: Props) {
  const intl = useIntl();
  const activeFile = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.activeFile,
  );
  const visibleFiles = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.visibleFiles,
  );
  const { workspace } = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace,
  ).question;
  const { tilesDispatch } = useJavaScriptCodingWorkspaceTilesContext();

  const layouts: ReadonlyArray<CodingWorkspaceLayoutItem> = [
    {
      description: (
        <>
          {intl.formatMessage({
            defaultMessage:
              'Classic layout that prioritizes readability of question description and solution.',
            description: 'Coding workspace layout description',
            id: 'Bhd/Mm',
          })}
        </>
      ),
      icon: RiLayout2Line,
      id: 'two-column',
      name: intl.formatMessage({
        defaultMessage: 'Two-column layout (default)',
        description: 'Coding workspace layout name',
        id: 'koARxB',
      }),
      onClick: () => {
        tilesDispatch({
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
          {intl.formatMessage({
            defaultMessage:
              'Three-column layout showing the basic essentials for JavaScript questions.',
            description: 'Coding workspace layout description',
            id: '9tiGzA',
          })}
        </>
      ),
      icon: TbColumns3,
      id: 'three-column',
      name: intl.formatMessage({
        defaultMessage: 'Three-column layout',
        description: 'Coding workspace layout name',
        id: 'pC7+Px',
      }),
      onClick: () => {
        tilesDispatch({
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
        <>
          {intl.formatMessage({
            defaultMessage:
              'Additional tabs shown by default. Suitable for large displays.',
            description: 'Coding workspace layout description',
            id: 'xpm/Le',
          })}
        </>
      ),
      icon: RiLayoutGridLine,
      id: 'grid',
      name: intl.formatMessage({
        defaultMessage: 'Grid layout',
        description: 'Coding workspace layout name',
        id: 'n4ZC2Q',
      }),
      onClick: () => {
        tilesDispatch({
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
