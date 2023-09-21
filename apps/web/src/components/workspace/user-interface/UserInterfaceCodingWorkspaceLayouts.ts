import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';

import type { TilesPanelConfig } from '~/react-tiling/types';

// TODO: improve id type-safety.
export function getUserInterfaceCodingWorkspaceLayout(
  mode: QuestionUserInterfaceMode,
  activeFile: string,
  files: ReadonlyArray<string>,
  solutionHref: string,
): TilesPanelConfig {
  return {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        activeTabId: mode === 'practice' ? 'description' : 'solution',
        defaultSize: 35,
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
        ],
        type: 'item',
      },
      {
        activeTabId: activeFile,
        defaultSize: 40,
        id: 'center-column',
        tabs: [
          {
            closeable: true,
            id: 'file_explorer',
          },
          ...files.map((file) => ({
            allowOverflow: true,
            closeable: file !== activeFile,
            id: file,
          })),
        ],
        type: 'item',
      },
      {
        activeTabId: 'preview',
        defaultSize: 25,
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
): TilesPanelConfig {
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
            ],
            type: 'item',
          },
          {
            activeTabId: 'file_explorer',
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
        activeTabId: activeFile,
        defaultSize: 40,
        id: 'center-column',
        tabs: [
          ...files.map((file) => ({
            allowOverflow: true,
            closeable: true,
            id: file,
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
