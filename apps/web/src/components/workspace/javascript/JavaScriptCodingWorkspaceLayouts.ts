import type { TilesPanelConfig } from '~/react-tiling/types';

export function getJavaScriptCodingWorkspaceLayoutTwoColumns(
  activeFile: string,
  files: ReadonlyArray<string>,
): TilesPanelConfig<string> {
  return {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        activeTabId: 'description',
        collapsible: true,
        id: 'left-column',
        tabs: [
          {
            closeable: false,
            id: 'description',
          },
          {
            closeable: false,
            id: 'solution',
          },
          {
            closeable: false,
            id: 'test_cases',
          },
        ],
        type: 'item',
      },
      {
        direction: 'vertical',
        id: 'right-column',
        items: [
          {
            activeTabId: activeFile,
            collapsible: true,
            defaultSize: 95,
            id: 'right-top',
            tabs: [
              ...files.map((file) => ({
                allowOverflow: true,
                closeable: false,
                id: file,
              })),
            ],
            type: 'item',
          },
          {
            activeTabId: 'run_tests',
            collapsed: true,
            collapsible: true,
            defaultSize: 5,
            id: 'right-bottom',
            tabs: [
              {
                closeable: false,
                id: 'run_tests',
              },
              {
                closeable: false,
                id: 'console',
              },
              {
                closeable: false,
                id: 'submit',
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

export function getJavaScriptCodingWorkspaceLayoutThreeColumns(
  activeFile: string,
  files: ReadonlyArray<string>,
): TilesPanelConfig<string> {
  return {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        activeTabId: 'description',
        collapsible: true,
        defaultSize: 35,
        id: 'left-column',
        tabs: [
          {
            closeable: false,
            id: 'description',
          },
          {
            closeable: false,
            id: 'solution',
          },
          {
            closeable: false,
            id: 'test_cases',
          },
        ],
        type: 'item',
      },
      {
        activeTabId: activeFile,
        collapsible: true,
        defaultSize: 35,
        id: 'center-column',
        tabs: [
          ...files.map((file) => ({
            allowOverflow: true,
            closeable: false,
            id: file,
          })),
        ],
        type: 'item',
      },
      {
        activeTabId: 'run_tests',
        collapsible: true,
        defaultSize: 30,
        id: 'right-column',
        tabs: [
          {
            closeable: false,
            id: 'run_tests',
          },
          {
            closeable: false,
            id: 'console',
          },
          {
            closeable: false,
            id: 'submit',
          },
        ],
        type: 'item',
      },
    ],
    type: 'group',
  } as const;
}

export function getJavaScriptCodingWorkspaceLayoutGrid(
  mainFile: string,
  runFile: string,
): TilesPanelConfig {
  return {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        activeTabId: 'description',
        collapsible: true,
        id: 'left-column',
        tabs: [
          {
            closeable: false,
            id: 'description',
          },
          {
            closeable: false,
            id: 'solution',
          },
          {
            closeable: false,
            id: 'test_cases',
          },
        ],
        type: 'item',
      },
      {
        direction: 'vertical',
        id: 'center-column',
        items: [
          {
            activeTabId: mainFile,
            collapsible: true,
            id: 'center-top',
            tabs: [
              {
                allowOverflow: true,
                closeable: false,
                id: mainFile,
              },
            ],
            type: 'item',
          },
          {
            activeTabId: 'console',
            collapsible: true,
            id: 'center-bottom',
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
      {
        direction: 'vertical',
        id: 'right-column',
        items: [
          {
            activeTabId: runFile,
            collapsible: true,
            id: 'right-top',
            tabs: [
              {
                allowOverflow: true,
                closeable: false,
                id: runFile,
              },
            ],
            type: 'item',
          },
          {
            activeTabId: 'run_tests',
            collapsible: true,
            id: 'right-bottom',
            tabs: [
              {
                closeable: false,
                id: 'run_tests',
              },
              {
                closeable: false,
                id: 'submit',
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
