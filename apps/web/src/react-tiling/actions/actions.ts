import type { TilesActionLayoutChange } from './layoutChange';
import type { TilesActionPanelClose } from './panelClose';
import type { TilesActionPanelCollapse } from './panelCollapse';
import type { TilesActionPanelDrop } from './panelDrop';
import type { TilesActionPanelFullScreen } from './panelFullScreen';
import type { TilesActionPanelSplit } from './panelSplit';
import type { TilesActionTabChangeId } from './tabChangeId';
import type { TilesActionTabClose } from './tabClose';
import type { TilesActionTabDrop } from './tabDrop';
import type { TilesActionTabOpen } from './tabOpen';
import type { TilesActionTabSetActive } from './tabSetActive';
import type { TilesActionTabSetActiveOtherwiseOpen } from './tabSetActiveOtherwiseOpen';

export type TilesAction<TabType extends string> =
  | TilesActionLayoutChange<TabType>
  | TilesActionPanelClose<TabType>
  | TilesActionPanelCollapse
  | TilesActionPanelDrop<TabType>
  | TilesActionPanelFullScreen
  | TilesActionPanelSplit<TabType>
  | TilesActionTabChangeId<TabType>
  | TilesActionTabClose<TabType>
  | TilesActionTabDrop<TabType>
  | TilesActionTabOpen<TabType>
  | TilesActionTabSetActive<TabType>
  | TilesActionTabSetActiveOtherwiseOpen<TabType>;
