'use client';

import { RiMoonLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { useColorSchemePreferences } from '../color-scheme/ColorSchemePreferencesProvider';
import useColorSchemeOptions from '../color-scheme/useColorSchemeOptions';

export default function SidebarColorSchemeSubMenu() {
  const intl = useIntl();
  const { colorScheme, colorSchemePreference, setColorSchemePreference } =
    useColorSchemePreferences();

  const colorSchemeOptions = useColorSchemeOptions();
  const Icon =
    colorSchemeOptions.filter((option) => option.value === colorScheme)?.[0]
      .icon ?? RiMoonLine;

  return (
    <DropdownMenu.Sub
      icon={Icon}
      label={intl.formatMessage({
        defaultMessage: 'Theme',
        description: 'Change site theme button label',
        id: 'n4aKYo',
      })}>
      {colorSchemeOptions.map(({ icon, label, value }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={colorSchemePreference === value}
          label={label}
          onClick={() => {
            setColorSchemePreference(value);
          }}
        />
      ))}
    </DropdownMenu.Sub>
  );
}
