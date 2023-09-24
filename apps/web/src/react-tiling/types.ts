import type { PanelGroupProps, PanelProps } from 'react-resizable-panels';

export type TilesPanelItemTab = Readonly<{
  allowOverflow?: boolean;
  closeable: boolean;
  href?: string;
  id: string;
}>;

export type TilesPanelItemConfig = Readonly<{
  activeTabId: string | null;
  collapsed?: boolean;
  collapsible?: PanelProps['collapsible'];
  defaultSize?: PanelProps['defaultSize'];
  fullScreen?: boolean;
  id: string;
  tabs: ReadonlyArray<TilesPanelItemTab>;
  type: 'item';
}>;

export type TilesPanelGroupConfig = Readonly<{
  defaultSize?: PanelProps['defaultSize'];
  direction: PanelGroupProps['direction'];
  id: string;
  items: ReadonlyArray<TilesPanelConfig>;
  type: 'group';
}>;

export type TilesPanelConfig = TilesPanelGroupConfig | TilesPanelItemConfig;

export type TilesPanelDropAreaSection =
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'tab'
  | 'tabs-row'
  | 'top';

export type TilesPanelDragItem = Readonly<{
  index: number;
  panelId: string;
  tabCloseable: boolean;
  tabId: string;
  type: string;
}>;
