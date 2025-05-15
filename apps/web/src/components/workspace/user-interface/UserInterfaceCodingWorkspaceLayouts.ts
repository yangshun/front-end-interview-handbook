import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';

import type { TilesPanelConfig } from '~/react-tiling/types';

import { codingWorkspaceTabFileId } from '../common/tabs/codingWorkspaceTabId';
import type { UserInterfaceCodingWorkspaceTabsType } from './UserInterfaceCodingWorkspaceTypes';

export function getUserInterfaceCodingWorkspaceLayout(
  mode: QuestionUserInterfaceMode,
  activeFile: string,
  files: ReadonlyArray<string>,
  solutionHref: string,
): TilesPanelConfig<UserInterfaceCodingWorkspaceTabsType> {
  return {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        activeTabId: mode === 'practice' ? 'description' : 'solution',
        collapsible: true,
        defaultSize: 30,
        id: 'left-column',
        tabs: [
          {
            closeable: false,
            id: 'description',
          },
          {
            closeable: false,
            href: mode === 'practice' ? solutionHref : undefined,
            id: 'solution',
          },
          {
            closeable: false,
            id: 'versions',
          },
        ],
        type: 'item',
      },
      {
        activeTabId: codingWorkspaceTabFileId(activeFile),
        collapsible: true,
        defaultSize: 40,
        id: 'center-column',
        tabs: [
          {
            closeable: true,
            id: 'file_explorer',
          },
          ...files.map((file) => ({
            allowOverflow: true,
            closeable: true,
            id: codingWorkspaceTabFileId(file),
          })),
        ],
        type: 'item',
      },
      {
        activeTabId: 'preview',
        collapsible: true,
        defaultSize: 30,
        id: 'right-column',
        tabs: [
          {
            closeable: false,
            id: 'preview',
          },
          {
            closeable: true,
            id: 'console',
          },
        ],
        type: 'item',
      },
    ],
    type: 'group',
  } as const;
}

export function getUserInterfaceCodingWorkspaceLayoutAdvanced(
  mode: QuestionUserInterfaceMode,
  activeFile: string,
  files: ReadonlyArray<string>,
  solutionHref: string,
): TilesPanelConfig<UserInterfaceCodingWorkspaceTabsType> {
  return {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        defaultSize: 35,
        direction: 'vertical',
        id: 'left-column',
        items: [
          {
            activeTabId: mode === 'practice' ? 'description' : 'solution',
            collapsible: true,
            id: 'left-top',
            tabs: [
              {
                closeable: false,
                id: 'description',
              },
              {
                closeable: false,
                href: mode === 'practice' ? solutionHref : undefined,
                id: 'solution',
              },
              {
                closeable: false,
                id: 'versions',
              },
            ],
            type: 'item',
          },
          {
            activeTabId: 'file_explorer',
            collapsible: true,
            id: 'left-bottom',
            tabs: [
              {
                closeable: true,
                id: 'file_explorer',
              },
            ],
            type: 'item',
          },
        ],
        type: 'group',
      },
      {
        activeTabId: codingWorkspaceTabFileId(activeFile),
        collapsible: true,
        defaultSize: 40,
        id: 'center-column',
        tabs: [
          ...files.map((file) => ({
            allowOverflow: true,
            closeable: true,
            id: codingWorkspaceTabFileId(file),
          })),
        ],
        type: 'item',
      },
      {
        defaultSize: 25,
        direction: 'vertical',
        id: 'right-column',
        items: [
          {
            activeTabId: 'preview',
            collapsible: true,
            defaultSize: 60,
            id: 'right-top',
            tabs: [
              {
                closeable: false,
                id: 'preview',
              },
            ],
            type: 'item',
          },
          {
            activeTabId: 'console',
            collapsible: true,
            defaultSize: 40,
            id: 'right-bottom',
            tabs: [
              {
                closeable: true,
                id: 'console',
              },
            ],
            type: 'item',
          },
        ],
        type: 'group',
      },
    ],
    type: 'group',
  } as const;
}
