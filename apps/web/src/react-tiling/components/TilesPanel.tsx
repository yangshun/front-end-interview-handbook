import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import { Fragment } from 'react';
import type { PanelGroupProps, PanelProps } from 'react-resizable-panels';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import type { TilesPanelConfig } from '../types';
import type { TilesPanelItemConfig } from '../types';
import type { CustomActionsOrComponent } from './TilesPanelActions';
import TilesPanelItem from './TilesPanelItem';

type TilesPanelCommonProps<TabType> = Readonly<{
  defaultSize?: PanelProps['defaultSize'];
  disablePointerEventsDuringResize?: boolean;
  getCustomActionsOrComponents?: (
    panelId: string,
    tabId: TabType | null,
  ) => ReadonlyArray<CustomActionsOrComponent> | undefined;
  getDropdownIcon?: (
    panelId: string,
    tabId: TabType | null,
  ) => ((iconProps: React.ComponentProps<'svg'>) => JSX.Element) | undefined;
  getResizeHandlerProps: (direction: PanelGroupProps['direction']) => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: TabType) => Readonly<{
    icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    iconSecondary?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    showIcon?: boolean;
  }>;
  level: number;
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
  defaultSize = 100,
  disablePointerEventsDuringResize,
  getCustomActionsOrComponents,
  getDropdownIcon,
  getResizeHandlerProps,
  getTabLabel,
  id,
  level,
  order,
  parentDirection,
  renderTab,
  ...props
}: TilesPanelGroupTypeProps<TabType> | TilesPanelItemTypeProps<TabType>) {
  if (props.type === 'item') {
    const panel = (
      <TilesPanelItem
        key={id}
        activeTabId={props.activeTabId}
        collapsed={props.collapsed}
        collapsedTitle={props.collapsedTitle}
        collapsible={props.collapsible}
        customActionsOrComponents={getCustomActionsOrComponents?.(
          id,
          props.activeTabId,
        )}
        defaultSize={defaultSize}
        dropdownIcon={getDropdownIcon?.(id, props.activeTabId)}
        fullScreen={props.fullScreen}
        getTabLabel={getTabLabel}
        id={id}
        level={level}
        order={order}
        parentDirection={parentDirection}
        renderTab={renderTab}
        showActionsButton={props.showActionsButton}
        showNewTabButton={props.showNewTabButton}
        sizeAfterExpansion={props.sizeAfterExpansion}
        tabs={props.tabs}
      />
    );

    return level === 0 ? (
      <PanelGroup
        className="relative"
        direction="horizontal"
        disablePointerEventsDuringResize={disablePointerEventsDuringResize}>
        {panel}
      </PanelGroup>
    ) : (
      panel
    );
  }

  const groupDirection = props.direction ?? 'horizontal';

  const group = (
    <PanelGroup
      className={clsx(level === 0 && 'relative')}
      direction={groupDirection}
      disablePointerEventsDuringResize={disablePointerEventsDuringResize}
      id={String(id)}>
      {props.items.map((item, index) => {
        const itemSizeEqual = 100 / Math.max(props.items.length, 1);

        return (
          <Fragment key={'fragment-' + item.id}>
            {index > 0 && (
              <PanelResizeHandle
                key={'handle-' + item.id}
                {...getResizeHandlerProps(
                  groupDirection === 'horizontal' ? 'vertical' : 'horizontal',
                )}
              />
            )}
            <TilesPanel
              key={item.id}
              defaultSize={item.defaultSize ?? itemSizeEqual}
              disablePointerEventsDuringResize={
                disablePointerEventsDuringResize
              }
              getCustomActionsOrComponents={getCustomActionsOrComponents}
              getDropdownIcon={getDropdownIcon}
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
    <Panel key={id} defaultSize={defaultSize} id={String(id)} order={order}>
      {group}
    </Panel>
  );
}
