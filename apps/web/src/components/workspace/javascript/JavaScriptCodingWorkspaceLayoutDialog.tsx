'use client';

import { RiLayout2Line, RiLayoutGridLine } from 'react-icons/ri';
import { TbColumns3 } from 'react-icons/tb';

import { useIntl } from '~/components/intl';

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
  const intl = useIntl();
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { dispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const { workspace } = useJavaScriptCodingWorkspaceContext();

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
