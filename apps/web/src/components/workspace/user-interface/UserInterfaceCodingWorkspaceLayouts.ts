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
        id: 'center-column',
        tabs: [
          {
            closeable: false,
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
        id: 'right-column',
        tabs: [
          {
            closeable: false,
            id: 'preview',
          },
          {
            closeable: false,
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
                closeable: false,
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
        direction: 'vertical',
        id: 'right-column',
        items: [
          {
            activeTabId: 'preview',
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
            id: 'right-bottom',
            tabs: [
              {
                closeable: false,
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
