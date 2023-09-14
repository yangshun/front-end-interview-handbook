import { ReactNode, useReducer, useState } from 'react';
import { TilesPanelConfig } from '../types';
import { TilesContext } from './TilesContext';
import { TilesAction } from '../actions/actions';
import panelSplit from '../actions/panelSplit';
import panelClose from '../actions/panelClose';
import tabOpen from '../actions/tabOpen';
import tabClose from '../actions/tabClose';
import tabSetActive from '../actions/tabSetActive';
import tabChangeId from '../actions/tabChangeId';
import tabDrop from '../actions/tabDrop';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import getTabById from '../utils/getTabById';
import queryTabByPattern from '../utils/queryTabByPattern';
import layoutChange from '../actions/layoutChange';

type Props = Readonly<{
  defaultValue: TilesPanelConfig;
  children: ReactNode;
}>;

function reducer(
  tiles: TilesPanelConfig,
  action: TilesAction,
): TilesPanelConfig {
  switch (action.type) {
    case 'panel-split': {
      return panelSplit(tiles, action.payload);
    }
    case 'panel-close': {
      return panelClose(tiles, action.payload);
    }
    case 'tab-open': {
      return tabOpen(tiles, action.payload);
    }
    case 'tab-close': {
      return tabClose(tiles, action.payload);
    }
    case 'tab-set-active': {
      return tabSetActive(tiles, action.payload);
    }
    case 'tab-drop': {
      return tabDrop(tiles, action.payload);
    }
    case 'tab-change-id': {
      return tabChangeId(tiles, action.payload);
    }
    case 'layout-change': {
      return layoutChange(tiles, action.payload);
    }
  }
}

function TilesProviderImpl({ children, defaultValue }: Props) {
  const [tiles, dispatch] = useReducer(reducer, defaultValue);

  return (
    <TilesContext.Provider
      value={{
        dispatch,
        tiles,
        queryTabByPattern: (regex: RegExp) => queryTabByPattern(tiles, regex),
        getTabById: (tabId: string) => getTabById(tiles, tabId),
      }}>
      {children}
    </TilesContext.Provider>
  );
}

export function TilesProvider({ children, defaultValue }: Props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <TilesProviderImpl defaultValue={defaultValue}>
        {children}
      </TilesProviderImpl>
    </DndProvider>
  );
}
