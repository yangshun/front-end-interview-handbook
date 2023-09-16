import type { TilesPanelConfig } from '~/react-tiling/types';

export function getUserInterfaceCodingWorkspaceLayout(
  activeFile: string,
  files: ReadonlyArray<string>,
): TilesPanelConfig {
  return {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        activeTabId: 'writeup',
        id: 'left-column',
        tabs: [
          {
            closeable: false,
            id: 'writeup',
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
  activeFile: string,
  files: ReadonlyArray<string>,
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
            activeTabId: 'writeup',
            id: 'left-top',
            tabs: [
              {
                closeable: false,
                id: 'writeup',
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
