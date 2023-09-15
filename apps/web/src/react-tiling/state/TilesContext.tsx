import { createContext } from 'react';

import type { TilesAction } from '../actions/actions';
import type { TilesPanelConfig } from '../types';

type Context = Readonly<{
  dispatch: (action: TilesAction) => void;
  getTabById: (
    tabId: string,
  ) => Readonly<{ panelId: string, tabId: string; }> | null;
  queryTabByPattern: (
    regex: RegExp,
  ) => ReadonlyArray<Readonly<{ panelId: string, tabId: string; }>>;
  tiles: TilesPanelConfig;
}>;

export const TilesContext = createContext<Context>({
  dispatch: () => {},
  // @ts-expect-error: Ensure non-null during initialization.
  tiles: null,
});

TilesContext.displayName = 'TilesContext';
