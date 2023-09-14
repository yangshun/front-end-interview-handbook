export type TilesPanelGroupDirection = 'horizontal' | 'vertical';
export type TilesPanelItemTab = Readonly<{
  id: string;
  closeable: boolean;
  allowOverflow?: boolean;
}>;

export type TilesPanelItemConfig = Readonly<{
  id: string;
  type: 'item';
  activeTabId: string | null;
  tabs: ReadonlyArray<TilesPanelItemTab>;
}>;

export type TilesPanelGroupConfig = Readonly<{
  id: string;
  type: 'group';
  direction: TilesPanelGroupDirection;
  items: ReadonlyArray<TilesPanelConfig>;
}>;

export type TilesPanelConfig = TilesPanelItemConfig | TilesPanelGroupConfig;

export type TilesPanelDropAreaSection =
  | 'tab'
  | 'tabs-row'
  | 'center'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom';
