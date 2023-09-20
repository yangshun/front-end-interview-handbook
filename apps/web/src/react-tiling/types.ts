import type { PanelProps } from 'react-resizable-panels';

export type TilesPanelGroupDirection = 'horizontal' | 'vertical';
export type TilesPanelItemTab = Readonly<{
  allowOverflow?: boolean;
  closeable: boolean;
  href?: string;
  id: string;
}>;

export type TilesPanelItemConfig = Readonly<{
  activeTabId: string | null;
  defaultSize?: PanelProps['defaultSize'];
  id: string;
  tabs: ReadonlyArray<TilesPanelItemTab>;
  type: 'item';
}>;

export type TilesPanelGroupConfig = Readonly<{
  defaultSize?: PanelProps['defaultSize'];
  direction: TilesPanelGroupDirection;
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
