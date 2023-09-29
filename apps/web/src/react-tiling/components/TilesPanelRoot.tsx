import type { CSSProperties, ReactNode } from 'react';
import type { PanelGroupProps } from 'react-resizable-panels';

import TilesPanel from './TilesPanel';
import { useTilesContext } from '../state/useTilesContext';

export type Props<TabType> = Readonly<{
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: PanelGroupProps['direction']) => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: TabType) => Readonly<{
    icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  renderTab: (tabId: TabType) => JSX.Element;
}>;

export function TilesPanelRoot<TabType extends string>({
  disablePointerEventsDuringResize,
  getResizeHandlerProps,
  renderTab,
  getTabLabel,
}: Props<TabType>) {
  const { tiles } = useTilesContext<TabType>();

  return (
    <TilesPanel
      level={0}
      parentDirection="horizontal"
      {...tiles}
      disablePointerEventsDuringResize={disablePointerEventsDuringResize}
      getResizeHandlerProps={getResizeHandlerProps}
      getTabLabel={getTabLabel}
      renderTab={renderTab}
    />
  );
}
