import type { PanelGroupProps, PanelProps } from 'react-resizable-panels';

export type TilesPanelItemTab<TabType> = Readonly<{
  allowOverflow?: boolean;
  closeable: boolean;
  href?: string;
  id: TabType;
}>;

export type TilesPanelItemConfig<TabType> = Readonly<{
  activeTabId: TabType | null;
  collapsed?: boolean;
  collapsedTitle?: string;
  collapsible?: PanelProps['collapsible'];
  defaultSize?: PanelProps['defaultSize'];
  fullScreen?: boolean;
  id: string;
  showActionsButton?: boolean;
  showNewTabButton?: boolean;
  tabs: ReadonlyArray<TilesPanelItemTab<TabType>>;
  type: 'item';
}>;

export type TilesPanelGroupConfig<TabType> = Readonly<{
  defaultSize?: PanelProps['defaultSize'];
  direction: PanelGroupProps['direction'];
  id: string;
  items: ReadonlyArray<TilesPanelConfig<TabType>>;
  type: 'group';
}>;

export type TilesPanelConfig<TabType> =
  | TilesPanelGroupConfig<TabType>
  | TilesPanelItemConfig<TabType>;

export type TilesPanelDropAreaSection =
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'tab'
  | 'tabs-row'
  | 'top';

export type TilesPanelDragItem<TabType> = Readonly<{
  index: number;
  panelId: string;
  tabCloseable: boolean;
  tabId: TabType;
  type: string;
}>;

export type TilesPanelDragPanel = Readonly<{
  panelId: string;
}>;
