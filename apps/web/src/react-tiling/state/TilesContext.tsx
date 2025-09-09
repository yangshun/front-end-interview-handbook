import type { Dispatch } from 'react';
import { createContext } from 'react';

import type { TilesAction } from '../actions/actions';
import type { TilesPanelConfig } from '../types';

export type TilesContextValue<TabType extends string> = Readonly<{
  activeTabScrollIntoView: boolean;
  disableActiveTabScrollIntoView: () => void;
  getTabById: (
    tabId: TabType,
  ) => Readonly<{ panelId: string; tabId: TabType }> | null;
  queryTabByPattern: (
    regex: RegExp,
  ) => ReadonlyArray<Readonly<{ panelId: string; tabId: TabType }>>;
  resetActiveTabScrollIntoView: () => void;
  tiles: TilesPanelConfig<TabType>;
  tilesDispatch: Dispatch<TilesAction<TabType>>;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TilesContext = createContext<TilesContextValue<any>>({
  activeTabScrollIntoView: true,
  disableActiveTabScrollIntoView: () => {},
  resetActiveTabScrollIntoView: () => {},
  // @ts-expect-error: Ensure non-null during initialization.
  tiles: null,
  tilesDispatch: () => {},
});

TilesContext.displayName = 'TilesContext';
