import type { CSSProperties, ReactNode } from 'react';
import type { PanelGroupProps } from 'react-resizable-panels';

import TilesPanel from './TilesPanel';
import { useTilesContext } from '../state/useTilesContext';

export type Props = Readonly<{
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: PanelGroupProps['direction']) => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: string) => Readonly<{
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  renderTab: (tabId: string) => JSX.Element;
}>;

export function TilesPanelRoot({
  disablePointerEventsDuringResize,
  getResizeHandlerProps,
  renderTab,
  getTabLabel,
}: Props) {
  const { tiles } = useTilesContext();

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
