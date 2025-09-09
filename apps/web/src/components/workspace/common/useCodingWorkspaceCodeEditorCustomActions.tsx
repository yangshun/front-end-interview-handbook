import { RiKeyboardBoxLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';

import type { CustomActionsOrComponent } from '~/react-tiling/components/TilesPanelActions';

import CodingWorkspaceThemeSelect from './editor/CodingWorkspaceThemeSelect';

export default function useCodingWorkspaceCodeEditorCustomActions({
  openEditorShortcuts,
}: Readonly<{
  openEditorShortcuts: () => void;
}>) {
  const intl = useIntl();

  return [
    {
      actions: [
        {
          component: <CodingWorkspaceThemeSelect />,
          value: 'theme-selector',
        },
        {
          type: 'divider',
          value: 'divider-1',
        },
        {
          component: (
            <DropdownMenu.Item
              icon={RiKeyboardBoxLine}
              isSelected={false}
              label={intl.formatMessage({
                defaultMessage: 'Keyboard shortcuts',
                description: 'Label for slideout for code editor shortcuts',
                id: 'bUOVVm',
              })}
              onClick={openEditorShortcuts}
            />
          ),
          value: 'keyboard-shortcuts',
        },
        {
          type: 'divider',
          value: 'divider-2',
        },
        {
          component: (
            <Text
              className="p-1"
              color="secondary"
              size="body3"
              weight="medium">
              {intl.formatMessage({
                defaultMessage: 'Window / Tabs',
                description: 'Label for window / tabs actions',
                id: 'HUdL/0',
              })}
            </Text>
          ),
          value: 'window-actions-label',
        },
      ],
      type: 'actions',
    },
  ] as ReadonlyArray<CustomActionsOrComponent>;
}
