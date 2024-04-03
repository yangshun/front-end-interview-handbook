import { RiMoonLine } from 'react-icons/ri';

import DropdownMenu from '~/components/ui/DropdownMenu';

import { useColorSchemePreferences } from '../color-scheme/ColorSchemePreferencesProvider';
import useColorSchemeOptions from '../color-scheme/useColorSchemeOptions';

export default function SidebarColorSchemeSubMenu() {
  const { colorSchemePreference, colorScheme, setColorSchemePreference } =
    useColorSchemePreferences();

  const colorSchemeOptions = useColorSchemeOptions();
  const Icon =
    colorSchemeOptions.filter((option) => option.value === colorScheme)?.[0]
      .icon ?? RiMoonLine;

  return (
    <DropdownMenu.Sub icon={Icon} label="Theme">
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
