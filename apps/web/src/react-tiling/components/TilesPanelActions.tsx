import {
  RiCloseLine,
  RiContractLeftRightFill,
  RiContractUpDownFill,
  RiExpandLeftRightFill,
  RiExpandUpDownFill,
  RiFullscreenExitLine,
  RiFullscreenLine,
  RiMoreLine,
} from 'react-icons/ri';
import { VscSplitHorizontal, VscSplitVertical } from 'react-icons/vsc';
import type { PanelGroupProps } from 'react-resizable-panels';

import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelItemMode } from './TilesPanelItem';

type Props = Readonly<{
  closeable: boolean;
  mode: TilesPanelItemMode;
  panelId: string;
  parentDirection: PanelGroupProps['direction'];
  showSplitButton: boolean;
}>;

export default function TilesPanelActions({
  closeable,
  mode,
  panelId,
  parentDirection,
  showSplitButton,
}: Props) {
  const { dispatch } = useTilesContext();

  if (mode === 'maximized') {
    return (
      <Button
        icon={RiFullscreenExitLine}
        isLabelHidden={true}
        label="Shrink"
        size="xs"
        variant="tertiary"
        onClick={() => {
          dispatch({
            payload: {
              fullScreen: false,
              panelId,
            },
            type: 'panel-full-screen',
          });
        }}
      />
    );
  }

  if (mode === 'collapsed') {
    return (
      <Button
        icon={
          parentDirection === 'vertical'
            ? RiExpandUpDownFill
            : RiExpandLeftRightFill
        }
        isLabelHidden={true}
        label="Expand"
        size="xs"
        variant="tertiary"
        onClick={() => {
          dispatch({
            payload: {
              collapsed: false,
              panelId,
            },
            type: 'panel-collapse',
          });
        }}
      />
    );
  }

  return (
    <DropdownMenu
      align="end"
      icon={RiMoreLine}
      isLabelHidden={true}
      label="Actions"
      showChevron={false}
      size="xs"
      variant="tertiary">
      {[
        {
          icon: RiFullscreenLine,
          label: 'Maximize',
          onClick: () =>
            dispatch({
              payload: {
                fullScreen: true,
                panelId,
              },
              type: 'panel-full-screen',
            }),
          value: 'maximize',
        },
        {
          icon:
            parentDirection === 'vertical'
              ? RiContractUpDownFill
              : RiContractLeftRightFill,
          label: 'Collapse',
          onClick: () => {
            dispatch({
              payload: {
                collapsed: true,
                panelId,
              },
              type: 'panel-collapse',
            });
          },
          value: 'collapse',
        },
        showSplitButton
          ? {
              icon: VscSplitHorizontal,
              label: 'Split right',
              onClick: () =>
                dispatch({
                  payload: {
                    direction: 'horizontal',
                    newPanelOrder: 'after',
                    panelId,
                  },
                  type: 'panel-split',
                }),
              value: 'split-right',
            }
          : null,
        showSplitButton
          ? {
              icon: VscSplitVertical,
              label: 'Split down',
              onClick: () =>
                dispatch({
                  payload: {
                    direction: 'vertical',
                    newPanelOrder: 'after',
                    panelId,
                  },
                  type: 'panel-split',
                }),
              value: 'split-down',
            }
          : null,
        closeable
          ? {
              icon: RiCloseLine,
              label: 'Close all tabs',
              onClick: () => {
                dispatch({
                  payload: {
                    panelId,
                  },
                  type: 'panel-close',
                });
              },
              value: 'close-all-tabs',
            }
          : null,
      ]
        .filter((item) => Boolean(item))
        .map((item) => (
          <DropdownMenu.Item
            key={item!.value}
            icon={item!.icon}
            isSelected={false}
            label={item!.label}
            onClick={item!.onClick}
          />
        ))}
    </DropdownMenu>
  );
}
