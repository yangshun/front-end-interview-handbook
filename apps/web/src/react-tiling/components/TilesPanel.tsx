import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import { Fragment, useCallback, useRef } from 'react';
import type {
  ImperativePanelGroupHandle,
  PanelGroupProps,
  PanelProps,
} from 'react-resizable-panels';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import type { TilesPanelConfig } from '../types';
import type { TilesPanelItemConfig } from '../types';
import TilesPanelItem from './TilesPanelItem';

type TilesPanelCommonProps<TabType> = Readonly<{
  defaultSize?: PanelProps['defaultSize'];
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: PanelGroupProps['direction']) => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: TabType) => Readonly<{
    icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    iconSecondary?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  level: number;
  minSize?: PanelProps['minSize'];
  order?: number;
  parentDirection: PanelGroupProps['direction'];
  renderTab: (tabId: TabType) => JSX.Element;
}>;
type TilesPanelItemTypeProps<TabType> = Readonly<{
  sizeAfterExpansion?: number;
  type: 'item';
}> &
  TilesPanelCommonProps<TabType> &
  TilesPanelItemConfig<TabType>;

type TilesPanelGroupTypeProps<TabType> = Readonly<{
  type: 'group';
}> &
  TilesPanelCommonProps<TabType> &
  TilesPanelConfig<TabType>;

export default function TilesPanel<TabType extends string>({
  level,
  order,
  id,
  getTabLabel,
  renderTab,
  parentDirection,
  defaultSize = 100,
  minSize = 10,
  getResizeHandlerProps,
  ...props
}: TilesPanelGroupTypeProps<TabType> | TilesPanelItemTypeProps<TabType>) {
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  const handleDoubleClick = useCallback((index: number) => {
    const groupHandle = panelGroupRef.current;

    if (!groupHandle) {
      return;
    }

    const currentLayout = groupHandle.getLayout();

    if (index > 0 && index < currentLayout.length) {
      const panelBeforeIndex = index - 1;
      const panelAfterIndex = index;

      const sizeBefore = currentLayout[panelBeforeIndex];
      const sizeAfter = currentLayout[panelAfterIndex];

      if (sizeBefore + sizeAfter <= 0) {
        return;
      }

      const combinedSize = sizeBefore + sizeAfter;
      const equalSize = combinedSize / 2;

      const newLayout = [...currentLayout];

      newLayout[panelBeforeIndex] = equalSize;
      newLayout[panelAfterIndex] = equalSize;

      groupHandle.setLayout(newLayout);
    }
  }, []);

  if (props.type === 'item') {
    const panel = (
      <TilesPanelItem
        key={id}
        activeTabId={props.activeTabId}
        collapsed={props.collapsed}
        collapsedTitle={props.collapsedTitle}
        collapsible={props.collapsible}
        defaultSize={defaultSize}
        fullScreen={props.fullScreen}
        getTabLabel={getTabLabel}
        id={id}
        level={level}
        order={order}
        parentDirection={parentDirection}
        renderTab={renderTab}
        sizeAfterExpansion={props.sizeAfterExpansion}
        tabs={props.tabs}
      />
    );

    return level === 0 ? (
      <PanelGroup className="relative" direction="horizontal">
        {panel}
      </PanelGroup>
    ) : (
      panel
    );
  }

  const groupDirection = props.direction ?? 'horizontal';

  const group = (
    <PanelGroup
      ref={panelGroupRef}
      className={clsx(level === 0 && 'relative')}
      direction={groupDirection}
      id={String(id)}>
      {props.items.map((item, index) => {
        const itemSizeEqual = 100 / Math.max(props.items.length, 1);

        const resizeHandlerProps = getResizeHandlerProps(
          groupDirection === 'horizontal' ? 'vertical' : 'horizontal',
        );

        return (
          <Fragment key={'fragment-' + item.id}>
            {index > 0 && (
              <div
                key={'handle-wrapper-' + item.id}
                className={resizeHandlerProps.className}
                style={resizeHandlerProps.style}
                onDoubleClick={() => handleDoubleClick(index)}>
                <PanelResizeHandle className="h-full w-full">
                  {resizeHandlerProps.children}
                </PanelResizeHandle>
              </div>
            )}
            <TilesPanel
              key={item.id}
              defaultSize={item.defaultSize ?? itemSizeEqual}
              getResizeHandlerProps={getResizeHandlerProps}
              getTabLabel={getTabLabel}
              level={level + 1}
              order={index + 1}
              parentDirection={groupDirection}
              renderTab={renderTab}
              {...(item.type === 'item'
                ? { ...item, sizeAfterExpansion: itemSizeEqual }
                : item)}
            />
          </Fragment>
        );
      })}
    </PanelGroup>
  );

  return level === 0 ? (
    group
  ) : (
    <Panel
      key={id}
      defaultSize={defaultSize}
      id={String(id)}
      minSize={minSize}
      order={order}>
      {group}
    </Panel>
  );
}
