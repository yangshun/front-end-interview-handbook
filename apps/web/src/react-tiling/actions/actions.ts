import { TilesActionTabOpen } from './tabOpen';
import { TilesActionTabClose } from './tabClose';
import { TilesActionTabDrop } from './tabDrop';
import { TilesActionTabChangeId } from './tabChangeId';
import { TilesActionTabSetActive } from './tabSetActive';
import { TilesActionPanelClose } from './panelClose';
import { TilesActionPanelSplit } from './panelSplit';
import { TilesActionLayoutChange } from './layoutChange';

export type TilesAction =
  | TilesActionLayoutChange
  | TilesActionPanelSplit
  | TilesActionPanelClose
  | TilesActionTabChangeId
  | TilesActionTabOpen
  | TilesActionTabClose
  | TilesActionTabSetActive
  | TilesActionTabDrop;
