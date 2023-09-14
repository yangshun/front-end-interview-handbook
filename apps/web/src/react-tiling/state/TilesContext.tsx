import { createContext } from 'react';
import { TilesPanelConfig } from '../types';
import { TilesAction } from '../actions/actions';

type Context = Readonly<{
  dispatch: (action: TilesAction) => void;
  getTabById: (
    tabId: string,
  ) => Readonly<{ tabId: string; panelId: string }> | null;
  queryTabByPattern: (
    regex: RegExp,
  ) => ReadonlyArray<Readonly<{ tabId: string; panelId: string }>>;
  tiles: TilesPanelConfig;
}>;

export const TilesContext = createContext<Context>({
  dispatch: () => {},
  // @ts-expect-error: Ensure non-null during initialization.
  tiles: null,
});

TilesContext.displayName = 'TilesContext';
