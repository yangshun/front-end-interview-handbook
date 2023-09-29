import type { Dispatch } from 'react';
import { createContext } from 'react';

import type { TilesAction } from '../actions/actions';
import type { TilesPanelConfig } from '../types';

export type TilesContextValue<TabType extends string> = Readonly<{
  dispatch: Dispatch<TilesAction<TabType>>;
  getTabById: (
    tabId: TabType,
  ) => Readonly<{ panelId: string; tabId: TabType }> | null;
  queryTabByPattern: (
    regex: RegExp,
  ) => ReadonlyArray<Readonly<{ panelId: string; tabId: TabType }>>;
  tiles: TilesPanelConfig<TabType>;
}>;

export const TilesContext = createContext<TilesContextValue<any>>({
  dispatch: () => {},
  // @ts-expect-error: Ensure non-null during initialization.
  tiles: null,
});

TilesContext.displayName = 'TilesContext';
